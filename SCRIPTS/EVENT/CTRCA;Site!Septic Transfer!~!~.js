//CTRCA;Site!Septic Transfer!~!~
addFee("DE0015","SEPTIC TRANSFER","FINAL", 1 ,"Y");
closeTask("Application Intake","Submitted", "Auto-submit", "Closed via script" );
aa.sendMail("permitsystem2@pima.gov", "buildingsafetyadmin@pima.gov", "", "New Septic Transfer record", "Septic Transfer record " + capId.getCustomID() + " has been created");
