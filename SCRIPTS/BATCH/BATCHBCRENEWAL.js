/*------------------------------------------------------------------------------------------------------/
| Program:          BatchBCRenewal.js  Trigger: Batch
| Client:           Baltimore County
| Author:           Fandican
| Date Created:     08/22/2012
| Date Modified:    09/7/2012
| Notes:            08/23/2012 send email for applicant disabled.
|                   9/7/2012 in the main loop code checks for null objects and skips them.
|                   GY  11/30/2012  turned off debug.
|                    3/5/2014 Eric Enabled email to applicant
/------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------/
	START USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
aa.env.setValue("fromDate","10/01/2013");
aa.env.setValue("toDate","04/01/2014");
aa.env.setValue("appGroup","MiscPermits");
aa.env.setValue("appType","Residential Parking");
aa.env.setValue("appSubtype","Residential Parking Permit");
aa.env.setValue("appCategory","Permit");
aa.env.setValue("setPrefix","");

//Use federalepermits@techglobalinc.com on the DEV server as the FROM Email ID
aa.env.setValue("emailAddress","noreply@baltimorecountymd.gov");  //FROM Email ID
aa.env.setValue("ccemailAddress","");//If CC is required
aa.env.setValue("emailReportID",""); // ADMIN ID

var realemailAddress = "";           // Application Contact Email ID
var wfStatus = aa.env.getValue("WorkflowStatus");	// Status of workflow that triggered event
var emailText = "";
var showMessage = true;			     // Set to true to see results in popup window
var showDebug = true;				 // Set to true to see debug messages in popup window
var maxSeconds = 19*60; //4*60;		 // number of seconds allowed for batch processing, usually < 5*60
var debug = "";						 // Debug String
/*------------------------------------------------------------------------------------------------------/

	END USER CONFIGURABLE PARAMETERS

/------------------------------------------------------------------------------------------------------*/

var sysDate = aa.date.getCurrentDate();
var batchJobResult = aa.batchJob.getJobID();
var batchJobName = "" + aa.env.getValue("BatchJobName");	// Name of the batch job

var batchJobID = 0;
if( batchJobResult.getSuccess() )
{
  batchJobID = batchJobResult.getOutput();
  logDebug("Batch Job " + batchJobName + " Job ID is " + batchJobID+"<br>");
}
else
  logDebug("WARNING","Batch job ID not found " + batchJobResult.getErrorMessage());


/*----------------------------------------------------------------------------------------------------/

| Start: BATCH PARAMETERS
|	getParam function also logs params to the Event Log

/------------------------------------------------------------------------------------------------------*/
var fromDate = "" + aa.env.getValue("fromDate");
var toDate = "" + aa.env.getValue("toDate");

var dFromDate = aa.date.parseDate(fromDate);			
var dToDate = aa.date.parseDate(toDate);				

var appGroup = getParam("appGroup");					    //   app Group to process {Licenses}
var appType = getParam("appType");				            //   app type to process {Rental License}
var appSubtype = getParam("appSubtype");				    //   app subtype to process {NA}
var appCategory = getParam("appCategory");				    //   app category to process {NA}
var setPrefix = getParam("setPrefix");					    //   Prefix for set ID
var emailAddress = getParam("emailAddress");			    // email to send report
var ccAddress = getParam("ccemailAddress");			        // ccemail to send report
//var reportId = getParam("reportId");					    // Report ID
//var emailReportID = getParam("emailReportID");		    // email to send report

