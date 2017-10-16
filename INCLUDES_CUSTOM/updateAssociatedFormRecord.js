//custom function
//jec 171016 conversion begin
//formerly UPDATEORIGFROMAMEND
function updateAssociatedFormRecord(recordIDs, parentIDModel, addressModel, parcelModel, ownerModel) {
	try{
		/*
		if (recordIDs != null && recordIDs.size() > 0){
		for (var i = 0; i < recordIDs.size(); i++){
		 */
		var capIDModel = recordIDs;
		if (capIDModel == null) {
			//continue;
		}

		aa.print("Update Record's APO : " + capIDModel.toKey());
		/*
		if (addressModel != null) {
		var oldAddresses = aa.address.getAddressByCapId(capIDModel, null).getOutput();
		if (oldAddresses != null && oldAddresses.length > 0 && oldAddresses[0] != null){
		addressModel.setCapID(capIDModel);
		addressModel.setAddressId(oldAddresses[0].getAddressId());
		aa.address.editAddressWithAPOAttribute(capIDModel, addressModel);
		}
		else{
		var aResult = aa.address.createAddressWithAPOAttribute(capIDModel,
		addressModel).getOutput();
		}
		}
		 */

		if (parcelModel != null) {
			aa.print("Parcel Not null");

			var capParcelModel = aa.parcel.getCapParcelModel().getOutput();
			parcelModel.setCapID(capIDModel);
			capParcelModel.setParcelModel(parcelModel);
			capParcelModel.setParcelNo(parcelModel.getParcelNumber());
			capParcelModel.setCapIDModel(capIDModel);
			aa.print("parcelModel.getParcelNumber():" + parcelModel.getParcelNumber());

			var oldParcels = aa.parcel.getParcelDailyByCapID(capIDModel, null).getOutput();
			if (oldParcels != null && oldParcels.length > 0 && oldParcels[0] != null) {
				capParcelModel.setParcelNo(oldParcels[0].getParcelNumber());
				aa.parcel.updateDailyParcelWithAPOAttribute(capParcelModel);
				aa.print("oldParcels[0].getParcelNumber():" + oldParcels[0].getParcelNumber());

			} else {
				aa.print("Parcel2");
				aa.parcel.createCapParcelWithAPOAttribute(capParcelModel).getOutput();
			}
		}

		if (ownerModel != null) {
			ownerModel.setCapID(capIDModel);
			var childOwners = aa.owner.getOwnerByCapId(capIDModel).getOutput();
			if (childOwners != null && childOwners.length > 0 && childOwners[0] != null) {
				ownerModel.setCapOwnerNumber(childOwners[0].getCapOwnerNumber());
				aa.owner.updateDailyOwnerWithAPOAttribute(ownerModel);
				logDebug("ownerModel 1");
			} else {
				aa.owner.createCapOwnerWithAPOAttribute(ownerModel);
				logDebug("ownerModel 2");
			}
		}

		/*
		}
		}
		 */
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function updateAssociatedFormRecord: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end