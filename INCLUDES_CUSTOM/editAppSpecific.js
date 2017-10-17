//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function editAppSpecific(itemName, itemValue) {
	try {
		
		var updated = false;
		var i = 0;

		itemCap = capId;
		if (arguments.length == 3)
			itemCap = arguments[2]; // use cap ID specified in args
		
		var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
		if (appSpecInfoResult.getSuccess()) {

			var appspecObj = appSpecInfoResult.getOutput();
			if (itemName != "") {
				while (i < appspecObj.length && !updated) {

					if (appspecObj[i].getCheckboxDesc() == itemName) {

						appspecObj[i].setChecklistComment(itemValue);
						//logDebug("Setting app spec info item " + itemName + " to " + itemValue );

						var actionResult = aa.appSpecificInfo.editAppSpecInfos(appspecObj);
						if (actionResult.getSuccess()) {

							//logDebug("app spec info item " + itemName + " has been given a value of " + itemValue);
						} else {

							logDebug("**ERROR: Setting the app spec info item " + itemName + " to " + itemValue + " .\nReason is: " + actionResult.getErrorType() + ":" + actionResult.getErrorMessage());
						}

						updated = true;
						//logDebug("Array" + AInfo[itemName]);
						AInfo[itemName] = itemValue; // Update array used by this script
					}

					i++;

				} // while loop
			} // item name blank
		} // got app specific object
		else {

			logDebug("**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage());
		}

	} catch (err) {
		logDebug("A JavaScript Error occured in custom function editAppSpecific: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end