var reportId = "" + aa.env.getValue("reportId");			// Report ID
var emailReportID = "" + aa.env.getValue("emailReportID");	// email to send report
/*----------------------------------------------------------------------------------------------------/

| End: BATCH PARAMETERS

/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var systemUserObj = aa.person.getUser("ADMIN").getOutput();  // Current User Object
var timeExpired = false;
var bSetCreated = false; //Don't create a set until we find our first app
var setId = "";
var feeSchd = "";

var appTypeType = appGroup + "/" + appType + "/" + appSubtype + "/" + appCategory;
logDebug("Search for CAPs with Type: " + appType );  


//	Begin Processing CAPs within date range
var expResult = aa.expiration.getLicensesByDate("Active", fromDate, toDate);

var capCount = 0; //Counter for Caps processed

//FA 9/7/2012 populate null cap objects
var NullCapIDs="";

if(expResult.getSuccess() )
{
    expArray = expResult.getOutput();
	logDebug("Searching through " + expArray.length + " permits.  Elapsed Time : " + elapsed() + " Seconds<br><br>");
	//expArray = expArray.splice(1,55);
	
    for( yy in expArray )
	{
		if( elapsed() > maxSeconds ) // only continue if time hasn't expired
		{ 
			logDebug("A script timeout has caused partial completion of this process.  Please re-run.  " + 

elapsed() + " seconds elapsed, " + maxSeconds + " allowed.<br>") ;
			logDebug("Looped through " + yy + " records.<br>") ;
			timeExpired = true ;
			break; 
		}

		if (expArray[yy] == null)
		{
			//logDebug("WARNING", "permit #" + yy + " is null");
			continue;
		}

		//This is the expired license object, but not a true capId
		oB1 = expArray[yy];
		b1CapId = expArray[yy].getCapID();
		
		//Need a workaround to get an actual capId object
		var capId1 = b1CapId.getID1();	
		var capId2 = b1CapId.getID2();		
		var capId3 = b1CapId.getID3();			
		var capId = getCapId(capId1,capId2,capId3); // call internal function
		var altId = capId.getCustomID();
			
		//Need to create appTypeArray for appMatch function
		var cap = aa.cap.getCap(capId).getOutput();				// Cap object
		
		//FA 9/7/2012 check to see if cap object is null if so move to the next cap
		if(cap==null){
		    NullCapIDs+=capId.getCustomID() + ",";
		    continue; 
		}
		
		var appTypeResult = cap.getCapType();
		var appTypeString = appTypeResult.toString();			// Convert application type to string 

("Building/A/B/C")
		var appTypeArray = appTypeString.split("/");			// Array of application type string
		var feeSeq = null;
		
        //logDebug("CAP ID " + capId+ "<br>");
        //logDebug("ALT ID " + altId+ "<br>");
        logDebug("App Type " + appTypeType+ "<br>");
        
      
        var emailSubj = "Electronic notification for permit about to expire";
        var emailText = "Your Permit is about to Expire, Please renew";
        realemailAddress = "";
        var contactType = "Applicant";

	    var capContactResult = aa.people.getCapContactByCapID(b1CapId);
	    
	    if (capContactResult.getSuccess())
		{
		var Contacts = capContactResult.getOutput();
		for (yy in Contacts)
          {
            //Commented RN on 11/17/11  
            //logDebug("Contact Type " + Contacts[yy].getCapContactModel().getPeople().getContactType());
			if (contactType.equals(Contacts[yy].getCapContactModel().getPeople().getContactType()))
				if (Contacts[yy].getEmail() != null)
					realemailAddress = "" + Contacts[yy].getEmail() + ";" + realemailAddress;
		  }
        
        }
        
		//Does the CAP match the appTypeType we are looking for.
		if( !appMatch(appTypeType) )
			continue;
			
		    logDebug(altId+ "<br>");
		
           		var ren = new licenseObject(null);
				var refLicPro = getRefLicenseProf(altId);

				//Get Renewal Info
				expDate = oB1.getExpDate();
				expDateString = expDate.getMonth() + "/" + expDate.getDayOfMonth() + "/" + expDate.getYear(); 
				expStatus = oB1.getExpStatus();
          
          //Send email with job stats to emailAddress
        emailText = "This is a reminder that your permit will expire on " + expDateString + ".";
        emailText = emailText + "<br>" + "<br>";
                
        if (emailAddress.length) 
         {
            /* 8/23/2012 Send email disabled */
           aa.sendMail(emailAddress, realemailAddress, ccAddress, emailSubj, emailText);       
                     }
         logDebug("Applicant Email Address: " + realemailAddress);
       
                
				//Set Renewal Info Expiration Status field
				ren.setStatus("About To Expire");

				//Set CAP Status
				aa.cap.updateAppStatus(capId,"APPLICATION","About To Expire", sysDate, "Updated by Script" 

,systemUserObj);
                
				//Count this CAP as processed
				capCount++;
				
				var capDetail = "";
				var capDetailObjResult = aa.cap.getCapDetail(capId);			// Detail
				if (capDetailObjResult.getSuccess())
				{
					capDetail = capDetailObjResult.getOutput();
					var balanceDue = capDetail.getBalance();
				}
          //  }

	}//DONE Processing CAPs

    logDebug("NullCapIDs: " + NullCapIDs); //FA 9/7/2012 print null cap IDs if any
	logDebug("<br>Total CAPS in date range: " + expArray.length+"<br>");
 	logDebug("Total CAPS processed: " + capCount+"<br>");

	//if( bSetCreated ) //This means we modified at least one CAP Task
	{
		//Send email to the Administrator
		if ( emailReportID.length )
			aa.sendMail(emailAddress, emailReportID, "", batchJobName + " Batch job executed sucessfully " ,"The 

Renewal batch job has completed successfully.");
	}
		
	logDebug("End of Job: Elapsed Time : " + elapsed() + " Seconds<br>");

}
else
{
     logDebug( "Error getting CAPs: " + expResult.getErrorMessage() );
}
/*---------------------------------------------------------------------------------------------------------------------------

-------
|	********   END MAIN LOOP   ***********
-----------------------------------------------------------------------------------------------------------------------------

-----*/

