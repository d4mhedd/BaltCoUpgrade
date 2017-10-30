//custom function
//jec 171020 conversion begin
function runReportPrint(reportToPrint, reportCapIdModel) {
	try {
		var certReportModelResult = null;
		var certReportModelObj = null;
		var certURI = null;

		certReportModelResult = aa.reportManager.getReportModelByName(reportToPrint);
		if (certReportModelResult && certReportModelResult.getSuccess())
			certReportModelObj = certReportModelResult.getOutput();
		else
			logDebug("Report: " + reportToPrint + " failed to execute - " + certReportModelResult.getErrorMessage());

		//runReportAttach(pCapId, "Animal License Certificate", "ALTID", capIDString);
		var certRptParamHashMap = aa.util.newHashMap();
		certRptParamHashMap.put("ALTID", String(reportCapIdModel.getCustomID()));

		if (certReportModelObj)
			certURI = aa.reportManager.runReport(certRptParamHashMap, certReportModelObj);

		if (certURI && certURI.getSuccess()) {
			showMessage = true;
			aa.env.setValue("ScriptReturnCode", "0");
			aa.env.setValue("ScriptReturnMessage", certURI.getOutput());
		} else {
			showMessage = true;
			comment("<font color=red><b> Report: " + reportToPrint + "failed to generate.  Please notify administrator of the error.</b></font>");
		}
	} catch (err) {
		logDebug("A JavaScript Error occured in custom function runReportPrint: " + err.message + " In Line " + err.lineNumber);
	}
}