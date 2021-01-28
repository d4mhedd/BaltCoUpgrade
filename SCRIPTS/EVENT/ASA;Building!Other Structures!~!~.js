//ASA;Building!Other Structures!~!~
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}

var asit = loadASITable("PROXIMITY ALERT (APO)", capId);
var row = asit[0];
var hdz = row["HDZ"];
editAppSpecific("hdz", hdz);