/**************FUNCTIONS******************************
*****************************************************/
//HELPER FUNCTIONS
function elapsed() 
{
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	return ((thisTime - startTime) / 1000)
}

function logDebug(dstr) 
{
  debug= debug + dstr + "<BR>";
}

function getParam(pParamName) //gets parameter value and logs message showing param value
{
	var ret = "" + aa.env.getValue(pParamName);
	//Commented RN on 11/17/11
    //logDebug("PARAMETER: " + pParamName+" = "+ret +"<br>");
	return ret;
}

function appMatch(ats) // optional capId or CapID string
{
	var matchArray = appTypeArray //default to current app
	if (arguments.length == 2) 
	{
		matchCapParm = arguments[1]
		if (typeof(matchCapParm) == "string")
			matchCapId = aa.cap.getCapID(matchCapParm).getOutput();   // Cap ID to check
		else
			matchCapId = matchCapParm;

		if (!matchCapId)
		{
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

function getCapId(pid1,pid2,pid3)
{
    var s_capResult = aa.cap.getCapID(pid1, pid2, pid3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logDebug("Failed to get capId: " + s_capResult.getErrorMessage() );
      return null;
    }
}

function isTaskActive(wfstr) // optional process name
{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) 
	{
		processName = arguments[1]; // subprocess
		useProcess = true;
	}

	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ logDebug("Failed to get workflow object: " + s_capResult.getErrorMessage()); return false; }
	
	for (i in wfObj)
	{
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || 

fTask.getProcessCode().equals(processName)))
			if (fTask.getActiveFlag().equals("Y"))
				return true;
			else
				return false;
	}
}

function updateAppStatus(stat,cmt) // optional cap id
{
	var itemCap = capId;
	if (arguments.length == 3) itemCap = arguments[2]; // use cap ID specified in args

	var updateStatusResult = aa.cap.updateAppStatus(itemCap,"APPLICATION",stat, sysDate, cmt ,systemUserObj);
	if (updateStatusResult.getSuccess())
		logDebug("Updated application status to " + stat + " successfully.<br>");
	else
		logDebug("**ERROR: application status update to " + stat + " was unsuccessful.  The reason is "  + 

updateStatusResult.getErrorType() + ":" + updateStatusResult.getErrorMessage());
}

