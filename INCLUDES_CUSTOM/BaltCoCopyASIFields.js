function BaltCoCopyASIFields(parentId, cSubType)
{
	//Get the Parent ASI Data
	var ParentASI = new Array();
	loadAppSpecific(ParentASI, parentId);

	var pcap = aa.cap.getCap(parentId).getOutput();	// Cap object
	var pcapTypeResult = pcap.getCapType();
	var pcapType = pcapTypeResult.toString(); 			// Convert application type to string ("Building/A/B/C")
	var parentAppTypeArray = pcapType.split("/");		// Array of application type string
	var pSubType = parentAppTypeArray[2];
	
	logDebug("pSubType is " + pSubType);
	logDebug("cSubType is " + cSubType);
	
	//pSubType = Parent Sub Type
	//cSubType = Child Sub Type
	
	//IF THIS then copy ANIMAL INFORMATION
	if( (pSubType == 'Complaints' && cSubType == 'Impoundment') || 
		(pSubType == 'Complaints' && cSubType == 'Pet' && matches(AInfo["Type"], 'Cat', 'Dog')) ||
		(pSubType == 'Complaints' && cSubType == 'Services' && matches(AInfo["Type"], 'Cat', 'Dog')) ||
		(pSubType == 'Impoundment' && cSubType == 'Pet' && matches(AInfo["Type"], 'Cat', 'Dog') ) || 
		(pSubType == 'Impoundment' && cSubType == 'Services' && matches(AInfo["Type"], 'Cat', 'Dog') ) || 
		(pSubType == 'Impoundment' && cSubType == 'Complaints') ||
		(pSubType == 'Services' && cSubType == 'Pet' ) || 
		(pSubType == 'Services' && cSubType == 'Complaints' ) || 
		(pSubType == 'Services' && cSubType == 'Impoundment') ||
		(pSubType == 'Pet' && matches(cSubType, 'Services', 'Impoundment', 'Complaints') )
		)
	{
		// subgroup ANIMAL INFORMATION
		logDebug("In logic to copy ANIMAL INFORMATION ASI");
	
		editAppSpecific("Animal Name", ParentASI["Animal Name"]);		
		
		editAppSpecific("Type", ParentASI["Type"]);
		
		editAppSpecific("Sex", ParentASI["Sex"]);
		
		editAppSpecific("Primary Breed", ParentASI["Primary Breed"]);
		
		editAppSpecific("Secondary Breed", ParentASI["Secondary Breed"]);
		
		editAppSpecific("Primary Color", ParentASI["Primary Color"]);
		
		editAppSpecific("Secondary Color", ParentASI["Secondary Color"]);
		
		editAppSpecific("Tertiary Color", ParentASI["Tertiary Color"]);
		
		editAppSpecific("Rabies Tag No", ParentASI["Rabies Tag No"]);
		
		editAppSpecific("License No", ParentASI["License No"]);
		
		editAppSpecific("Altered", ParentASI["Altered"]);
		
		
		//Spec #1 (and others.  Where there is no restriction for copying this ASI sub groups fields)
		if((pSubType == 'Complaints' && cSubType == 'Impoundment') || 
			(pSubType == 'Impoundment' && cSubType == 'Complaints') ||
			(pSubType == 'Services' && cSubType == 'Pet') ||
			(pSubType == 'Services' && cSubType == 'Complaints') ||
			(pSubType == 'Services' && cSubType == 'Impoundment') ||
			(pSubType == 'Pet' && matches(cSubType, 'Services', 'Impoundment', 'Complaints') ))
		{
			editAppSpecific("Altered", ParentASI["Species Other"]);
		}
			
	}
   
    //Spec #6 - COMPMARKING ASI
	if(pSubType == 'Impoundment' && cSubType == 'Complaints')
	{
		logDebug("In logic to copy COMPMARKING ASI");
	
		editAppSpecific("Face Marking - Star", ParentASI["Face Marking - Star"]);

		editAppSpecific("Face Marking - Snip", ParentASI["Face Marking - Snip"]);
		
		editAppSpecific("Face Mark - Stripe", ParentASI["Face Mark - Stripe"]);
		
		editAppSpecific("Face Marking - Bald Face", ParentASI["Face Marking - Bald Face"]);
		
		editAppSpecific("Face Marking - Blazing", ParentASI["Face Marking - Blazing"]);
				
		editAppSpecific("Leg Markings - Left Front", ParentASI["Leg Markings - Left Front"]);

		editAppSpecific("Leg Markings - Right Front", ParentASI["Leg Markings - Right Front"]);

		editAppSpecific("Leg Markings - Left Hind", ParentASI["Leg Markings - Left Hind"]);

		editAppSpecific("Leg Markings - Right Hind", ParentASI["Leg Markings - Right Hind"]);		

	}
   	
	//Spec #1 - Copy COMPINFORM/COMPLAINT INFORMATION -> COMPIMPOUND/IMPOUNDMENT INFORMATION ASI
	if(pSubType == 'Complaints' && cSubType == 'Impoundment')
	{
		//Age, Age Unit, Size fields only
		editAppSpecific("Age", ParentASI["Age"]);

		editAppSpecific("Size", ParentASI["Size"]);		
		
	}
	
	//Spec #3 - Copy COMPINFORM/COMPLAINT INFORMATION -> COMPSERVICE/ANIMAL SERVICE INFORMATION ASI
	// TODO - Spec says "with required manipulation", not sure what that means.
	if(pSubType == 'Complaints' && cSubType == 'Services')
	{
		//Age, Age Unit, Size fields only
		editAppSpecific("Age", ParentASI["Age"]);
		editAppSpecific("Age Unit", ParentASI["Age Unit"]);		
		editAppSpecific("Size", ParentASI["Size"]);		
	}
	
	//Spec #5 - Copy COMPIMPOUND/IMPOUNDMENT INFORMATION -> COMPSERVICE/ANIMAL SERVICE INFORMATION ASI
	if(pSubType == 'Impoundment' && cSubType == 'Services')
	{
		//Age, Age Unit, Size fields only
		editAppSpecific("Age", ParentASI["Age"]);
		editAppSpecific("Size", ParentASI["Size"]);	
	}
	
	
	//Spec #2 a. ii. Copy Veterinarian Name COMPINFORM/HISTORY INFORMATION -> LICPET/ADDITIONAL INFORMATION
	if(pSubType == 'Complaints' && cSubType == 'Pet')
	{
		editAppSpecific("Vet Name", ParentASI["Veterinarian Name"]);	
	}	
	
	//Spec #11 Copy Veterinarian Name LICPET/ADDITIONAL INFORMATION -> COMPINFORM/HISTORY INFORMATION
	if(pSubType == 'Pet' && cSubType == 'Complaints')
	{
		editAppSpecific("Veterinarian Name", ParentASI["Vet Name"]);	
	}	
	
	//Spec #6 COMPIMPOUND/IMPOUNDMENT INFORMATION -> COMPINFORM/COMPLAINT INFORMATION
	if(pSubType == 'Impoundment' && cSubType == 'Complaints')
	{
		//Age, Age Unit, Size fields only
		editAppSpecific("Age", ParentASI["Age"]);
		editAppSpecific("Age Unit", ParentASI["Age Unit"]);
		editAppSpecific("Size", ParentASI["Size"]);
	}
	
	//Spec #8 COMPSERVICE/ANIMAL SERVICE INFORMATION ASI -> COMPINFORM/COMPLAINT INFORMATION
	if(pSubType == 'Services' && cSubType == 'Complaints' )
	{
		editAppSpecific("Size", ParentASI["Size"]);
	}
	
	//Spec #9 COMPSERVICE/ANIMAL SERVICE INFORMATION ASI -> COMPIMPOUND/IMPOUNDMENT INFORMATION
	if(pSubType == 'Services' && cSubType == 'Impoundment')
	{
		editAppSpecific("Size", ParentASI["Size"]);
	}

}