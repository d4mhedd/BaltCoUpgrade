function createRefContactsFromCapContactsAndLinkEmail(pCapId, ignoreArray, replaceCapContact, overwriteRefContact, refContactExists) {
	// ignoreArray is a list of attributes to ignore when creating a REF contact
	// replaceCapContact and overwriteRefContact are not implemented yet
	// refContactExists is a function for REF contact comparisons.
	//
	var ignoreArray = new Array();
	if (arguments.length > 1) ignoreArray = arguments[1];

	var c = aa.people.getCapContactByCapID(pCapId).getOutput();
	var cCopy = aa.people.getCapContactByCapID(pCapId).getOutput();  // must have two working datasets

	for (var i in c) {
		var con = c[i];
	   	if (!con.getCapContactModel().getRefContactNumber()) {  // user entered data
			var p = con.getPeople();
			var ccmSeq = p.getContactSeqNumber();
			var cType = p.getContactType();
			if (cType == "Application Contact") {
				// Call the custom function to see if the REF contact exists
				existingContact = refContactExists(p);
				// refresh the people since we had to mangle it for the search
				p = cCopy[i].getPeople();  // get a fresh version, had to mangle the first for the search

				// check to see if we are linking to existing or creating
				if (existingContact) {
					refPeopleId = existingContact;
				}
				else {
					var a = p.getAttributes();
					if (a) {
						// Clear unwanted attributes
						var ai = a.iterator();
						while (ai.hasNext()) {
							var xx = ai.next();
							if (exists(xx.getAttributeName().toUpperCase(),ignoreArray))
								ai.remove();
						}
					}


					r = aa.people.createPeopleWithAttribute(p,a);
					if (!r.getSuccess()) {logDebug("WARNING: couldn't create reference people : " + r.getErrorMessage()); continue; }

					// createPeople is nice and updates the sequence number to the ref seq
					var p = cCopy[i].getPeople();
					var refPeopleId = p.getContactSeqNumber();

					logDebug("Successfully created reference contact #" + refPeopleId);
				}

				//
				// now that we have the reference Id, we can link back to reference
				//
	
			    	var ccm = aa.people.getCapContactByPK(pCapId,ccmSeq).getOutput().getCapContactModel();
	
			    	ccm.setRefContactNumber(refPeopleId);
			   	r = aa.people.editCapContact(ccm);
	
			    	if (r.getSuccess()) { 
					logDebug("Successfully linked ref contact " + refPeopleId + " to cap contact " + ccmSeq);
					if (overwriteRefContact) updateRefContact(refPeopleId, ccm.getPeople());
					return refPeopleId;
				}
				else { 
					logDebug("WARNING: error updating cap contact model : " + r.getErrorMessage()); 
				}

			}

		}
	}

}
