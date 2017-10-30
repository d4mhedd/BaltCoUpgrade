//DLH 171012 conversion begin

if (AInfo["Send Information to Toolbar"] == "CHECKED") {
	//aa.runScriptInNewTransaction("CZMPWEBSERVICE");
	aa.runScript("CZMPWEBSERVICE");   //@TODO: Not tested during 9.x regression testing, only required every 4 years. 10.30.17-JEC
}
	
//DLH 171012 conversion end