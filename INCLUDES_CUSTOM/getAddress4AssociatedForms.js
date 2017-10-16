//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
//will return the first address on the record
function getAddress4AssociatedForms(pCapId){
	try{
		capAddresses = null;
		var s_result = aa.address.getAddressByCapId(pCapId);
		if (s_result.getSuccess()) {
			capAddresses = s_result.getOutput();
		} else {
			logDebug("**ERROR: Unable to retrieve addresses from cap.");
			return false;
		}
		
		if (capAddresses != null && capAddresses.length > 0) {
			return capAddresses[0];
		} else {
			return null;
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function getAddress4AssociatedForms: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end