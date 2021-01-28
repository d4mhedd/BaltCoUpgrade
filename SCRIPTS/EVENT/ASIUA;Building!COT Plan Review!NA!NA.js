//ASIUA;Building!COT Plan Review!NA!NA
cotASIT = loadASITable("PLAN REVIEW");
if (typeof(cotASIT) == "object") {
	comment("Loaded ASIT");
	sum = 0;
	for(x in cotASIT) sum += Number(cotASIT[x]["Amount Due"]);
	comment(sum);
	editAppSpecific("totalDue", sum.toFixed(2));
	}

cotASIT = loadASITable("Site_Review");
COTMODULE.computeTotalSiteHoursAndCalculateFee(capId);
