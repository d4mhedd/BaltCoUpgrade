function runReportAttachBaltCo(aaReportName, aaReportParamName, aaReportParamValue) {
	var bReport = false;

	var reportName = aaReportName;

	report = aa.reportManager.getReportModelByName(reportName);

	report = report.getOutput();

	var permit = aa.reportManager.hasPermission(reportName, currentUserID);
	if (permit.getOutput().booleanValue()) {
		var parameters = aa.util.newHashMap();
		parameters.put(aaReportParamName, aaReportParamValue);
		//report.setReportParameters(parameters);
		var msg = aa.reportManager.runReport(parameters, report); //.getOutput();
		return msg;
	}
}
