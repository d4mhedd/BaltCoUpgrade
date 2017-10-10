/*------------------------------------------------------------------------------------------------------/
| Program: AnimalRenewal 2014.0.js  Trigger: Batch    | 
| Version 1.0 
|
| Script is run before licenses expire. Selects licenses by expiration status and expiration date range. 
| For each license, updates the following (all parameterized and optional):
| - Expiration Status
| - Application Status
| - Workflow Status (multiple tasks possible)
| - Assess and invoice new Fee (multiple fees possible, but only one fee schedule and period)
| - Added logic to send email to contact Applicatant  Eric Tenney 3/7/2014
| - Also updated status to remain the same. this script is only sending a email address out to the PET OWENER
	HISTORY
	====================


/------------------------------------------------------------------------------------------------------

For Testing in Batch Script Form

//aa.env.setValue("BatchJobName", "Animal License Renewal");
//aa.env.setValue("emailAddress", "noreply@accela.com")	

*/
/*------------------------------------------------------------------------------------------------------/
| START: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
var showDebug = true;					// Set to true to see debug messages in email confirmation
var maxSeconds = 480 * 60;				// 8 hours controls script timeout.  Number of seconds allowed for batch processing.  Usually < 5*60 ( = 300 seconds OR 5 minutes)
//var autoInvoiceFees = "Y";    // whether or not to invoice the fees added  (GG 7/10/2013 - comment out)
var asiFieldsUsed = false; // whether ASI or TSI fields are referenced by script. If not, set to false to save time
/*------------------------------------------------------------------------------------------------------/
| END: USER CONFIGURABLE PARAMETERS
/------------------------------------------------------------------------------------------------------*/
//Needed to log parameters below in eventLog
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = "" + aa.env.getValue("batchJobName");  //Animal License Renewal
/*----------------------------------------------------------------------------------------------------/
| START: BATCH JOB PARAMETERS
/------------------------------------------------------------------------------------------------------*/
var appGroup = "License";			//   "Licenses"  app Group to process.  (GG 7/10/2013 - changed to License from Licenses)
var appTypeType = "Animal";			//   "Animal"  app type to process.
var appSubtype = "Pet";			//   app subtype to process, *  (GG 7/10/2013 - added Pet)
var appCategory = "NA";			//   app category to process, e.g. *  (GG 7/10/2013 - added NA)
var licenseStatus = "Active,Pending";	// "Active".  Statuses to process,comma separated (GG 7/10/2013 - changed to Active from Pending1) 

var lookAheadDays = "90";   //NOT a Param		// Number of days from today {90} (GG 7/10/2013 - added 90 days) 
var daySpan = "90";		  //NOT a Param	// Days to search {7} (GG 7/10/2013 - added 7 days) 

var newRenewalStatus = "About To Expire";//  "About To Expire".  Change renewal status to this  
var newAppStatus = "Renewal";	// "Renewal".  Change App Status to this {gg 7/17/2013 removed workflow sets app status 
var editWorkflowTask = "License Issuance";// "License Issuance"  Open this task, set it to 
var editWorkflowStatus = "Renewal"; //   "Renewal"

var workflowFlowCode = "LICPET"; // //NOT a Param.  Values are LICPET or LICFACILITY
var openWorkflowTask = ""; // NONE - //NOT a Param

var feeSched = ""; //NOT a Param
var feeList = "";			// //NOT a Param
var feePeriod = "FINAL";

var sysDate = aa.date.getCurrentDate();
var currentYear = "" + sysDate.getYear();

var fromDate = "4/18/" + currentYear;		// 6/18/current year
var toDate = "6/30/" + currentYear;			// 6/18/current year

var emailAddress = getParam("emailAddress");	// email to send report
var sendEmailNotifications = getParam("sendEmailNotifications");// send out emails?
var mSubjChoice = getParam("emailSubjectStdChoice");		// Message subject resource from "Batch_Job_Messages" Std Choice
var mMesgChoice = getParam("emailContentStdChoice");		// Message content resource from "Batch_Job_Messages" Std Choice
/*----------------------------------------------------------------------------------------------------/
| END: BATCH JOB PARAMETERS
/------------------------------------------------------------------------------------------------------*/

//Global variables
var startDate = new Date();
var timeExpired = false;
var emailText = "";
var startTime = startDate.getTime();			// Start timer
var sysDate = aa.date.getCurrentDate();
var batchJobID = aa.batchJob.getJobID().getOutput();
var systemUserObj = aa.person.getUser("ADMIN").getOutput();
var capId;
var capIDshow; //alt ID
var AInfo = new Array(); 
var appTypeArray = new Array();
var wfObjArray = new Array();
var feeSeqList = new Array(); // for invoicing
var paymentPeriodList = new Array(); // for invoicing

