/*------------------------------------------------------------------------------------------------------/
| Program : ACA_AFTER_ASI_V3.js
| Event   : ACA Page Flow Template
|
| Usage   : Designed for Pageflow: 	RENTAL HOUSING REGISTRATION, Documents, OnLoad Event
|									RENTAL HOUSING REGISTRATION RENEWAL, Documents, OnLoad Event
|									RENTAL HOUSING REGISTRATION EXEMPTION, Application Information, OnLoad Event
|									RENTAL HOUSING REGISTRATION EXEM RENEWAL, Application Information, OnLoad Event
|
| Client  : Baltimore County
| Action# : N/A
|
| Notes   : Rewritten to 3.0 EMSE Best Practices - 10.9.17 - jchalk
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
var showMessage = false; // Set to true to see results in popup window
var showDebug = false; // Set to true to see debug messages in popup window
var useAppSpecificGroupName = false; // Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false; // Use Group name when populating Task Specific Info Values
var cancel = false;
var message = ""; // Message String
var debug = ""; // Debug String
var br = "<BR>"; // Break Tag
var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var parentId = cap.getParentCapID();
var startDate = new Date();
var startTime = startDate.getTime();
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/

var AInfo = new Array();
loadAppSpecific4ACA(AInfo);
loadAddressAttributes4ACA(AInfo);
loadASITables4ACA(cap);

addConditions = false;
//Set to false if conditions are not required;
conditionTable = new Array();
base = new Array();
base["Comments"] = " ";
base["Method of Submission"] = " ";
row = base.slice(0);
row["Document Type"] = new asiTableValObj("Document Type", "Carbon Monoxide Alarm Verification", "Y");
row["Method of Submission"] = new asiTableValObj("Method of Submission", " ", "N");
row["Comments"] = new asiTableValObj("Comments", "", "N");
conditionTable.push(row);

if (addConditions)
	addStdCondition("Document", "Carbon Monoxide Alarm Verification");

if ((AInfo['Section 8'] == "Yes")) {
	row = base.slice(0);
	row["Document Type"] = new asiTableValObj("Document Type", "Section 8/MBQ Inspection Letter", "Y");
	row["Method of Submission"] = new asiTableValObj("Method of Submission", " ", "N");
	row["Comments"] = new asiTableValObj("Comments", "", "N");
	conditionTable.push(row);
	if (addConditions)
		addStdCondition("Document", "Section 8/MBQ Inspection Letter");
}

if ((AInfo['Section 8'] == "No")) {
	row = base.slice(0);
	row["Document Type"] = new asiTableValObj("Document Type", "Inspection Sheet", "Y");
	row["Method of Submission"] = new asiTableValObj("Method of Submission", "", "N");
	row["Comments"] = new asiTableValObj("Comments", "", "N");
	conditionTable.push(row);
	if (addConditions)
		addStdCondition("Document", "Inspection Sheet");
}

if (AInfo['Before 1950'] == "Yes") {
	row = base.slice(0);
	row["Document Type"] = new asiTableValObj("Document Type", "Lead Inspection Certificate", "Y");
	row["Method of Submission"] = new asiTableValObj("Method of Submission", "", "N");
	row["Comments"] = new asiTableValObj("Comments", "", "N");
	conditionTable.push(row);
	if (addConditions)
		addStdCondition("Document", "Lead Inspection Certificate");
}

asit = cap.getAppSpecificTableGroupModel();
new_asit = addASITable4ACAPageFlow(asit, "DOCUMENTS", conditionTable);
if (new_asit) {
	cap.setAppSpecificTableGroupModel(new_asit);
	aa.env.setValue("CapModel", cap);
}

aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), "number of requirements that will be added = " + conditionTable.length);

// page flow custom code end


if (debug.indexOf("**ERROR") > 0) {
	aa.env.setValue("ErrorCode", "1");
	aa.env.setValue("ErrorMessage", debug);
} else {
	if (cancel) {
		aa.env.setValue("ErrorCode", "-2");
		if (showMessage)
			aa.env.setValue("ErrorMessage", message);
		if (showDebug)
			aa.env.setValue("ErrorMessage", debug);
	} else {
		aa.env.setValue("ErrorCode", "0");
		if (showMessage)
			aa.env.setValue("ErrorMessage", message);
		if (showDebug)
			aa.env.setValue("ErrorMessage", debug);
	}
}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/

function loadASITables4ACA(iCap) {

	var gm = iCap.getAppSpecificTableGroupModel();

	for (var ta = gm.getTablesMap(), tai = ta.values().iterator(); tai.hasNext(); ) {

		var tsm = tai.next();

		if (!tsm.rowIndex.isEmpty()) {

			var tempObject = new Array,
			tempArray = new Array,
			tn = tsm.getTableName();
			tn = String(tn).replace(/[^a-zA-Z0-9]+/g, ""),
			isNaN(tn.substring(0, 1)) || (tn = "TBL" + tn);
			for (var tsmfldi = tsm.getTableField().iterator(), tsmcoli = tsm.getColumns().iterator(), numrows = 1; tsmfldi.hasNext(); ) {

				if (!tsmcoli.hasNext()) {
					var tsmcoli = tsm.getColumns().iterator();
					tempArray.push(tempObject);
					var tempObject = new Array;
					numrows++
				}
				var tcol = tsmcoli.next();
				var tobj = tsmfldi.next();

				var tval = "";
				try {
					tval = tobj.getInputValue();
				} catch (ex) {
					tval = tobj;
				}

				tempObject[tcol.getColumnName()] = tval;
			}
			tempArray.push(tempObject);

			var copyStr = "" + tn + " = tempArray";
			logDebug("ASI Table Array : " + tn + " (" + numrows + " Rows)"),

			eval(copyStr)
		}
	}

}

function asiTableValObj(columnName, fieldValue, readOnly) {
	this.columnName = columnName;
	this.fieldValue = fieldValue;
	this.readOnly = readOnly;

	asiTableValObj.prototype.toString = function () {
		return this.fieldValue
	}
}

function addStdCondition(cType, cDesc) {

	if (!aa.capCondition.getStandardConditions) {
		logDebug("addStdCondition function is not available in this version of Accela Automation.");
	} else {
		standardConditions = aa.capCondition.getStandardConditions(cType, cDesc).getOutput();
		for (i = 0; i < standardConditions.length; i++) {
			standardCondition = standardConditions[i]
				var addCapCondResult = aa.capCondition.addCapCondition(capId, standardCondition.getConditionType(), standardCondition.getConditionDesc(), standardCondition.getConditionComment(), sysDate, null, sysDate, null, null, standardCondition.getImpactCode(), systemUserObj, systemUserObj, "Applied", currentUserID, "A")
				if (addCapCondResult.getSuccess()) {
					logDebug("Successfully added condition (" + standardCondition.getConditionDesc() + ")");
				} else {
					logDebug("**ERROR: adding condition (" + standardCondition.getConditionDesc() + "): " + addCapCondResult.getErrorMessage());
				}
		}
	}
}

function addASITable4ACAPageFlow(destinationTableGroupModel, tableName, tableValueArray) // optional capId
{
	//  tableName is the name of the ASI table
	//  tableValueArray is an array of associative array values.  All elements MUST be either a string or asiTableVal object
	//

	var addDebug = false;

	var itemCap = capId
		if (arguments.length > 3)
			itemCap = arguments[3]; // use cap ID specified in args

		var ta = destinationTableGroupModel.getTablesMap().values();
	var tai = ta.iterator();

	var found = false;
	while (tai.hasNext()) {
		var tsm = tai.next(); // com.accela.aa.aamain.appspectable.AppSpecificTableModel
		if (tsm.getTableName().equals(tableName)) {
			found = true;
			break;
		}
	}

	if (!found) {
		logDebug("cannot update asit for ACA, no matching table name");
		return false;
	}

	var fld = aa.util.newArrayList(); // had to do this since it was coming up null.
	var fld_readonly = aa.util.newArrayList(); // had to do this since it was coming up null.
	var i = -1; // row index counter

	for (thisrow in tableValueArray) {

		var col = tsm.getColumns()
			var coli = col.iterator();
		while (coli.hasNext()) {
			var colname = coli.next();

			if (typeof(tableValueArray[thisrow][colname.getColumnName()]) == "object") // we are passed an asiTablVal Obj
			{
				var args = new Array(tableValueArray[thisrow][colname.getColumnName()].fieldValue, colname);
				var fldToAdd = aa.proxyInvoker.newInstance("com.accela.aa.aamain.appspectable.AppSpecificTableField", args).getOutput();
				fldToAdd.setRowIndex(i);
				fldToAdd.setFieldLabel(colname.getColumnName());
				fldToAdd.setFieldGroup(tableName.replace(/ /g, "\+"));
				fldToAdd.setReadOnly(tableValueArray[thisrow][colname.getColumnName()].readOnly.equals("Y"));
				fld.add(fldToAdd);
				fld_readonly.add(tableValueArray[thisrow][colname.getColumnName()].readOnly);

				goo = fldToAdd;

				if (addDebug) {
					logDebug("   ======ADDING Field from Object to Column " + colname.getColumnName() + "========== " + goo + "  : " + goo.getClass());
					logDebug("        =Property=======  rowIndex  = " + goo.getRowIndex());
					logDebug("        =Property=======  getDisplayProperty  = " + goo.getDisplayProperty());
					logDebug("        =Property=======  getNameSuffix  = " + goo.getNameSuffix());
					logDebug("        =Property=======  getFieldGroup  = " + goo.getFieldGroup());
					logDebug("        =Property=======  getFieldLabel  = " + goo.getFieldLabel());
					logDebug("        =Property=======  getFieldType  = " + goo.getFieldType());
					logDebug("        =Property=======  getDisplayOrder  = " + goo.getDisplayOrder());
					logDebug("        =Property=======  isRequired  = " + goo.isRequired());
					logDebug("        =Property=======  isSearchAble  = " + goo.isSearchAble());
					logDebug("        =Property=======  getMaxLength  = " + goo.getMaxLength());
					logDebug("        =Property=======  getDisplayLength  = " + goo.getDisplayLength());
					logDebug("        =Property=======  getStatus  = " + goo.getStatus());
					logDebug("        =Property=======  getUnit  = " + goo.getUnit());
					logDebug("        =Property=======  getIndex  = " + goo.getIndex());
					logDebug("        =Property=======  inputValue  = " + goo.getInputValue());
					logDebug("        =Property=======  getErrorTip  = " + goo.getErrorTip());
					logDebug("        =Property=======  getSelectOptions  = " + goo.getSelectOptions());
					logDebug("        =Property=======  getFieldID  = " + goo.getFieldID());
					logDebug("        =Property=======  isRequiredFeeCalc  = " + goo.isRequiredFeeCalc());
					logDebug("        =Property=======  isReadOnly  = " + goo.isReadOnly());
					logDebug("        =Property=======  getRowIndex  = " + goo.getRowIndex());
				}
			} else // we are passed a string
			{
				var args = new Array(tableValueArray[thisrow][colname.getColumnName()], colname);
				var fldToAdd = aa.proxyInvoker.newInstance("com.accela.aa.aamain.appspectable.AppSpecificTableField", args).getOutput();
				fldToAdd.setRowIndex(i);
				fldToAdd.setFieldLabel(colname.getColumnName());
				fldToAdd.setFieldGroup(tableName.replace(/ /g, "\+"));
				fldToAdd.setReadOnly(false);
				fld.add(fldToAdd);
				fld_readonly.add("N");
				goo = fldToAdd;

				if (addDebug) {
					logDebug("   ======ADDING Field from String to  Column " + colname.getColumnName() + "========== " + goo + "  : " + goo.getClass());
					logDebug("        =Property=======  rowIndex  = " + goo.getRowIndex());
					logDebug("        =Property=======  getDisplayProperty  = " + goo.getDisplayProperty());
					logDebug("        =Property=======  getNameSuffix  = " + goo.getNameSuffix());
					logDebug("        =Property=======  getFieldGroup  = " + goo.getFieldGroup());
					logDebug("        =Property=======  getFieldLabel  = " + goo.getFieldLabel());
					logDebug("        =Property=======  getFieldType  = " + goo.getFieldType());
					logDebug("        =Property=======  getDisplayOrder  = " + goo.getDisplayOrder());
					logDebug("        =Property=======  isRequired  = " + goo.isRequired());
					logDebug("        =Property=======  isSearchAble  = " + goo.isSearchAble());
					logDebug("        =Property=======  getMaxLength  = " + goo.getMaxLength());
					logDebug("        =Property=======  getDisplayLength  = " + goo.getDisplayLength());
					logDebug("        =Property=======  getStatus  = " + goo.getStatus());
					logDebug("        =Property=======  getUnit  = " + goo.getUnit());
					logDebug("        =Property=======  getIndex  = " + goo.getIndex());
					logDebug("        =Property=======  inputValue  = " + goo.getInputValue());
					logDebug("        =Property=======  getErrorTip  = " + goo.getErrorTip());
					logDebug("        =Property=======  getSelectOptions  = " + goo.getSelectOptions());
					logDebug("        =Property=======  getFieldID  = " + goo.getFieldID());
					logDebug("        =Property=======  isRequiredFeeCalc  = " + goo.isRequiredFeeCalc());
					logDebug("        =Property=======  isReadOnly  = " + goo.isReadOnly());
					logDebug("        =Property=======  getRowIndex  = " + goo.getRowIndex());
				}
			}
		}

		i--;

	}

	tsm.setTableField(fld);
	tsm.setReadonlyField(fld_readonly); // set readonly field


	tssm = tsm;

	return destinationTableGroupModel;

}

function loadAppSpecific4ACA(thisArr) {
	//
	// Returns an associative array of App Specific Info
	// Optional second parameter, cap ID to load from
	//
	// uses capModel in this event


	var itemCap = capId;
	if (arguments.length >= 2) {
		itemCap = arguments[1]; // use cap ID specified in args

		var fAppSpecInfoObj = aa.appSpecificInfo.getByCapID(itemCap).getOutput();

		for (loopk in fAppSpecInfoObj) {
			if (useAppSpecificGroupName)
				thisArr[fAppSpecInfoObj[loopk].getCheckboxType() + "." + fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
			else
				thisArr[fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
		}
	} else {
		var capASI = cap.getAppSpecificInfoGroups();
		if (!capASI) {
			logDebug("No ASI for the CapModel");
		} else {
			var i = cap.getAppSpecificInfoGroups().iterator();
			while (i.hasNext()) {
				var group = i.next();
				var fields = group.getFields();
				if (fields != null) {
					var iteFields = fields.iterator();
					while (iteFields.hasNext()) {
						var field = iteFields.next();

						if (useAppSpecificGroupName)
							thisArr[field.getCheckboxType() + "." + field.getCheckboxDesc()] = field.getChecklistComment();
						else
							thisArr[field.getCheckboxDesc()] = field.getChecklistComment();
					}
				}
			}
		}
	}
}

function loadAddressAttributes4ACA(thisArr) {
	//
	// Returns an associative array of Address Attributes from ACA cap model
	//
	//

	fcapAddressObj = cap.getAddressModel();

	if (!fcapAddressObj) {
		logDebug("No Address to get attributes");
		return false;
	}

	addressAttr = fcapAddressObj.getAttributes();

	if (!addressAttr) {
		logDebug("No attributes on this address");
		return false;
	}

	addressAttrObj = addressAttr.toArray();

	for (z in addressAttrObj)
		thisArr["AddressAttribute." + addressAttrObj[z].getB1AttributeName()] = addressAttrObj[z].getB1AttributeValue();

	// Explicitly load some standard values
	thisArr["AddressAttribute.PrimaryFlag"] = fcapAddressObj.getPrimaryFlag();
	thisArr["AddressAttribute.HouseNumberStart"] = fcapAddressObj.getHouseNumberStart();
	thisArr["AddressAttribute.StreetDirection"] = fcapAddressObj.getStreetDirection();
	thisArr["AddressAttribute.StreetName"] = fcapAddressObj.getStreetName();
	thisArr["AddressAttribute.StreetSuffix"] = fcapAddressObj.getStreetSuffix();
	thisArr["AddressAttribute.City"] = fcapAddressObj.getCity();
	thisArr["AddressAttribute.State"] = fcapAddressObj.getState();
	thisArr["AddressAttribute.Zip"] = fcapAddressObj.getZip();
	thisArr["AddressAttribute.AddressStatus"] = fcapAddressObj.getAddressStatus();
	thisArr["AddressAttribute.County"] = fcapAddressObj.getCounty();
	thisArr["AddressAttribute.Country"] = fcapAddressObj.getCountry();
	thisArr["AddressAttribute.AddressDescription"] = fcapAddressObj.getAddressDescription();
	thisArr["AddressAttribute.XCoordinate"] = fcapAddressObj.getXCoordinator();
	thisArr["AddressAttribute.YCoordinate"] = fcapAddressObj.getYCoordinator();
}
