//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function updateMaterialAmendment() {
	try{
		//Get the source cap
		var pFromCapID = capId;
		var pToCapId = getParent(pFromCapID);

		//aa.cap.getCapID(aa.env.getValue("sToCap")); //getParent();
		logDebug("pFromCapID=" + pFromCapID + "----pToCapId=" + pToCapId);

		// loadAppSpecific info
		loadAppSpecific(AInfo, pFromCapID);

		//get the project name and use the same name for child
		var ProjectName = cap.getSpecialText(); //capName

		//set project name
		editAppName(ProjectName, pToCapId);

		// Copy Contacts
		deleteCopyContacts(pFromCapID, pToCapId);

		//Copy Address
		deleteCopyAddresses(pFromCapID, pToCapId);

		//added by pk on 8/22/2012 for parcel and attributes
		//copyOwner(pFromCapID, pToCapId);


		var currentCom = workDescGet(pFromCapID);

		//aa.print("comments from detail description------" +currentCom );1
		updateWorkDesc(currentCom, pToCapId);

		//copy App Specific info
		copyAppSpecific(pToCapId);

		//Copy ASI Tables
		copyASITablesToParent(pFromCapID, pToCapId);

		//copy Address,parcel, and owner info
		updateAssociatedFormRecord(pToCapId, pFromCapID, addressModel, parcelModel, ownerModel);

		//copy parcel
		// copyParcels(pFromCapID, pToCapId);
		//copyParcel(pFromCapID, pToCapId);

		//copy professionals
		//createLicenseProfessionsForChildRecord(pFromCapID,pToCapId);
		//copyLicenseProfessional(pFromCapID,pToCapId);

		//Remove all professional info
		removeLicensedProf(pToCapId);

		//Copy professional info
		copyLicensedProf(pFromCapID, pToCapId);
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function updateMaterialAmendment: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end