var mSubjEnConstant = null;
var mMesgEnConstant = null;
var mSubjArConstant = null;
var mMesgArConstant = null;
var mSubjEn = "Baltimore County Pet License About to Expire";
var mSubjAr = "";
var mMesgEn = "It is time to renew your Baltimore County animal license. Renewing online is easier, faster and more convenient than paper-based renewals. When your online application is approved, you can print your annual Animal License Certificate that serves as proof that your pets permanent metal license tag is valid. Go to www.BaltimoreCountyMD.gov/AnimalLicense to renew your animal license.<br/><br/>This is a system generated email. DO NOT REPLY.";
var mMesgAr = "";

if (mSubjChoice) mSubjEnConstant = lookup("Batch Job Messages",mSubjChoice +" English");
if (mMesgChoice) mMesgEnConstant = lookup("Batch Job Messages",mMesgChoice +" English");
if (mSubjChoice) mSubjArConstant = lookup("Batch Job Messages",mSubjChoice +" Arabic");
if (mMesgChoice) mMesgArConstant = lookup("Batch Job Messages",mMesgChoice +" Arabic");

var currentUserID = "ADMIN";  //aa.env.getValue("CurrentUserID");   		// Current User
var useAppSpecificGroupName = false;

var appType = isNull(appGroup,"*")+"/"+isNull(appTypeType,"*")+"/"+isNull(appSubtype,"*")+"/"+isNull(appCategory,"*");
if (!fromDate.length) // no "from" date, assume today + number of days to look ahead
	fromDate = dateAdd(null,parseInt(lookAheadDays));
if (!toDate.length)  // no "to" date, assume today + number of look ahead days + span
	toDate = dateAdd(null,parseInt(lookAheadDays)+parseInt(daySpan));
	
//Validate workflow parameters
var paramsOK = true;
var taskArray = editWorkflowTask.split(",");
var statusArray = editWorkflowStatus.split(",");
//var flowArray = workflowFlowCode.split(",");  removed from below: && taskArray.length==flowArray.length
if ( !(taskArray.length==statusArray.length ) )
	{
	logMessage("ERROR","ERROR: Script cannot run. The number of values in editWorkflowTask, editWorkflowStatus must match.");
	paramsOK = false;
	}
/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
if (paramsOK)
	{
	logMessage("START","Start of Job");

	var licStat = licenseStatus.split(",");
	for (icount in licStat)
		if (!timeExpired) expireLicenses(licStat[icount]);
	
	logMessage("END","End of Job: Elapsed Time : " + elapsed() + " Seconds");
	}

if (emailAddress.length) aa.sendMail("accelainfo@baltimorecountymd.gov", emailAddress, "", batchJobName + " Results", emailText);
		
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/

