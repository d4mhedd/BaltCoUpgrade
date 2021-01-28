//ASIUB;Site!Addressing!NA!NA
loadASITablesBefore();
var parcelArray = new Array();
var shouldCancel = false;
if (typeof(PARCELSTREETNAMECHANGES) == "object" && PARCELSTREETNAMECHANGES.length > 0) {
	for (var cnt=0;
	cnt<PARCELSTREETNAMECHANGES.length;
	cnt++) parcelArray.push(String(PARCELSTREETNAMECHANGES[cnt]["Parcel Number"]));
	}

if (parcelArray.length > 0) {
	if (!APO_FUNCTIONS.parcelsExistInSystem(parcelArray)) shouldCancel = true;
	}

if (shouldCancel) {
	showMessage=true;
	comment("<font color='red'>Table PARCEL STREET NAME CHANGES contains invalid parcels.</font>");
	cancel=true;
	}
