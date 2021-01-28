//PMAA;Site!Development Concept Permit!NA!NA
if (feeBalance("DS0091") == 0 && feeExists("DS0091", "INVOICED") && UTILITYMODULE.isAdhocTaskActive("Renewal")) {
	DEV_ACCELA_ENG_1.completeRenewal();
	}