//This isn't actually expiring licenses, but setting the Expiration Status to Renewal for Baltimore County, MD
function expireLicenses(licStat)
{
	var licenseCount = 0; //Licenses found to process
	var capCount = 0;
	var ignoreCount = 0;
	
	var expResult = aa.expiration.getLicensesByDate(licStat,fromDate,toDate);	//TODO: Verify that this pulls the Licenses expiring in the current year if from/to date are both 6/18/current year
	
	if (expResult.getSuccess())			//gg 07102013 determines if expResults is empty or not?
	{
		myExp = expResult.getOutput();
	}
	else
	{ 
		logMessage("ERROR","ERROR: Getting Expirations, reason is: " + expResult.getErrorType() + ":" + expResult.getErrorMessage()); 
		return false;
	}

	logMessage("INFO", "Found " + myExp.length + " Licenses with status " + licStat + "."); //gg 07132013 prints out number of license
	
	licenseCount = myExp.length;  
	for (zzz in myExp)  // for each b1expiration (effectively, each license app)
	{
		if (elapsed() > maxSeconds) // only continue if time hasn't expired
		{ 
			logMessage("WARNING","A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
			timeExpired = true ;
			break; 
		}
		
		//Default boolean to add historic info ASIT record (will set to false if Service Animal Type = "Police"
		var bAddHistoricASIT = true;
		
		// get license details
		capId = myExp[zzz].getCapID();	
		// This doesn't work: capIDshow = capId.getCustomID().  Must use workaround, START:
		var capId1 = capId.getID1();	 //DNU dont understand what's going on here gg 07102013
		var capId2 = capId.getID2();		
		var capId3 = capId.getID3();			
		var capIdObject = getCapId(capId1,capId2,capId3); // call internal function
		capIDshow = capIdObject.getCustomID(); // this method works
		// workaround END
		var cap = aa.cap.getCap(capId).getOutput();		
		var appTypeResult = cap.getCapType();		
		var appTypeString = appTypeResult.toString();	
		appTypeArray = appTypeString.split("/");	

		var appSubType = appTypeArray[2];
		
		//This checks the App Type.  At this point we have all licenses of specific status.
		//appType should be License/Animal/*/*
		if (appType.length && !appMatch(appType)) 		// Skip this license if app type doesn't match
		{	
			logDebug("Ignored the License " + capIDshow + " because of Record Type.");
			ignoreCount++;
			continue;
		}
			
		//TEMPORARY for Testing Only
		 //if( capIDshow.substr(0,5) != "ANPET" && capIDshow.substr(0,5) != "ANFAC" )
			//continue;
		
	
	  	logDebug("Performing Expiration Actions for Cap " + capIDshow);
		capCount++;

		// Get associative array of appspecifc, taskspecific info for CAP
		if (asiFieldsUsed)
			{
			AInfo = AppSpecific(capId);
			//Logging ASI adds significant time to the processing of a single license
			//for (ai in AInfo)
				//logDebug("ASI field "+ai+" = "+AInfo[ai]);
			}

		//change Expiration Status to newRenewalStatus
		if (newRenewalStatus.length)
		{
			myExp[zzz].setExpStatus(newRenewalStatus);
			aa.expiration.editB1Expiration(myExp[zzz].getB1Expiration());


		}
		
		//change Application Status to newAppStatus
		
		if (newAppStatus.length)
			updateAppStatus(newAppStatus,"Updated by Batch Job: " + batchJobName);
		
// Send SMS and E-mail to Pet Owner

		if (mSubjEnConstant) 	{ mSubjEn = replaceMessageTokens(mSubjEnConstant); }
		if (mMesgEnConstant) 	{ mMesgEn = replaceMessageTokens(mMesgEnConstant); }
		if (mSubjArConstant) 	{ mSubjAr = replaceMessageTokens(mSubjArConstant); }
		if (mMesgArConstant) 	{ mMesgAr = replaceMessageTokens(mMesgArConstant); }

		conArray = getContactArray(capId)
		for (thisCon in conArray)
		{
			b3Contact = conArray[thisCon]
			if (b3Contact["contactType"] == "Pet Owner")
			{
				
				conEmail = b3Contact["email"];
				//
				// Eventually we need to get a language preference from the user profile
				//
								
				if (conEmail && sendEmailNotifications.substring(0,1).toUpperCase().equals("Y")) aa.sendMail("noreplybaltco@baltimorecountymd.gov", conEmail, "", mSubjEn + " " + capIDshow + " " + mSubjAr,mMesgEn + " " +  mMesgAr);
			}

		}
		
		//Update workflow task(s)
		if (editWorkflowTask.length)
		{
			var wfCode = "";
			
			if(appSubType=="Pet")
			{ 
				wfCode = "LICPET";
			}
			else if(appSubType=="Facilities")
			{
				wfCode = "LICFACILITY";
			}
				
			logDebug("Workflow Code is: " + wfCode);	
				
			if (editWorkflowStatus.length && wfCode != "") //then update statuses
			{
				logDebug("Attempt to update workflow status.");
				
				updateTask("License Issuance", "Renewal", "Updated by Batch Job: "+batchJobName, "Updated by Batch Job: "+batchJobName, capId);
				
				//for (ss in statusArray)
					//taskEditStatus(taskArray[ss],statusArray[ss],"Updated by Batch Job: "+batchJobName,"Updated by Batch Job: "+batchJobName,wfCode,null);
			}
		}
		
			
		//
		//Add and invoice Fees
		//
		
		//Logic for adding fee based on License SubType of "Pet" or "Facilities"

		//**************************** FEES ELIMINATED ************************************************************
		//			GG 7/17/13 taken out as fees are not used.
		//*********************************************************************************************************

		/*if (appSubType == "Pet")
		{
			var feeSched = "LICPET";
			
			//Create an array of Contacts on the License
			contactArr = getContactArray();  

			seniorCitizenAttr = ""; //values are "Yes" or "No" in contact attribute drop-down list

			//Find the Pet Owner contact
			for (thisContact in contactArr)  
			{
				if(contactArr[thisContact]["contactType"]=="Pet Owner")				{
					seniorCitizenAttr = contactArr[thisContact]["SENIOR CITIZEN"];
					logDebug("Found Senior Citizen value for Primary Pet Owner. Value: " + seniorCitizenAttr);
					break;
				}
			}
			
			logDebug("Service Animal or Police Dog ASI field: " + AInfo["Service Animal or Police Dog"]);
			logDebug("Altered ASI field: " + AInfo["Altered"]);
			logDebug("Senior Citizen ASI field: " + seniorCitizenAttr);
			var asiService = isNull(AInfo["Service Animal or Police Dog"], "No");  //Yes/No radio button
			var asiAltered = isNull(AInfo["Altered"], "No");	//This is Yes/No radio button
			var asiSenior = isNull(seniorCitizenAttr, "No");	//This is Yes/No drop-down contact attribute on Primary "Pet Owner" contact
									
			logDebug("Service Animal or Police Dog ASI field (after convert if null): " + asiService);
			logDebug("Altered ASI field (after convert if null): " + asiAltered);
			logDebug("Senior Citizen ASI field (after convert if null): " + asiSenior);
			
			if(asiService == "No") //If No or null i.e. not a service animal
			{
				logDebug("Not a Service Animal, attempt to Assess Fees.");
			
				if(asiAltered == "No" && asiSenior == "Yes")
				{
					var feObj = addFee("LP400",feeSched,feePeriod,1,autoInvoiceFees);
				}
				else if(asiAltered == "Yes" && asiSenior == "Yes")
				{
					var feObj = addFee("LP300",feeSched,feePeriod,1,autoInvoiceFees);
				}
				else if(asiAltered == "Yes" && asiSenior == "No")
				{
					var feObj = addFee("LP100",feeSched,feePeriod,1,autoInvoiceFees);
				}
				else if(asiAltered == "No" && asiSenior == "No")
				{
					var feObj = addFee("LP200",feeSched,feePeriod,1,autoInvoiceFees);
				}
				
			}
			else //This is a Service Animal
			{
				//If this is a "Police" "Service Animal Type" ASI, then we don't want to add a Historic Information Record
				var asiServiceType = AInfo["Service Animal Type"];
				
				if(asiServiceType == "Police")
					bAddHistoricASIT = false;
				
				logDebug("No Fees Invoiced.  This is a Service Animal.");
			}
			//Else, there are no fees because it's a Service Animal or Police Dog
				

				
		}
		else if(appSubType =="Facilities")
		{
			var asiFacilityType = AInfo["Type of Facility"];
			var feeSched = "LICFACILITY";
			
			if(asiFacilityType == "Commercial Kennel/Cattery")
			{
				var feObj = addFee("LF100",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Fancier Kennel/Cattery")
			{
				var feObj = addFee("LF200",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Grooming Parlor")
			{
				var feObj = addFee("LF300",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Non-Profit Holding Facility")
			{
				var feObj = addFee("LF400",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Pet Shop")
			{
				var feObj = addFee("LF500",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Riding/Boarding Stable")
			{
				var feObj = addFee("LF600",feeSched,feePeriod,1,autoInvoiceFees);
			}
			else if(asiFacilityType == "Wild Animal Permit")
			{
				var feObj = addFee("LF700",feeSched,feePeriod,1,autoInvoiceFees);
			}
								
		}
		*/
		
	        //**************************** FEES ELIMINATED ************************************************************
		//			END OF FEE ELIMINATION comment out 7/17/13 GG
		//*********************************************************************************************************

		if (feeSeqList.length)  // invoice added fees
		{
			var invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
			if (invoiceResult.getSuccess())
				logDebug("Invoicing assessed fee items is successful.");
			else
				logMessage("ERROR","ERROR: Invoicing the fee items was not successful.  Reason: " +  invoiceResult.getErrorMessage());
		}

	
		//Add HISTORIC INFORMATION ASI Table Record for Pet Licenses
		if (appSubType == "Pet"  && bAddHistoricASIT)
		{
			var asiHistoricLicNbr = isNull(AInfo["License No"], "");
			var asiBillingLocation = isNull(AInfo["Billing Location"], "");
			
			logDebug("Adding HISTORIC INFORMATION ASIT Record.");
			logDebug("Historic License Number: " + asiHistoricLicNbr);
			logDebug("Historic Billing Location: " + asiBillingLocation);
			
			var newRow = new Array(); 
			newRow["Historic Pet License Number"] = "" + asiHistoricLicNbr;
			newRow["Historic Billing Location"]= "" + asiBillingLocation;
			newRow["Date Expired"]= "06/30/" + currentYear;
			addToASITable("HISTORIC INFORMATION", newRow);
			
			editAppSpecific("License No","");
			editAppSpecific("Billing Location","");
		}
	
	}		
	
	logMessage("INFO","Processed " + capCount + " Licenses of Status " + licStat + " out of " + licenseCount + " found.  # of Licenses ignored due to Record Type: " + ignoreCount);
	
 }
	

/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/

function appMatch(ats) 
	{
	var isMatch = true;
	var ata = ats.split("/");
	if (ata.length != 4)
		logDebug("ERROR in appMatch.  The following Application Type String is incorrectly formatted: " + ats + br);
	else
		{
		for (xx in ata)
			{
			if (!ata[xx].equals(appTypeArray[xx]) && !ata[xx].equals("*"))
				{
				isMatch = false;
				break;
				}
			}
		}
	return isMatch;
	}	

function licenseObject(licnumber)
	{
	// available statuses (from various R1_SERVER_CONSTANT values
	var licenseStatus = new Array("Active","","About To Expire","Delinquent","Expired","Invalid","Pending");
	
	this.refProf = null;		// licenseScriptModel (reference licensed professional)
	this.b1Exp = null;		// b1Expiration record (renewal status on application)
	this.licNum = licnumber;	// License Number

	// Load the reference License Professional if we're linking the two
	if (licnumber) // we're linking
		{
		refLicenseResult = aa.licenseScript.getRefLicensesProfByLicNbr(servProvCode,this.licNum)
		if (refLicenseResult.getSuccess())
			{
			refArray = refLicenseResult.getOutput()
			if (refArray)
				for (xxx in refArray)
					{
					this.refProf = refArray[xxx];
					logDebug("Loaded reference license professional");
					}
			}
		else
			{ 
			logMessage("ERROR","ERROR: Getting Licensed Professional Record.  Reason is: " + refLicenseResult.getErrorType() + ":" + gisObjResult.getErrorMessage());
			return false; 
			}
		}	
   		
   	// Load the renewal info (B1 Expiration)
   	// The only way to pull up a renewal is to supply a status.  I don't understand since it has a 1 to 1 relationship with b1permit, but oh well.
   	// the silly thing returns a blank record, so have to check the B1expirationModel to see if it's valid
   	
   	for (myStatus in licenseStatus)
   		{
   		b1ExpResult = aa.expiration.getLicensesByCapID(capId,licenseStatus[myStatus]);
   		if (b1ExpResult.getSuccess())
   			{
   			this.b1Exp = b1ExpResult.getOutput();
   			exptest = this.b1Exp.getB1Expiration();
   			if (exptest) {logDebug("Found renewal record of status : " + licenseStatus[myStatus]) ; break}
			}
		else
			{ logMessage("ERROR","ERROR: Getting B1Expiration Object for Cap.  Reason is: " + b1ExpResult.getErrorType() + ":" + gisObjResult.getErrorMessage()) ; return false }
		}

   	
   	this.setExpiration = function(expDate)
   		// Update expiration date
   		{
   		var expAADate = aa.date.parseDate(expDate);
  		
   		if (this.refProf) {
   			this.refProf.setLicenseExpirationDate(expAADate);
   			aa.licenseScript.editRefLicenseProf(this.refProf);
   			logDebug("Updated reference license expiration to " + expDate); }
   			
   		if (this.b1Exp)  {
 				this.b1Exp.setExpDate(expAADate);
				aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration());
				logDebug("Updated renewal to " + expDate); } 			
   		}
   	
	this.setIssued = function(expDate)
		// Update Issued date
		{
		var expAADate = aa.date.parseDate(expDate);
		
		if (this.refProf) {
			this.refProf.setLicenseIssueDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			logDebug("Updated reference license issued to " + expDate);      }
			
		}	
	this.setLastRenewal = function(expDate)
		// Update expiration date
		{
		var expAADate = aa.date.parseDate(expDate)

		if (this.refProf) {
			this.refProf.setLicenseLastRenewalDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			logDebug("Updated reference license issued to " + expDate); }
		}
		
	this.setStatus = function(licStat)
		// Update expiration status
		{
		if (this.b1Exp)  {
			this.b1Exp.setExpStatus(licStat);
			aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration()); 
			logDebug("Updated renewal to status " + licStat);}  			
		}
		
	this.getStatus = function()
		// Get Expiration Status
		{
		if (this.b1Exp) {
			return this.b1Exp.getExpStatus();
			}
		}
	}

