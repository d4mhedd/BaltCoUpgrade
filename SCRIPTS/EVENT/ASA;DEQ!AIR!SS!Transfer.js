//ASA;DEQ!AIR!SS!Transfer
updateAppStatus("Technical Review","Automatic");
closeTask("Application Submittal","Submitted","Application successfully submitted","Closed via script");
editTaskDueDate("Technical Review",dateAdd(null,10));