function getAppSpecific(itemName)  // optional: itemCap
{
	var updated = false;
	var i=0;
	var itemCap = capId;
	if (arguments.length == 2) itemCap = arguments[1]; // use cap ID specified in args
   	
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
	if (appSpecInfoResult.getSuccess())
 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (itemName != "")
		{
			for (i in appspecObj)
				if (appspecObj[i].getCheckboxDesc() == itemName)
				{
					return appspecObj[i].getChecklistComment();
					break;
				}
		} // item name blank
	} 
	else
		{ logDebug( "**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage()) }
}
	
function updateTask(wfstr,wfstat,wfcomment,wfnote) // optional process name, cap id
{
	var useProcess = false;
	var processName = "";
	if (arguments.length > 4) 
	{
		if (arguments[4] != "")
		{
			processName = arguments[4]; // subprocess
			useProcess = true;
		}
	}
	var itemCap = capId;
	if (arguments.length == 6) itemCap = arguments[5]; // use cap ID specified in args
 
	var workflowResult = aa.workflow.getTasks(itemCap);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else
	{ logDebug("Failed to get workflow object: " + s_capResult.getErrorMessage()); return false; }
            
	if (!wfstat) wfstat = "NA";
            
	for (i in wfObj)
	{
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || 

fTask.getProcessCode().equals(processName)))
		{
			var dispositionDate = aa.date.getCurrentDate();
			var stepnumber = fTask.getStepNumber();
			var processID = fTask.getProcessID();
			if (useProcess)
				aa.workflow.handleDisposition(itemCap,stepnumber,processID,wfstat,dispositionDate, 

wfnote,wfcomment,systemUserObj,"U");
			else
				

aa.workflow.handleDisposition(itemCap,stepnumber,wfstat,dispositionDate,wfnote,wfcomment,systemUserObj,"U");
			logDebug("Updating Workflow Task " + wfstr + " with status " + wfstat+"<br>");
			//logDebug("Updating Workflow Task " + wfstr + " with status " + wfstat);
		}                                   
	}
}