function updateAppStatus(stat,cmt)
	{
	updateStatusResult = aa.cap.updateAppStatus(capId,"APPLICATION",stat, sysDate, cmt ,systemUserObj);
	if (updateStatusResult.getSuccess())
		logDebug("Updated application status to " + stat + " successfully.");
	else
		logMessage("ERROR","ERROR: application status update to " + stat + " was unsuccessful.  The reason is "  + updateStatusResult.getErrorType() + ":" + updateStatusResult.getErrorMessage());
	}
	
function updateTask(wfstr,wfstat,wfcomment,wfnote) 
	{

	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ message+="ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br; return false; }
	
	if (!wfstat) wfstat = "NA";
	
	for (i in wfObj)
		{
   		fTask = wfObj[i];
 		if (wfstr.equals(fTask.getTaskDescription()))
			{
			dispositionDate = aa.date.getCurrentDate();
			stepnumber = fTask.getStepNumber();
			// try status U here for disp flag?
			aa.workflow.handleDisposition(capId,stepnumber,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"U");
			logDebug("Updating Workflow Task: " + wfstr + " with status " + wfstat);
			}			
		}
	}
	
function activateTask(wfstr) 	//Batch version of this function
	{
	for (i in wfObjArray)
		{
   	if ( wfstr.equals(wfObjArray[i].getTaskDescription()) )
			{
			aa.workflow.adjustTask(capId, wfObjArray[i].getStepNumber(), "Y", "N", null, null);
			logDebug("Activating Workflow Task: " + wfstr);
			}			
		}
	}
	
	
