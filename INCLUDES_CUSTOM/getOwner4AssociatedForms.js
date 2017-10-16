//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
//will return the first owner on the record
function getOwner4AssociatedForms(pCapId){
	try{
		capOwnerArr = null;
		var s_result = aa.owner.getOwnerByCapId(pCapId, null);
		if (s_result.getSuccess()) {
			capOwnerArr = s_result.getOutput();
		} else {
			logDebug("**ERROR: Unable to retrieve owners from cap.");
			return false;
		}
		
		if (capOwnerArr != null && capOwnerArr.length > 0) {
			return capOwnerArr[0];
		} else {
			return null;
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function getOwner4AssociatedForms: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end