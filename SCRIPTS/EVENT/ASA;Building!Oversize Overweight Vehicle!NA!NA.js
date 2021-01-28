//ASA;Building!Oversize Overweight Vehicle!NA!NA
setTask("Application Intake","N","Y");
setTask("Admin Review","Y","N");
updateAppStatus("Submitted","auto-submit");
OVERSIZEMODULE.computeWeightFee(capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0010", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0020", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0040", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0050", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0060", capId);
CONDITIONSMODULE.addStdConditionWithTemplate("Associated Conditions", "WL0090", capId);