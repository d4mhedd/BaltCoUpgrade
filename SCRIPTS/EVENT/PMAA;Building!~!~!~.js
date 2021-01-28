//PMAA;Building!~!~!~
if (!appMatch("Building/Model/NA/NA") && feeBalance("DS0105") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0105", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}