/*function addAllFees(fsched,fperiod,fqty,finvoice) // Adds all fees for a given fee schedule
	{
	var arrFees = aa.finance.getFeeItemList(null,fsched,null).getOutput();
	for (xx in arrFees)
		{
		var feeCod = arrFees[xx].getFeeCod();
		assessFeeResult = aa.finance.createFeeItem(capId,fsched,feeCod,fperiod,fqty);
		if (assessFeeResult.getSuccess())
			{
			feeSeq = assessFeeResult.getOutput();
			
			logDebug("Added Fee " + feeCod + ", Qty " + fqty);
			if (finvoice == "Y")
			{
				feeSeqList.push(feeSeq);
				paymentPeriodList.push(fperiod);
				}
			}
		else
			{
			logMessage("ERROR","ERROR: assessing fee (" + feeCod + "): " + assessFeeResult.getErrorMessage());
			}
		} // for xx
	} // function
	
function addFee(fcode,fsched,fperiod,fqty,finvoice) // Adds a single fee, returns the fee descriptitem
	{
	assessFeeResult = aa.finance.createFeeItem(capId,fsched,fcode,fperiod,fqty);
	if (assessFeeResult.getSuccess())
		{
		feeSeq = assessFeeResult.getOutput();
		logDebug("Added Fee " + fcode + ", Qty " + fqty);
		if (finvoice == "Y")
			{
			feeSeqList.push(feeSeq);
			paymentPeriodList.push(fperiod);
			}
		return aa.finance.getFeeItemByPK(capId, feeSeq).getOutput()
           
		}
	else
		{
		logMessage("ERROR","ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		return null
		}
	}
	
function updateFee(fcode,fsched,fperiod,fqty,finvoice) // Updates a fee with a new Qty.  If it doesn't exist, adds it
	{
	feeUpdated = false;
	getFeeResult = aa.finance.getFeeItemByFeeCode(capId,fcode,fperiod);
	if (getFeeResult.getSuccess())
		{	
		feeListA = getFeeResult.getOutput();
		for (feeNum in feeListA)
			if (feeListA[feeNum].getFeeitemStatus().equals("NEW") && !feeUpdated)  // update this fee item
				{
				feeSeq = feeListA[feeNum].getFeeSeqNbr();
				editResult = aa.finance.editFeeItemUnit(capId, fqty, feeSeq);
				feeUpdated = true;
				if (editResult.getSuccess())
					{
					debug+="Updated Qty on Existing Fee Item: " + fcode + " to Qty: " + fqty;
					//aa.finance.calculateFees(capId);
					if (finvoice == "Y")
						{
						feeSeqList.push(feeSeq);
						paymentPeriodList.push(fperiod);
						}
					}
				else
					{ debug+= "ERROR: updating qty on fee item (" + fcode + "): " + editResult.getErrorMessage() + br; break }
				}
		}		
	else
		{ debug+= "ERROR: getting fee items (" + fcode + "): " + getFeeResult.getErrorMessage() + br}
	
	if (!feeUpdated) // no existing fee, so update
		addFee(fcode,fsched,fperiod,fqty,finvoice);
	}
	
*/
function elapsed() {
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	return ((thisTime - startTime) / 1000) 
}	

