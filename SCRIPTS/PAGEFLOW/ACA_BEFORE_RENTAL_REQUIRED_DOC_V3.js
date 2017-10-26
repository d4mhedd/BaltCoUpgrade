/*------------------------------------------------------------------------------------------------------/
| Program : ACA_BEFORE_RENTAL_REQUIRED_DOC_V3.js
| Event   : ACA Page Flow Template
|
| Usage   : Designed for Pageflow: 	RENTAL HOUSING REGISTRATION RENEWAL, Documents, BeforeClick Event
|
| Client  : Baltimore County
| Action# : N/A
|
| Notes   : Rewritten to 3.0 EMSE Best Practices - 10.9.17 - jchalk
|			
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
var cancel = false;
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
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/


// page flow custom code begin

loadASITables4ACA(cap);

if (appMatch("License/Rental Housing/Exemption/NA") || appMatch("License/Rental Housing/Registration/NA")) {
	if (typeof(DOCUMENTS) != "object") {
		cancel = true;
		showMessage = true;
		comment("You must provide information for at least one Document");
	} else {
		for (eachrow in DOCUMENTS) {
			if (DOCUMENTS[eachrow]["Document Type"] != "Carbon Monoxide Alarm Verification") {
				cancel = true;
				showMessage = true;
				comment("Carbon Monoxide Alarm Verification is Required");
			}
		}
	}
}
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