function createExpirationSet( prefix )
{
	// Create Set
	if (prefix != "")
	{
		var yy = startDate.getFullYear().toString().substr(2,2);
		var mm = (startDate.getMonth() +1 ).toString(); //getMonth() returns (0 - 11)
		if (mm.length<2)
			mm = "0"+mm;
		var dd = startDate.getDate().toString();
		if (dd.length<2)
			dd = "0"+dd;
		var hh = startDate.getHours().toString();
		if (hh.length<2)
			hh = "0"+hh;
		var mi = startDate.getMinutes().toString();
		if (mi.length<2)
			mi = "0"+mi;

		var setName = prefix.substr(0,5) + yy + mm;

		setDescription = prefix + " : " + mm + yy;
		
		setResult = aa.set.getSetByPK(setName);
		setExist = false;
		setExist = setResult.getSuccess();
		if (!setExist) 
		{
			var setCreateResult= aa.set.createSet(setName,setDescription);
			if( setCreateResult.getSuccess() )
			{
				logDebug("New Set ID "+setName+" created for CAPs processed by this batch job.<br>");
				return setName;
			}
			else
				logDebug("ERROR: Unable to create new Set ID "+setName+" for CAPs processed by this batch 

job.");
		}
		else
		{
			logDebug("Set " + setName + " already exists and will be used for this batch run<br>");
			return setName;
		}
	}
}

function isNull(pTestValue)
{
	if (pTestValue==null || pTestValue=="")
		return true;
	else
		return false;
}

function getPrimaryLicProfEmail()
{
	var capLicenseResult = aa.licenseScript.getLicenseProf(capId);
	if (capLicenseResult.getSuccess())
		{ var capLicenseArr = capLicenseResult.getOutput();  }
	else
		{ logDebug("**ERROR: getting lic prof: " + capLicenseResult.getErrorMessage()); }
		
	if (capLicenseArr == null || !capLicenseArr.length)
		{ logDebug("**WARNING: no licensed professionals on this CAP"); }

	for( xx in capLicenseArr )
	{
	  oContractor = capLicenseArr[xx];

	  if(oContractor.getPrimStatusCode().toUpperCase() == "Y")
		return oContractor.getEmail(); 
	}

	//default
	return null;
}

function licenseObject(licnumber)
	{
	// available statuses (from various R1_SERVER_CONSTANT values
	var licenseStatus = new Array("","Active","Inactive", "About To Expire","Delinquent","Expired","Invalid","Pending");

	this.refProf = null;		// licenseScriptModel (reference licensed professional)
	this.b1Exp = null;		// b1Expiration record (renewal status on application)
	this.b1ExpDate = null;
	this.b1ExpCode = null;
	this.b1Status = null;
	this.refExpDate = null;
	this.licNum = licnumber;	// License Number


	// Load the reference License Professional if we're linking the two
	if (licnumber) // we're linking
		{
		var newLic = getRefLicenseProf(licnumber)
		if (newLic) {
				this.refProf = newLic;
				tmpDate = newLic.getLicenseExpirationDate();
				if (tmpDate)
						this.refExpDate = tmpDate.getMonth() + "/" + tmpDate.getDayOfMonth() + "/" + 

tmpDate.getYear();
				logDebug("Loaded reference license professional with Expiration of " + this.refExpDate);
				}
		}

   	// Load the renewal info (B1 Expiration)
   	// The only way to pull up a renewal is to supply a status.  I don't understand since it has a 1 to 1 relationship 

with b1permit, but oh well.
   	// the silly thing returns a blank record, so have to check the B1expirationModel to see if it's valid

   	for (myStatus in licenseStatus) {
   		b1ExpResult = aa.expiration.getLicensesByCapID(capId,licenseStatus[myStatus]);
   		if (b1ExpResult.getSuccess()) {
   			this.b1Exp = b1ExpResult.getOutput();
   			exptest = this.b1Exp.getB1Expiration();
    			if (exptest) {
    				tmpDate = this.b1Exp.getExpDate();
    				if (tmpDate)
    					this.b1ExpDate = tmpDate.getMonth() + "/" + tmpDate.getDayOfMonth() + "/" + 

tmpDate.getYear();
    				this.b1Status = this.b1Exp.getExpStatus();
    				logDebug("Found renewal record of status : " + this.b1Status + ", Expires on " + 

this.b1ExpDate+"<br>");
    				break;
    			}
		}
		else
			{ logDebug("**ERROR: Getting B1Expiration Object for Cap.  Reason is: " + b1ExpResult.getErrorType() 

+ ":" + gisObjResult.getErrorMessage()) ; return false }
	}

   	this.setExpiration = function(expDate)
   		// Update expiration date
   		{
   		var expAADate = aa.date.parseDate(expDate);

   		if (this.refProf) {
   			this.refProf.setLicenseExpirationDate(expAADate);
   			aa.licenseScript.editRefLicenseProf(this.refProf);
   			logDebug("Updated reference license expiration to " + expDate+"<br>"); }

   		if (this.b1Exp)  {
 				this.b1Exp.setExpDate(expAADate);
				aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration());
				logDebug("Updated renewal to " + expDate+"<br>"); }
   		}

	this.setIssued = function(expDate)
		// Update Issued date
		{
		var expAADate = aa.date.parseDate(expDate);

		if (this.refProf) {
			this.refProf.setLicenseIssueDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			logDebug("Updated reference license issued to " + expDate+"<br>"); }

		}
	this.setLastRenewal = function(expDate)
		// Update expiration date
		{
		var expAADate = aa.date.parseDate(expDate)

		if (this.refProf) {
			this.refProf.setLicenseLastRenewalDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			logDebug("Updated reference license issued to " + expDate+"<br>"); }
		}

	this.setStatus = function(licStat)
		// Update expiration status
		{
		if (this.b1Exp)  {
			this.b1Exp.setExpStatus(licStat);
			aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration());
			logDebug("Updated renewal to status " + licStat+"<br>"); }
		}

	this.getStatus = function()
		// Get Expiration Status
		{
		if (this.b1Exp) {
			return this.b1Exp.getExpStatus();
			}
		}

	this.getCode = function() {
		// Get Expiration Status
		if (this.b1Exp) {
			return this.b1Exp.getExpCode();
			}
		}

	this.getExpInterval = function() {
		if (this.b1Exp) {
			return this.b1Exp.getExpInterval();
		}
	}

	this.getExpDateString = function() {
		if (this.b1Exp) {
			return this.b1Exp.getExpDateString();
		}
	}

	this.getExpDate = function() {
		if (this.b1Exp) {
			return this.b1Exp.getExpDate();
		}
	}
}
function getRefLicenseProf(refstlic)
	{
	var refLicObj = null;
	var refLicenseResult = aa.licenseScript.getRefLicensesProfByLicNbr(aa.getServiceProviderCode(),refstlic);
	if (!refLicenseResult.getSuccess())
		{ logDebug("**ERROR retrieving Ref Lic Profs : " + refLicenseResult.getErrorMessage()); return false; }
	else
		{
		var newLicArray = refLicenseResult.getOutput();
		if (!newLicArray) return null;
		for (var thisLic in newLicArray)
			if (refstlic && refstlic.toUpperCase().equals(newLicArray[thisLic].getStateLicense().toUpperCase()))
				refLicObj = newLicArray[thisLic];
		}

	return refLicObj;
	}
