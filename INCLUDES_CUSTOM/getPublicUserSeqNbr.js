function getPublicUserSeqNbr(pUserName) {
	var result = aa.publicUser.getPublicUserByPUser(pUserName);
	if (result.getSuccess()) {
     		publicUserModel = result.getOutput();
		return publicUserModel.getUserSeqNum();
	}
	else 
		return 0;
}
