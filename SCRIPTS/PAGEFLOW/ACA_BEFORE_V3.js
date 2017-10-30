/*------------------------------------------------------------------------------------------------------/
| Program : ACA_BEFORE_V3.js
| Event   : ACA Page Flow Template
|
| Usage   : Designed for Pageflow: 	ANIMAL LICENSES, Affirmation, BeforeClick Event
|									ANIMAL LICENSE RENEWAL, Affirmation, BeforeClick Event
|									RENTAL HOUSING REGISTRATION, Application Information, BeforeClick Event
|									RENTAL HOUSING REGISTRATION RENEWAL, Application Information, BeforeClick Event
|									RENTAL HOUSING REGISTRATION EXEMPTION, Applicant Info, BeforeClick Event
|
| Client  : Baltimore County
| Action# : N/A
|
| Notes   : Rewritten to resolve architectural differences in Pageflow Table loading and written to 3.0
|			EMSE Best Practices - 10.9.17 - jchalk
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

/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var message = ""; // Message String
var debug = ""; // Debug String
var br = "<BR>"; // Break Tag
var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var parentId = cap.getParentCapID();
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString(); // Convert application type to string ("Building/A/B/C")
var appTypeArray = appTypeString.split("/"); // Array of application type string

loadASITables4ACA(cap);
var AInfo = new Array();
loadAppSpecific4ACA(AInfo);

// page flow custom code begin
var sysDate = aa.date.getCurrentDate();
var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "");

//License/Animal/Pet/NA
if (appMatch("License/Animal/Pet/NA")) {
	if (typeof(PETINFORMATION) != "object") {
		cancel = true;
		showMessage = true;
		comment("You must provide information for at least one Pet");
	} else {
		loopThroughPetLicense();
	}
	checkRabiesCertificate();
}

//License/Animal/Pet/Renewal
if (appMatch("License/Animal/Pet/Renewal")) {
	if (AInfo["Rabies Expiration Date"] <= sysDateMMDDYYYY) {
		cancel = true;
		showMessage = true;
		comment("Rabies Expiration Date Must be filled out");
	}

	if (typeof(PETINFORMATION) != "object") {
		cancel = true;
		showMessage = true;
		comment("You must provide information for at least one Pet");
	} else {
		loopThroughPetLicense();
	}

	checkRabiesCertificate();
}
/*
//License/Rental Housing/Registration/*
if (appMatch("License/Rental Housing/Registration/*")) {
//Before 1950
if (AInfo['Before 1950'] == "Yes") {
if (AInfo['Registered'] == "No") {
cancel = true;
showMessage = true;
comment("Is this property Lead registered with Maryland Department of Environment (MDE)?");
}

//Registered
if (AInfo['Registered'] == "Yes") {
//MDE No Blank
if ((AInfo['MDE No'] == null || AInfo['MDE No'] == "")) {
cancel = true;
showMessage = true;
comment("Maryland Department of Environment (MDE) Tracking #: ");
} else {
//MDE No not Blank
if (AInfo['Reg Current'] == "No") {
cancel = true;
showMessage = true;
comment("Is the property Lead registration current?");
}

if ((AInfo['Lead Cert No'] == null || AInfo['Lead Cert No'] == "") && AInfo['Reg Current'] == "Yes") {
cancel = true;
showMessage = true;
comment("What is your Lead Certificate # for current tenancy?");
}
}
}
}

if (AInfo['Sewage System'] == "Private") {
cancel = true;
showMessage = true;
comment("You have indicated the sewage system is private.  If so, please fill out a Rental Exemption application instead of a Rental Registration License application.");
}

if (AInfo['Smoke Connected'] == "No") {
cancel = true;
showMessage = true;
comment("Smoke Detectors must be inter-connected per regulation");
}

if ((AInfo['Number of Smoke Detectors'] == 0)) {
cancel = true;
showMessage = true;
comment("Property must have at least one Smoke Dectector");
}

if ((AInfo['Not Owner Occupied Unit/Apartment'] > 6)) {
cancel = true;
showMessage = true;
comment("If property have more than 6 units you will need to apply for a Rental Exemption not a Rental License.");
}
}
// page flow custom code end
 */

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

