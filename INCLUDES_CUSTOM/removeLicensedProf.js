//custom function
//jec 171016 conversion begin
//formerly within UPDATEORIGFROMAMEND
function removeLicensedProf(sCapId) {
	try{
		//Function will copy all licensed professionals from source CapID to target CapID
		var isPrimary = false;

		var capLicenseArr = aa.licenseProfessional.getLicensedProfessionalsByCapID(sCapId).getOutput();
		if (capLicenseArr != null)
			for (x in capLicenseArr) {

				var thisLP = capLicenseArr[x];
				//if (thisLP.getLicenseType() == rlpType && thisLP.getLicenseNbr() == licNum)
				//	{
				logDebug("Removing license: " + thisLP.getLicenseNbr() + " from CAP.  We will link the new reference LP");

				if (thisLP.getPrintFlag() == "Y") {
					logDebug("...remove primary status...");
					isPrimary = true;
					thisLP.setPrintFlag("N");
					aa.licenseProfessional.editLicensedProfessional(thisLP);
				}

				var remCapResult = aa.licenseProfessional.removeLicensedProfessional(thisLP);
				/*
				if (capLicenseResult.getSuccess()){
				logDebug("...Success."); }
				else{ logDebug("**WARNING removing lic prof: " + remCapResult.getErrorMessage()); }
				}

				 */
				/*
				var remCapResult = aa.licenseProfessional.removeLicensedProfessional(licProf[x]);
				if (capLicenseResult.getSuccess())
			{
				logDebug("...Success."); }
				else
			{ logDebug("**WARNING removing lic prof: " + remCapResult.getErrorMessage()); }
				}
				 */
				//licProf[x].setCapID(tCapId);
				//aa.licenseProfessional.createLicensedProfessional(licProf[x]);
				//logDebug("Copied " + licProf[x].getLicenseNbr());
			}
		else
			logDebug("No licensed professional on source");
		
	}catch (err){
		logDebug("A JavaScript Error occured in custom function removeLicensedProf: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171016 conversion end