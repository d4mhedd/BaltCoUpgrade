//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
//will return the first parcel on the record
function getParcel4AssociatedForms(pCapId){
	try{
		capParcelArr = null;
		var s_result = aa.parcel.getParcelandAttribute(pCapId, null);
		if (s_result.getSuccess()) {
			capParcelArr = s_result.getOutput();
		} else {
			logDebug("**ERROR: Unable to retrieve parcels from cap.");
			return false;
		}
		
		if (capParcelArr != null && capParcelArr.size() > 0) {
			return capParcelArr.get(0);
		} else {
			return null;
		}
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function getParcel4AssociatedForms: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end