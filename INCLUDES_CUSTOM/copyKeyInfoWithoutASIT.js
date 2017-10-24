function copyKeyInfoWithoutASIT(srcCapId, targetCapId)
{
	//copy ASI infomation
	copyAppSpecificInfo(srcCapId, targetCapId);
        //copy License infomation
	//copyLicenseProfessional(srcCapId, targetCapId);
	//copy Address infomation
	copyAddress(srcCapId, targetCapId);
	//copy AST infomation
	//copyAppSpecificTable(srcCapId, targetCapId);
	//copy Parcel infomation
	copyParcel(srcCapId, targetCapId);
	//copy People infomation
	copyPeople(srcCapId, targetCapId);
        //copy Owner infomation
        copyOwner(srcCapId, targetCapId);
	
}