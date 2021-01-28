//ASA;Planning!Minor Land Division Permit!NA!NA
closeTask("Application Intake","Submitted","Auto-Submit","");
var mldAck = false;
var condExists = false;
if (typeof(LOTINFORMATION)=="object") {
	for (row in LOTINFORMATION) if (LOTINFORMATION[row]["MLD Acknowledgement Requested"]=="Yes") mldAck=true;
	}

if (mldAck) {
	var condArray = getConditions("General","Applied","MLD In Process",null);
	for (cond in condArray) if (condArray[cond].objType=="Parcel") condExists=true;
	}

if (mldAck && !condExists) {
	addParcelCondition(null,"General", "Applied", "MLD Notice", "Added via script", "Notice");
	}

MINOR_LAND_DIVISION_FUNCTIONS.updateAppName();
FEE_UTILS_MODULE.invoiceAllFees();
MINOR_LAND_DIVISION_FUNCTIONS.sendInvoice();