function logMessage(etype,edesc) 
	{
	aa.eventLog.createEventLog(etype, "Batch Process", batchJobName, sysDate, sysDate,"", edesc,batchJobID);
	aa.print(etype + " : " + edesc);
	emailText+=etype + " : " + edesc + "\n";
	}

function logDebug(edesc) {
	if (showDebug) {
		aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, sysDate, sysDate,"", edesc,batchJobID);
		aa.print("DEBUG : " + edesc);
		emailText+="DEBUG : " + edesc + "\n"; }
	}
	
function AppSpecific() {
	// 
	// Returns an associative array of App Specific Info
	//
  	appArray = new Array();
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(capId);
	if (appSpecInfoResult.getSuccess())
	 	{
		var fAppSpecInfoObj = appSpecInfoResult.getOutput();

		for (loopk in fAppSpecInfoObj)
			appArray[fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
		}
	return appArray;
}

function dateAdd(td,amt)   
// perform date arithmetic on a string 
// td can be "mm/dd/yyyy" (or any string that will convert to JS date)
// amt can be positive or negative (5, -3) days 
// if optional parameter #3 is present, use working days only
	{
	
	useWorking = false;
	if (arguments.length == 3) 
		useWorking = true;
	
	if (!td) 
		dDate = new Date();
	else
		dDate = new Date(td);
	i = 0;
	if (useWorking)
		while (i < Math.abs(amt)) 
			{
			dDate.setTime(dDate.getTime() + (1000 * 60 * 60 * 24 * (amt > 0 ? 1 : -1)));
			if (dDate.getDay() > 0 && dDate.getDay() < 6)
				i++
			}
	else
		dDate.setTime(dDate.getTime() + (1000 * 60 * 60 * 24 * amt));

	return (dDate.getMonth()+1) + "/" + dDate.getDate() + "/" + dDate.getFullYear();
	}
	
function getCapId(pid1,pid2,pid3)  {

    var s_capResult = aa.cap.getCapID(pid1, pid2, pid3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      logMessage("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());
      return null;
    }
  }	

function getParam(pParamName) //gets parameter value and logs message showing param value
	{
	var ret = "" + aa.env.getValue(pParamName);	
	logMessage("PARAMETER", pParamName+" = "+ret);
	return ret;
	}
	
function isNull(pTestValue,pNewValue)
	{
	if (pTestValue==null || pTestValue=="")
		return pNewValue;
	else
		return pTestValue;
	}
	
function taskEditStatus(wfstr,wfstat,wfcomment,wfnote,pFlow,pProcess) //Batch version of function
	{
	//--- 9/01/2011 - This doesn't appear to work anymore
	
	//Needs isNull function
	//pProcess not coded yet
	//
	pFlow = isNull(pFlow,"U"); //If no flow control specified, flow is "U" (Unchanged)
	var dispositionDate = aa.date.getCurrentDate();
	
	for (i in wfObjArray)
		{
 		if ( wfstr.equals(wfObjArray[i].getTaskDescription()) )
			{
			var stepnumber = wfObjArray[i].getStepNumber();
			aa.workflow.handleDisposition(capId,stepnumber,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj,pFlow);
			logDebug("Updating Workflow Task: " + wfstr + " with status " + wfstat);
			}			
		}
	}

	function updateTask(wfstr,wfstat,wfcomment,wfnote,itemCap) // optional process name, and statusDate (ScriptDateTime type)
{
	//Batch Script version 1.0 
	//10/21/2009
	
	var useProcess = false;
	var processName = "";
	var dispositionDate = aa.date.getCurrentDate();
	if (arguments.length > 5 && arguments[5] != ""  && arguments[5] != null)
	{
		processName = arguments[5]; // subprocess
		useProcess = true;
	}

	if (arguments.length > 6) 
	{
		dispositionDate = arguments[6]; // statusDate
	}

	var workflowResult = aa.workflow.getTasks(itemCap);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else
	{ 
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); 
		return false; 
	}
            
	if (!wfstat) wfstat = "NA";
            
	for (i in wfObj)
	{
		var fTask = wfObj[i];
		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
		{
			var stepnumber = fTask.getStepNumber();
			var processID = fTask.getProcessID();
			
			if (useProcess)
				aa.workflow.handleDisposition(itemCap,stepnumber,processID,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj,"U");
			else
				aa.workflow.handleDisposition(itemCap,stepnumber,wfstat,dispositionDate,wfnote,wfcomment,systemUserObj,"U");
			logDebug("Updating Workflow Task '" + wfstr + "' with status '" + wfstat + "' on CAP: " + itemCap.getCustomID());
		}                                   
	}
}
//------END function updateTask()----------------------------------------------------------------------/	

function addToASITable(tableName,tableValues) // optional capId
  	{
	//  tableName is the name of the ASI table
	//  tableValues is an associative array of values.  All elements must be either a string or asiTableVal object
  	itemCap = capId
	if (arguments.length > 2)
		itemCap = arguments[2]; // use cap ID specified in args

	var tssmResult = aa.appSpecificTableScript.getAppSpecificTableModel(itemCap,tableName)

	if (!tssmResult.getSuccess())
		{ logDebug("**WARNING: error retrieving app specific table " + tableName + " " + tssmResult.getErrorMessage()) ; return false }

	var tssm = tssmResult.getOutput();
	var tsm = tssm.getAppSpecificTableModel();
	var fld = tsm.getTableField();
	var col = tsm.getColumns();
	var fld_readonly = tsm.getReadonlyField(); //get ReadOnly property
	var coli = col.iterator();

	while (coli.hasNext())
		{
		colname = coli.next();

		if (typeof(tableValues[colname.getColumnName()]) == "object")  // we are passed an asiTablVal Obj
			{
			fld.add(tableValues[colname.getColumnName()].fieldValue);
			fld_readonly.add(tableValues[colname.getColumnName()].readOnly);
			}
		else // we are passed a string
			{
			fld.add(tableValues[colname.getColumnName()]);
			fld_readonly.add(null);
			}
		}

	tsm.setTableField(fld);
	tsm.setReadonlyField(fld_readonly); // set readonly field

	addResult = aa.appSpecificTableScript.editAppSpecificTableInfos(tsm, itemCap, currentUserID);
	if (!addResult .getSuccess())
		{ logDebug("**WARNING: error adding record to ASI Table:  " + tableName + " " + addResult.getErrorMessage()) ; return false }
	else
		logDebug("Successfully added record to ASI Table: " + tableName);
	}
	
function editAppSpecific(itemName,itemValue)  // optional: itemCap
{
	var updated = false;
	var i=0;
	
	itemCap = capId;
	
	if (arguments.length == 3) itemCap = arguments[2]; // use cap ID specified in args
   	
  	if (useAppSpecificGroupName)
	{
		if (itemName.indexOf(".") < 0)
			{ logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true") ; return false }
		
		var itemGroup = itemName.substr(0,itemName.indexOf("."));
		var itemName = itemName.substr(itemName.indexOf(".")+1);
	}
   	
   	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
	if (appSpecInfoResult.getSuccess())
 	{
		var appspecObj = appSpecInfoResult.getOutput();
		if (itemName != "")
		{
			while (i < appspecObj.length && !updated)
			{
				if (appspecObj[i].getCheckboxDesc() == itemName && (!useAppSpecificGroupName || appspecObj[i].getCheckboxType() == itemGroup))
				{
					appspecObj[i].setChecklistComment(itemValue);
						
					var actionResult = aa.appSpecificInfo.editAppSpecInfos(appspecObj);
					if (actionResult.getSuccess()) 
					{							
						logDebug("app spec info item " + itemName + " has been given a value of " + itemValue);
					} 
					else 
					{
						logDebug("**ERROR: Setting the app spec info item " + itemName + " to " + itemValue + " .\nReason is: " +   actionResult.getErrorType() + ":" + actionResult.getErrorMessage());
					}
						
					updated = true;
					AInfo[itemName] = itemValue;  // Update array used by this script
				}
				
				i++;
				
			} // while loop
		} // item name blank
	} // got app specific object	
	else
	{ 
		logDebug( "**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage());
	}
}//End Function
function getContactArray()
	{
	// Returns an array of associative arrays with contact attributes.  Attributes are UPPER CASE
	// optional capid
	var thisCap = capId;
	if (arguments.length == 1) thisCap = arguments[0];

	var cArray = new Array();

	var capContactResult = aa.people.getCapContactByCapID(thisCap);
	if (capContactResult.getSuccess())
		{
		var capContactArray = capContactResult.getOutput();
		for (yy in capContactArray)
			{
			var aArray = new Array();
			aArray["lastName"] = capContactArray[yy].getPeople().lastName;
			aArray["firstName"] = capContactArray[yy].getPeople().firstName;
			aArray["businessName"] = capContactArray[yy].getPeople().businessName;
			aArray["contactSeqNumber"] =capContactArray[yy].getPeople().contactSeqNumber;
			aArray["contactType"] =capContactArray[yy].getPeople().contactType;
			aArray["relation"] = capContactArray[yy].getPeople().relation;
			aArray["phone1"] = capContactArray[yy].getPeople().phone1;
			aArray["phone2"] = capContactArray[yy].getPeople().phone2;
			aArray["phone2countrycode"] = capContactArray[yy].getCapContactModel().getPeople().getPhone2CountryCode();
			aArray["email"] = capContactArray[yy].getCapContactModel().getPeople().getEmail();


			var pa = capContactArray[yy].getCapContactModel().getPeople().getAttributes().toArray();
	                for (xx1 in pa)
                   		aArray[pa[xx1].attributeName] = pa[xx1].attributeValue;
			cArray.push(aArray);
			}
		}
	return cArray;
	}