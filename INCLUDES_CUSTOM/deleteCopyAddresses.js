//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function deleteCopyAddresses(pFromCapId, pToCapId) {
	try {

		//Copies all property addresses from pFromCapId to pToCapId
		// modified original function to delete all of the addresses

		var vToCapId = pToCapId;

		//check if target CAP has primary address
		var capAddressResult = aa.address.getAddressByCapId(vToCapId);
		if (capAddressResult.getSuccess()) {
			Address = capAddressResult.getOutput();
			for (yy in Address) {
				addrOnTarget = Address[yy];
				delResult = aa.address.removeAddress(vToCapId, addrOnTarget.getAddressId());
				if (!delResult.getSuccess()) {
					logDebug("Error removing address on target CAP " + delResult.getErrorMessage());
				}
			}
		} else {
			logMessage("**ERROR: Failed to get addresses: " + capAddressResult.getErrorMessage());
			return false;
		}

		//logDebug("pFromCapId=" + pFromCapId + "pToCapId=" + pToCapId);

		//get addresses from originating CAP
		var capAddressResult = aa.address.getAddressWithAttributeByCapId(pFromCapId);
		var copied = 0;
		if (capAddressResult.getSuccess()) {
			Address = capAddressResult.getOutput();
			for (yy in Address) {
				newAddress = Address[yy];
				newAddress.setCapID(vToCapId);
				aa.address.createAddressWithAPOAttribute(vToCapId, newAddress);
				logDebug("Copied address from " + pFromCapId.getCustomID() + " to " + vToCapId.getCustomID() + " newAddress:" + newAddress);
				copied++;
			}
		} else {
			logMessage("**ERROR: Failed to get addresses: " + capAddressResult.getErrorMessage());
			return false;
		}
		return copied;
}
catch (err) {
	logDebug("A JavaScript Error occured in custom function deleteCopyAddresses: " + err.message + " In Line " + err.lineNumber);
}
}
//jec 171016 conversion end
