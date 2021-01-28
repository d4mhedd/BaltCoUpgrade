//ASA;Building!Site Work!~!~
if (aa.parcel.getParcelByCapId(capId,null).getOutput().size() > 0) {
	if (proximityToAttribute("PIMA", "Sewer Network", 200, "feet", "STATUS", "EXISTING_PIPE") ) addStdCondition("Proximity Alert", "Proximity to sewer line", capId);
	}