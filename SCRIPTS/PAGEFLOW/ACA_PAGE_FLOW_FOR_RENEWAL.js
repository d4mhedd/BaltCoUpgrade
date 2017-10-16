/*------------------------------------------------------------------------------------------------------/
| Program : ACARenewal.js
| Event   : ACA_Renew_Onload
| PageFlow: Renew Application
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
| Action# : N/A
|
| Notes   : new loadAppSpecific function from Achievo - 10/22/09 DMH
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;						// Set to true to see results in popup window
var showDebug = false;							// Set to true to see debug messages in popup window
var preExecute =""; // "PreExecuteForAfterEvents"				// Standard choice to execute first (for globals, etc)
var controlString = ""; //"ACA Correction ASIT Onload"; 		// Standard choice for control
var documentOnly = false;						// Document Only -- displays hierarchy of std choice steps
var disableTokens = false;						// turn off tokenizing of std choices (enables use of "{} and []")
var useAppSpecificGroupName = false;					// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;					// Use Group name when populating Task Specific Info Values
var enableVariableBranching = false;					// Allows use of variable names in branching.  Branches are not followed in Doc Only
var maxEntries = 99;							// Maximum number of std choice entries.  Entries must be Left Zero Padded
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var message =	"";							// Message String
var debug = "";								// Debug String
var br = "<BR>";							// Break Tag
var feeSeqList = new Array();						// invoicing fee list
var paymentPeriodList = new Array();					// invoicing pay periods

if (documentOnly) {
	doStandardChoiceActions(controlString,false,0);
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript();
	}



var cap = aa.env.getValue("CapModel");
var capId = cap.getCapID();
var servProvCode = capId.getServiceProviderCode();
var publicUser = false ;
var sysDate = aa.date.getCurrentDate();
var capDetail = "";
var capDetailObjResult = aa.cap.getCapDetail(capId);			// Detail
if (capDetailObjResult.getSuccess())
	{
	capDetail = capDetailObjResult.getOutput();
	var houseCount = capDetail.getHouseCount();
	var feesInvoicedTotal = capDetail.getTotalFee();
	var balanceDue = capDetail.getBalance();
	}

if (preExecute.length) doStandardChoiceActions(preExecute,true,0); 	// run Pre-execution code

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

doStandardChoiceActions(controlString,true,0);

if (debug.indexOf("**ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", debug);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
	}


/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
function getScriptAction(strControl)
	{
	var actArray = new Array();
	var maxLength = String("" + maxEntries).length;

	for (var count=1; count <= maxEntries; count++)  // Must be sequential from 01 up to maxEntries
		{
		var countstr = "000000" + count;
		countstr = String(countstr).substring(countstr.length,countstr.length - maxLength);
		var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(strControl,countstr);

	   	if (bizDomScriptResult.getSuccess())
	   		{
			bizDomScriptObj = bizDomScriptResult.getOutput();
			var myObj= new pairObj(bizDomScriptObj.getBizdomainValue());
			myObj.load(bizDomScriptObj.getDescription());
			if (bizDomScriptObj.getAuditStatus() == 'I') myObj.enabled = false;
			actArray.push(myObj);
			}
		else
			{
			break;
			}
		}
	return actArray;
	}
function doStandardChoiceActions(stdChoiceEntry,doExecution,docIndent)
	{
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	var lastEvalTrue = false;
	logDebug("Executing: " + stdChoiceEntry + ", Elapsed Time: "  + ((thisTime - startTime) / 1000) + " Seconds")

	var pairObjArray = getScriptAction(stdChoiceEntry);
	if (!doExecution) docWrite(stdChoiceEntry,true,docIndent);
	for (xx in pairObjArray)
		{
		doObj = pairObjArray[xx];
		if (doExecution)
			{
			if (doObj.enabled)
				if (eval(token(doObj.cri)) || (lastEvalTrue && doObj.continuation))
					{
					eval(token(doObj.act));
					lastEvalTrue = true;
					}
				else
					{
					if (doObj.elseact)
						eval(token(doObj.elseact));
					lastEvalTrue = false;
					}
			}
		else // just document
			{
			docWrite("|  ",false,docIndent);
			var disableString = "";
			if (!doObj.enabled) disableString = "<DISABLED>";

			if (doObj.elseact)
				docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act + " ^ " + doObj.elseact ,false,docIndent);
			else
				docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act,false,docIndent);

			for (yy in doObj.branch)
				{
				doStandardChoiceActions(doObj.branch[yy],false,docIndent+1);
				}
			}
		} // next sAction
	if (!doExecution) docWrite(null,true,docIndent);
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	logDebug("Finished: " + stdChoiceEntry + ", Elapsed Time: "  + ((thisTime - startTime) / 1000) + " Seconds")
	}

function docWrite(dstr,header,indent)
	{
	var istr = "";
	for (i = 0 ; i < indent ; i++)
		istr+="|  ";
	if (header && dstr)
		aa.print(istr + "------------------------------------------------");
	if (dstr) aa.print(istr + dstr);
	if (header)
		aa.print(istr + "------------------------------------------------");
	}


function token(tstr)
	{
	if (!disableTokens)
		{
		re = new RegExp("\\{","g") ; tstr = String(tstr).replace(re,"AInfo[\"");
		re = new RegExp("\\}","g") ; tstr = String(tstr).replace(re,"\"]");
		}
	return String(tstr);
  	}

function pairObj(actID)
	{
	this.ID = actID;
	this.cri = null;
	this.act = null;
	this.elseact = null;
	this.enabled = true;
	this.continuation = false;
	this.branch = new Array();

	this.load = function(loadStr) {
		//
		// load() : tokenizes and loades the criteria and action
		//
		loadArr = loadStr.split("\\^");
		if (loadArr.length < 2 || loadArr.length > 3)
			{
			logMessage("**ERROR: The following Criteria/Action pair is incorrectly formatted.  Two or three elements separated by a caret (\"^\") are required. " + br + br + loadStr)
			}
		else
			{
			this.cri     = loadArr[0];
			this.act     = loadArr[1];
			this.elseact = loadArr[2];

			if (this.cri.length() == 0) this.continuation = true; // if format is like ("^action...") then it's a continuation of previous line

			var a = loadArr[1];
			var bb = a.indexOf("branch");
			while (!enableVariableBranching && bb >= 0)
			  {
			  var cc = a.substring(bb);
			  var dd = cc.indexOf("\")");
			  this.branch.push(cc.substring(8,dd));
			  a = cc.substring(dd);
			  bb = a.indexOf("branch");
			  }

			}
		}
	}

function convertDate(thisDate)
// convert ScriptDateTime to Javascript Date Object
	{
	return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
	}


function logDebug(dstr)
	{
	debug+=dstr + br;
	}

function logMessage(dstr)
	{
	message+=dstr + br;
	}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/-----------------------------------------------------------------------------------------------------*/

