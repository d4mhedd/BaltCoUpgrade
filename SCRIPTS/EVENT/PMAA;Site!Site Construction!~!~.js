//PMAA;Site!Site Construction!~!~
if (feeBalance("DS0093") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0093", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}
