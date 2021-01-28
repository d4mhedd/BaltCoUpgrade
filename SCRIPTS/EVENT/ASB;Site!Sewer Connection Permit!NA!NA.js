//ASB;Site!Sewer Connection Permit!NA!NA
if (AInfo['notYetBuiltManhole'] == '' && AInfo['nearestDownstreamPublicSewerManholeIMSNbrxxxx'] == '') {
	showMessage=true;
	comment("<font color='red'>Either Nearest Downstream Sewer Manhole ID(s)  OR  Identify Future Manhole(s) (under construction) must contain a value.</font>");
	cancel=true;
	}

loadASITables();
if (typeof(METERS) != "object" && !publicUser) {
	showMessage=true;
	comment("<b><font color=RED>Please ensure the METERS Table contains at least one row.</font></b>");
	cancel=true;
	}
