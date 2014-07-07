function IsValid(fullname,dob,Email,UserPhone,Address)
{
	if(fullname.length == 0){ alert("Please enter FullName"); return 0;}
	if(dob.length == 0){alert("Please enter DOB"); return 0;}
	if(Email.length == 0){ alert("Please enter Email"); return 0;}
	else {
		if (!validateEmail(Email)) {alert("Please enter valid Email"); return 0;}
	}
	if(UserPhone.length == 0){ alert("Please enter userPhone"); return 0;}
	else {
		if (!	validatePhone(UserPhone)) {alert("Please enter valid Phone number"); return 0;}
	}
	if(Address.length == 0){ alert("Please enter address"); return 0;}
	return 1;
}

function validateEmail(sEmail) {

	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	if (filter.test(sEmail)) {

		return true;

	}

	else {

		return false;

	}

}

function validatePhone(txtPhone) {



	var filter = /^[0-9-+]+$/;

	if (filter.test(txtPhone)) {

		return true;

	}

	else {

		return false;

	}

}

function isValidSearch(source,dest){
	if(source.length == 0){ alert("Please enter Source"); return 0;}
	if(dest.length == 0){ alert("Please enter Destination"); return 0;}
	return 1;
}

function isExistsBookingId(BookingId){
	if(BookingId.length == 0){ alert("Please enter BookingId"); return 0;}
	return 1;
}	

function isValidUser(name, pwd){
if(name.length == 0){ alert("Please enter User Name"); return 0;}
	if(pwd.length == 0){ alert("Please enter Password"); return 0;}
	return 1;
}