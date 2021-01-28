//ASIUA;Planning!Zoning Use!NA!NA
zoningAPO = loadASITable("ZONING (APO)");
if (typeof(zoningAPO) == "object") {
	var zoneInfo = "";
	for(x in zoningAPO) zoneInfo = zoningAPO[x]["Zone 1"] + "," + zoningAPO[x]["Zone 2"]+ "," + zoningAPO[x]["Zone 3"] + "," + zoningAPO[x]["Zone 4"];
	zoneInfo = zoneInfo.replace(/,,/g,",");
	zoneInfo = zoneInfo.replace(/,,/g,",");
	var zoneLen = zoneInfo.length;
	if(zoneInfo.charAt( zoneLen- 1)==",") zoneInfo=zoneInfo.substr(0, (zoneLen - 1));
	editAppSpecific("zoning", zoneInfo);
	}