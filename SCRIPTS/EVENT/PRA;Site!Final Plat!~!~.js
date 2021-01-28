//PRA;Site!Final Plat!~!~
if (feeBalance("DS0092") == 0 && UTILITYMODULE.isAdhocTaskActive("Renewal") && feeExists("DS0092", "INVOICED")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}

