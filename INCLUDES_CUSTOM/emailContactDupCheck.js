//custom function
//jec 171025 conversion begin
//found in ADDRESSDUPLICATEFORACA
function emailContactDupCheck(mSubj, mText) // optional: Contact Type, default Applicant
{
	try {
		var replyTo = "noreply@baltimorecountymd.gov";
		var contactType = "Applicant"
			var emailAddress = "";

		if (arguments.length == 3)
			contactType = arguments[2]; // use contact type specified

		var capContactResult = aa.people.getCapContactByCapID(capId);
		if (capContactResult.getSuccess()) {
			var Contacts = capContactResult.getOutput();
			for (yy in Contacts)
				if (contactType.equals(Contacts[yy].getCapContactModel().getPeople().getContactType()))
					if (Contacts[yy].getEmail() != null)
						emailAddress = "" + Contacts[yy].getEmail();
		}

		if (emailAddress.indexOf("@") > 0) {
			aa.sendMail(replyTo, emailAddress, "", mSubj, mText);
			logDebug("Successfully sent email to " + contactType);
		} else
			logDebug("Couldn't send email to " + contactType + ", no valid email address");
	} catch (err) {
		logDebug("A JavaScript Error occured in custom function emailContactDupCheck: " + err.message + " In Line " + err.lineNumber);
	}
}
//jec 171025 conversion end
