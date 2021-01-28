//ASA;Building!Buildings!NA!NA
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var starValleyActive = asit[0]["Star Valley TRA"];
if (starValleyActive == "Y" && matches(AInfo['subTypeASI'], "Commercial Building New", "Multi-Family Residence New Building", "Single Family Residence New")) {
	addStdCondition("Proximity Alert", "Star Valley TRA");
	}

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var row = asit[0];
var hdz = row["HDZ"];
editAppSpecific("hdz", hdz);
