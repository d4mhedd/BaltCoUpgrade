//custom function
//jec 171025 conversion begin
//found in ADDRESSDUPLICATEFORACA
function capIdsGetByMatchingAddr() {
	try {
		//update by eric 1/29/2014 added different email text.
		//Gets CAPs with the same address as the current CAP, as capId (CapIDModel) object array (array includes current capId)
		//07SSP-00034/SP5015
		//

		//Get address(es) on current CAP
		var addrResult = aa.address.getAddressByCapId(capId);
		if (!addrResult.getSuccess()) {
			logDebug("**ERROR: getting CAP addresses: " + addrResult.getErrorMessage());
			return false;
		}

		var addrArray = new Array();
		var addrArray = addrResult.getOutput();
		if (addrArray.length == 0 || addrArray == undefined) {
			logDebug("The current CAP has no address.  Unable to get CAPs with the same address.")
			return false;
		}

		//use 1st address for comparison
		var streetName = addrArray[0].getStreetName();
		var hseNum = addrArray[0].getHouseNumberStart();
		var streetSuffix = addrArray[0].getStreetSuffix();
		var zip = addrArray[0].getZip();
		var unitType = addrArray[0].getUnitType();
		var unitNo = addrArray[0].getUnitStart();
		var streetDir = addrArray[0].getStreetDirection();

		if (streetDir == "")
			streetDir = null;
		if (streetSuffix == "")
			streetSuffix = null;
		if (zip == "")
			zip = null;

		//logDebug("ST Name--> "+ streetName +" H:NO --> "+ hseNum +" ST Suffix --> "+ streetSuffix + " ZIP --> "+zip+" St Dir --> "+streetDir);
		// get caps with same address
		var capAddResult = aa.cap.getCapListByDetailAddress(streetName, parseInt(hseNum), streetSuffix, zip, streetDir, null);
		if (capAddResult.getSuccess())
			var capArray = capAddResult.getOutput();
		else {
			logDebug("**ERROR: getting similar addresses: " + capAddResult.getErrorMessage());
			return false;
		}
		var Address = hseNum + " " + streetDir + " " + streetName + " " + streetSuffix;
		var capIdArray = new Array();
		var capIdObj;
		var cap2;
		var capTypeStr;
		var capStatusStr;
		var objMap = {};
		//convert CapIDScriptModel objects to CapIDModel objects followed by changing to CapID models
		for (i in capArray) {

			capIdObj = (capArray[i].getCapID());
			capResult2 = aa.cap.getCap(capIdObj.getID1(), capIdObj.getID2(), capIdObj.getID3());
			if (capResult2.getSuccess()) {
				cap2 = capResult2.getOutput();
				capTypeStr = cap2.getCapType().toString();
				capStatusStr = cap2.getCapStatus();
			}
			if (!capId.equals(capIdObj)) // I am checking if capid is in the array don't push it.
			{
				if (appTypeString.equals("Enforcement/Code Compliance/Community/Constituent Complaint")) {
					if ((capTypeStr.equals("Enforcement/Code Compliance/Community/Community Sweep") || capTypeStr.equals("Enforcement/Code Compliance/Community/Constituent Complaint")) && !matches(capStatusStr, "Closed", "Close - Dismissed") && unitType == null && unitNo == null) {
						//logDebug("I am inside the wanted loop");
						capIdArray.push(capIdObj.getCustomID());
						objMap[capIdObj.getCustomID()] = capStatusStr;

					}

				} else {
					if ((appTypeString.equals(capTypeStr)) && !matches(capStatusStr, "Closed", "Close - Dismissed") && unitType == null && unitNo == null) {
						//logDebug("I am inside the wanted loop");
						capIdArray.push(capIdObj.getCustomID());
						objMap[capIdObj.getCustomID()] = capStatusStr;

					}
				}

			}
		}

		capIdArray.sort();

		if (capIdArray.length > 0) {
			var crhcapexist = capIdArray[0].search('CRH');
			if (crhcapexist == "-1") {
				updateTask("Intake", "Duplicate", "Updated by script", "", "", capId);
			} else {
				updateTask("Inspection Status", "Duplicate", "Updated by script", "", "", capId);
			}
			if (capIDString != 'TMP') {
				emailContactDupCheck("Baltimore County Code Enforcement", " Thank you for submitting your complaint. An investigation is already underway for " + Address + ". The inspector will be informed of your complaint in conjunction with the ongoing investigation. You may obtain additional information by searching existing complaints.<br/><br/>This is a system generated email. Do not reply.", "Complainant");
			}
		}

		if (capIdArray)
			return (capIdArray);
		else
			return false;
	} catch (err) {
		logDebug("A JavaScript Error occured in custom function capIdsGetByMatchingAddr: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171025 conversion end