function lookup(stdChoice,stdValue) 
	{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice,stdValue);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		var bizDomScriptObj = bizDomScriptResult.getOutput();
		var strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		//logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
		}
	return strControl;
	}
	function addFee(fcode,fsched,fperiod,fqty,finvoice) // Adds a single fee, optional argument: fCap
	{
	// Updated Script will return feeSeq number or null if error encountered (SR5112) 
	var feeCap = capId;
	var feeCapMessage = "";
	var feeSeq_L = new Array();				// invoicing fee for CAP in args
	var paymentPeriod_L = new Array();			// invoicing pay periods for CAP in args
	var feeSeq = null;
	if (arguments.length > 5) 
		{
		feeCap = arguments[5]; // use cap ID specified in args
		feeCapMessage = " to specified CAP";
		}

	assessFeeResult = aa.finance.createFeeItem(feeCap,fsched,fcode,fperiod,fqty);
	if (assessFeeResult.getSuccess())
		{
		feeSeq = assessFeeResult.getOutput();
		logDebug("Successfully added Fee " + fcode + ", Qty " + fqty + feeCapMessage+"<br>");

		if (finvoice == "Y" && arguments.length == 5) // use current CAP
			{
			feeSeqList.push(feeSeq);
			paymentPeriodList.push(fperiod);
			}
		if (finvoice == "Y" && arguments.length > 5) // use CAP in args
			{
			feeSeq_L.push(feeSeq);
			paymentPeriod_L.push(fperiod);
			var invoiceResult_L = aa.finance.createInvoice(feeCap, feeSeq_L, paymentPeriod_L);
			if (!invoiceResult_L.getSuccess())
				logDebug("**ERROR: Invoicing the fee items assessed" + feeCapMessage + " was not successful.  

Reason: " +  invoiceResult.getErrorMessage());
			}
		}
	else
		{
		logDebug( "**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		feeSeq = null;
		}
	
	return feeSeq;
	   
	}
function matches(eVal,argList) {
   for (var i=1; i<arguments.length;i++)
   	if (arguments[i] == eVal)
   		return true;
}
function taskStatus(wfstr) // optional process name and capID
	{
	var useProcess = false;
	var processName = "";
	var itemCap = capId;
	if (arguments.length >= 2)
		{
		processName = arguments[1]; // subprocess
		if (processName) useProcess = true;
		}

	if (arguments.length == 3) itemCap = arguments[2]; // use cap ID specified in args



	var workflowResult = aa.workflow.getTasks(itemCap);
 	if (workflowResult.getSuccess())
  	 	var wfObj = workflowResult.getOutput();
  	else
  	  	{ logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage()); return false; }

	for (i in wfObj)
		{
   		var fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || 

fTask.getProcessCode().equals(processName)))
			return fTask.getDisposition()
		}
	}
function loadASITable(tname) {

 	//
 	// Returns a single ASI Table array of arrays
	// Optional parameter, cap ID to load from
	//

	var itemCap = capId;
	if (arguments.length == 2) itemCap = arguments[1]; // use cap ID specified in args

	var gm = aa.appSpecificTableScript.getAppSpecificTableGroupModel(itemCap).getOutput();
	var ta = gm.getTablesArray()
	var tai = ta.iterator();

	while (tai.hasNext())
	  {
	  var tsm = tai.next();
	  var tn = tsm.getTableName();

      if (!tn.equals(tname)) continue;

	  if (tsm.rowIndex.isEmpty())
	  	{
			logDebug("Couldn't load ASI Table " + tname + " it is empty");
			return false;
		}

   	  var tempObject = new Array();
	  var tempArray = new Array();

  	  var tsmfldi = tsm.getTableField().iterator();
	  var tsmcoli = tsm.getColumns().iterator();
	  var numrows = 1;

	  while (tsmfldi.hasNext())  // cycle through fields
		{
		if (!tsmcoli.hasNext())  // cycle through columns
			{
			var tsmcoli = tsm.getColumns().iterator();
			tempArray.push(tempObject);  // end of record
			var tempObject = new Array();  // clear the temp obj
			numrows++;
			}
		var tcol = tsmcoli.next();
		var tval = tsmfldi.next();
		tempObject[tcol.getColumnName()] = tval;
		}
	  tempArray.push(tempObject);  // end of record
	  }
	  return tempArray;
	}
    
//aa.env.setValue("ScriptReturnMessage", debug);