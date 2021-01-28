//ASB;Planning!Rezoning!NA!NA
loadASITablesBefore();
if (typeof(ZONINGINFORMATION) == "undefined") {
	showMessage=true;
	cancel = true;
	comment("Zoning Information table must have at least one row.");
	}