function loopThroughPetLicense() {
	for (eachrow in PETINFORMATION) {
		var currentDate = new Date();
		if (convertDate((PETINFORMATION[eachrow]["Rabies Expiration Date"])) <= currentDate) { //expressions enforcing this
			cancel = true;
			showMessage = true;
			comment("Rabies Expiration Date must be greater than today");
		}
		if ((PETINFORMATION[eachrow]["Animal Hospital/Vet Phone"]) == null) { //Required field, expressions enforcing this
			cancel = true;
			showMessage = true;
			comment("Animal Hospital/Vet Phone from Rabies Must be filled out");
		}
		if ((PETINFORMATION[eachrow]["Animal Hospital/Vet Name"]) == null) { //Required field, expressions enforcing this
			cancel = true;
			showMessage = true;
			comment("Animal Hospital/Vet Name from Rabies Must be filled out");
		}
	}
}

function comment(cstr) {
	if (showDebug)
		logDebug(cstr);
	if (showMessage)
		logMessage(cstr);
}

function logDebug(dstr) {
	vLevel = 1
		if (arguments.length > 1)
			vLevel = arguments[1];
		if ((showDebug & vLevel) == vLevel || vLevel == 1)
			debug += dstr + br;
		if ((showDebug & vLevel) == vLevel)
			aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
}

function logMessage(dstr) {
	message += dstr + br;
}

function appMatch(ats) // optional capId or CapID string
{
	var matchArray = appTypeArray //default to current app
		if (arguments.length == 2) {
			matchCapParm = arguments[1]
				if (typeof(matchCapParm) == "string")
					matchCapId = aa.cap.getCapID(matchCapParm).getOutput(); // Cap ID to check
				else
					matchCapId = matchCapParm;
				if (!matchCapId) {
					logDebug("**WARNING: CapId passed to appMatch was not valid: " + arguments[1]);
					return false
				}
				matchCap = aa.cap.getCap(matchCapId).getOutput();
			matchArray = matchCap.getCapType().toString().split("/");
		}

		var isMatch = true;
	var ata = ats.split("/");
	if (ata.length != 4)
		logDebug("**ERROR in appMatch.  The following Application Type String is incorrectly formatted: " + ats);
	else
		for (xx in ata)
			if (!ata[xx].equals(matchArray[xx]) && !ata[xx].equals("*"))
				isMatch = false;
	return isMatch;
}

function convertDate(thisDate) {

	if (typeof(thisDate) == "string") {
		var retVal = new Date(String(thisDate));
		if (!retVal.toString().equals("Invalid Date"))
			return retVal;
	}

	if (typeof(thisDate) == "object") {

		if (!thisDate.getClass) // object without getClass, assume that this is a javascript date already
		{
			return thisDate;
		}

		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) {
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
		}

		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) {
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
		}

		if (thisDate.getClass().toString().equals("class java.util.Date")) {
			return new Date(thisDate.getTime());
		}

		if (thisDate.getClass().toString().equals("class java.lang.String")) {
			return new Date(String(thisDate));
		}
		if (thisDate.getClass().toString().equals("class java.sql.Timestamp")) {
			return new Date(thisDate.getMonth() + "/" + thisDate.getDate() + "/" + thisDate.getYear());
		}
	}

	if (typeof(thisDate) == "number") {
		return new Date(thisDate); // assume milliseconds
	}

	logDebug("**WARNING** convertDate cannot parse date : " + thisDate);
	return null;

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

function dateFormatted(pMonth, pDay, pYear, pFormat)
//returns date string formatted as YYYY-MM-DD or MM/DD/YYYY (default)
{
	var mth = "";
	var day = "";
	var ret = "";
	if (pMonth > 9)
		mth = pMonth.toString();
	else
		mth = "0" + pMonth.toString();

	if (pDay > 9)
		day = pDay.toString();
	else
		day = "0" + pDay.toString();

	if (pFormat == "YYYY-MM-DD")
		ret = pYear.toString() + "-" + mth + "-" + day;
	else
		ret = "" + mth + "/" + day + "/" + pYear.toString();

	return ret;
}

function checkRabiesCertificate() {
	docsMissing = false;
	showList = true;
	capIdString = capId.getID1() + "-" + capId.getID2() + "-" + capId.getID3();

	r = new Array();
	r[0] = "Rabies Certificate";

	submittedDocList = aa.document.getDocumentListByEntity(capIdString, "TMP_CAP").getOutput().toArray();
	uploadedDocs = new Array();
	for (var i in submittedDocList)
		uploadedDocs[submittedDocList[i].getDocCategory()] = true;

	if (r.length > 0 && showList) {
		for (x in r) {
			if (uploadedDocs[r[x]] == undefined) {
				showMessage = true;
				cancel = true;
				if (!docsMissing) {
					comment("<div class='docList'><span class='fontbold font14px ACA_Title_Color'>The following document is required based on the information you have provided: </span><ol>");
					docsMissing = true;
				}
				comment(r[x]);
			}
		}
	}
}