updateRenew();

function updateRenew()
{

var partialCapId=getPartialCapID(capId);
var parentLicenseCAPID = getParentCapIDForReview(capId);
aa.print("parentLicenseCAPID"+parentLicenseCAPID);
var perNum = getAppSpecificValue('Senior Citizen',parentLicenseCAPID);
	//logDebug ("Renewal Permit = -->>>>>" + perNum );
setAppSpecificValue('Senior Citizen',capId,perNum );
	//added by pk
cap.setAppSpecificInfoGroups(aa.cap.getCapViewBySingle4ACA(capId).getAppSpecificInfoGroups()) ;
aa.env.setValue("CapModel", cap);
}

function getParentCapIDForReview(capid)
{
 if (capid == null || aa.util.instanceOfString(capid))
 {
  return null;
 }
 //1. Get parent license for review
 var result = aa.cap.getProjectByChildCapID(capid, "Renewal", null);
    if(result.getSuccess())
 {
  projectScriptModels = result.getOutput();
  if (projectScriptModels == null || projectScriptModels.length == 0)
  {
   aa.print("ERROR: Failed to get parent CAP with CAPID(" + capid + ") for review");
   return null;
  }
  //2. return parent CAPID.
  projectScriptModel = projectScriptModels[0];
  return projectScriptModel.getProjectID();
 }  
    else 
    {
      aa.print("ERROR: Failed to get parent CAP by child CAP(" + capid + ") for review: " + result.getErrorMessage());
      return null;
    }
}
function getIncompleteCapId()  
{
    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var result = aa.cap.getCapIDModel(s_id1, s_id2, s_id3);
    if(result.getSuccess())
	{
      return result.getOutput();
	}  
    else 
    {
      aa.print("ERROR: Failed to get capId: " + result.getErrorMessage());
      return null;
    }
}


function getAppSpecificValue(pItemName, pItemCapId) 
	{
	//modified version of getAppSpecific function created for this batch script
	////added by deepa
   	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(pItemCapId);
        
	if (appSpecInfoResult.getSuccess())
	 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (pItemName != "")
        
			for (i in appspecObj)
            {
                
				if (appspecObj[i].getCheckboxDesc() == pItemName)
					{
                    
					return appspecObj[i].getChecklistComment();
                    break;
					}
                    
              }
		} 
	else
		{ logDebug( "ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage())
          return false;
        }
	
	} 
    function setAppSpecificValue(pItemName, pItemCapId,pItemValue) 
	{
	//modified version of getAppSpecific function created for this batch script
	////added by deepa
   	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(pItemCapId);
        
	if (appSpecInfoResult.getSuccess())
	 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (pItemName != "")
        
			for (i in appspecObj)
            {
                
				if (appspecObj[i].getCheckboxDesc() == pItemName)
					{
                    
					  appspecObj[i].setChecklistComment(pItemValue);
                      var actionResult = aa.appSpecificInfo.editAppSpecInfos(appspecObj);
                                        if (actionResult.getSuccess()) 
                                        {							
                                            logDebug("app spec info item has been given a value of " + pItemValue);
                                        }else
                                        {
                                             logDebug("**ERROR: Setting the app spec info item .\nReason is: " +   actionResult.getErrorType() + ":" + actionResult.getErrorMessage());
                                        }
                    
                    break;
					}
                    
              }
		} 
	else
		{ logDebug( "ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage())
          return false;
        }
	
	}
// Get partial cap id
function getPartialCapID(capid)
{
	if (capid == null || aa.util.instanceOfString(capid))
	{
		return null;
	}
	//1. Get original partial CAPID  from related CAP table.
	var result = aa.cap.getProjectByChildCapID(capid, "EST", null);
	if(result.getSuccess())
	{
		projectScriptModels = result.getOutput();
		if (projectScriptModels == null || projectScriptModels.length == 0)
		{
			aa.print("ERROR: Failed to get partial CAP with CAPID(" + capid + ")");
			return null;
		}
		//2. Get original partial CAP ID from project Model
		projectScriptModel = projectScriptModels[0];
		return projectScriptModel.getProjectID();
	}  
	else 
	{
		aa.print("ERROR: Failed to get partial CAP by child CAP(" + capid + "): " + result.getErrorMessage());
		return null;
	}
}