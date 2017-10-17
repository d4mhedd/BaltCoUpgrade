//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function addASITable(tableName, tableValueArray) {
	try {
		// tableName is the name of the ASI table
		// tableValueArray is an array of associative array values. All elements MUST be either a string or asiTableVal object
		var itemCap = capId;
		if (arguments.length > 2)
		 itemCap = arguments[2]; // use cap ID specified in args
		

		var tssmResult = aa.appSpecificTableScript.getAppSpecificTableModel(itemCap, tableName)
			if (!tssmResult.getSuccess()) {

				logDebug("**WARNING: error retrieving app specific table " + tableName + " " + tssmResult.getErrorMessage());
				return false
			}

			var tssm = tssmResult.getOutput();
		var tsm = tssm.getAppSpecificTableModel();
		var fld = tsm.getTableField();
		var fld_readonly = tsm.getReadonlyField(); // get Readonly field
		for (thisrow in tableValueArray) {

			var col = tsm.getColumns()
				var coli = col.iterator();
			while (coli.hasNext()) {

				var colname = coli.next();
				//logDebug("VALUE=" + colname.getColumnName() + "=" + tableValueArray[thisrow][colname.getColumnName()].fieldValue);

				if (typeof(tableValueArray[thisrow][colname.getColumnName()]) == "object") // we are passed an asiTablVal Obj
				{
					fld.add(tableValueArray[thisrow][colname.getColumnName()].fieldValue);
					fld_readonly.add(tableValueArray[thisrow][colname.getColumnName()].readOnly);
				} else // we are passed a string


				{
					// FA 11-9-2010 if the field is action set the value to "No Change"
					//// if(colname.getColumnName()=="Action"){
					//// fld.add("No Change");
					//// fld_readonly.add(null);
					//// }else{
					fld.add(tableValueArray[thisrow][colname.getColumnName()]);
					fld_readonly.add(null);
					//// }
				}
			}

			tsm.setTableField(fld);

			tsm.setReadonlyField(fld_readonly);

		}

		var addResult = aa.appSpecificTableScript.editAppSpecificTableInfos(tsm, itemCap, currentUserID);
		if (!addResult.getSuccess()) {

			logDebug("**WARNING: error adding record to ASI Table: " + tableName + " " + addResult.getErrorMessage());
			return false
		} else

			logDebug("Successfully added record to ASI Table: " + tableName);
	

	} catch (err) {
		logDebug("A JavaScript Error occured in custom function addASITable: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end