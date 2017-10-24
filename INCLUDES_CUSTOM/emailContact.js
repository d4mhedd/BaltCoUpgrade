function emailContact(mSubj,mText)   // FA 12-7-2010 This method sends email to all the contacts, if they provided email
{
	var emailAddress = "";
	
         
	var capContactResult = aa.people.getCapContactByCapID(capId);
	if (capContactResult.getSuccess())
		{
		var Contacts = capContactResult.getOutput();
		for (yy in Contacts){
		    if(Contacts[yy].getCapContactModel().getPeople().getContactType()=="Application Contact"){
		        emailAddress = Contacts[yy].getEmail();
		        //logDebug("emailAddress==" + emailAddress);
		        SendEmail(emailAddress, mSubj, mText);
		    }
        }
    }
}
