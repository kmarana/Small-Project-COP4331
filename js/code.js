const urlBase = 'http://www.4331COP.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

let ID = 0;
let editfirstName = "";
let editlastName = "";
let editphoneNumber = "";
let editemail = "";
let editaddress = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/LoginAPI.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Hello " + firstName + " " + lastName;
	}
}

function readCookie2()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}
}

function saveConCookie()
{
	ID = event.target.parentNode.parentNode.id;
	var rowdata = document.getElementById(ID).querySelectorAll(".rowdata");

	editfirstName = rowdata[0].innerHTML;
	editlastName = rowdata[1].innerHTML;
	editphoneNumber = rowdata[2].innerHTML;
	editemail = rowdata[3].innerHTML;
	editaddress = rowdata[4].innerHTML;

	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "ID=" + ID + ",editfirstName=" + editfirstName + ",editlastName=" + editlastName + ",editphoneNumber=" + editphoneNumber + ",editemail=" + editemail + ",editaddress=" + editaddress +  ";expires=" + date.toGMTString();
}

function readConCookie()
{
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");

		if (tokens[0] == "ID")
		{
			ID = parseInt(tokens[1].trim());
		}
		else if (tokens[0] == "editfirstName")
		{
			editfirstName = tokens[1];
		}
		else if (tokens[0] == "editlastName" )
		{
			editlastName = tokens[1];
		}
		else if (tokens[0] == "editphoneNumber" )
		{
			editphoneNumber = tokens[1];
		}
		else if (tokens[0] == "editemail" )
		{
			editemail = tokens[1];
		}
		else if (tokens[0] == "editaddress" )
		{
			editaddress = tokens[1];
		}

	}
}

function createUser()
{
    firstName = "";
    lastName = "";

    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;
    let login = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;
    document.getElementById("registerResult").innerHTML = "";

    var tmp = {firstName:fName,lastName:lName,login:login,password:password};
//  var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Register.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                document.getElementById("registerResult").innerHTML = "User has been created.";
				backToLogin();
            }
            else
			{
				document.getElementById("registerResult").innerHTML = "Invalid Username or Password.";
			}
        };
        xhr.send(jsonPayload);
    }


    catch (err)
    {
        document.getElementById("registerResult").innerHTML = err.message;
    }
}

function goRegister()
{
	window.location.href = "register.html";
	// let url = urlBase + '/Register.' + extension;
}

function backToLogin()
{
	window.location.href = "index.html";
	// let url = urlBase + '/Index.' + extension;
}

function backToHome()
{
	window.location.href = "color.html";
	// let url = urlBase + '/Index.' + extension;
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function searchContact() {
	let srch = document.getElementById("search").value;
	document.getElementById("searchResults").innerHTML = "";
	document.getElementById("contactList").innerHTML = "";

	let tmp = { search: srch, userId: userId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("searchResults").innerHTML += `<p style="font-size: 20px;"><b>Search Results:</b></p>`;
				let jsonObject = JSON.parse(xhr.responseText);
				//var table = document.getElementById("contactList");
				document.getElementById("contactList").innerHTML +=
					`<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Address</th>
					<th>Edit Contact</th>
					<th>Delete Contact</th>
					</tr>`

				for (let i = 0; i < jsonObject.results.length; i++) {
					document.getElementById("contactList").innerHTML +=
						`
						<tr id = "${jsonObject.results[i].ID}" class="contact">
							<td class ="rowdata">${jsonObject.results[i].FirstName}</td>
							<td class ="rowdata">${jsonObject.results[i].LastName}</td>
							<td class ="rowdata">${jsonObject.results[i].Phone}</td>
							<td class ="rowdata">${jsonObject.results[i].Email}</td>
							<td class ="rowdata">${jsonObject.results[i].Address}</td>
							<td class ="rowdata"><button type="button" id="editButton" class="buttons2" onclick="queryEdit();"> Edit </button></td>
							<td class ="rowdata"><button type="button" id="deleteButton" class="buttons2" onclick="delConfirm();"> Delete </button></td>
						</tr>
						`
						//< td class ="rowdata" > <button type="button" id="editButton" class="buttons2" onclick="saveConCookie(); goEditContact();"> Edit </button></td >
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("searchResults").innerHTML = err.message;
	}
}

function addContact() {
	let frName = document.getElementById("firstName").value;
	let laName = document.getElementById("lastName").value;
	let phone = document.getElementById("phoneNumber").value;
	let email = document.getElementById("email").value;
	let address = document.getElementById("address").value;
	document.getElementById("AddContactsResult").innerHTML = "";

	// Phone number format
	var phoneForm = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	// Contacts won't be added if inputs are invalid format
	if (frName.length > 50 || frName.length == 0) {
		document.getElementById("AddContactsResult").innerHTML = "Invalid first name";
		return;
	}
	else if (laName.length > 50 || laName.length == 0) {
		document.getElementById("AddContactsResult").innerHTML = "Invalid last name";
		return;
	}
	else if (!phone.match(phoneForm)) {
		document.getElementById("AddContactsResult").innerHTML = "Invalid phone number";
		return;
	}
	else if (email.length > 50 || email.length == 0) {
		document.getElementById("AddContactsResult").innerHTML = "Invalid email";
		return;
	}
	else if (address.length > 50) {
		document.getElementById("AddContactsResult").innerHTML = "Invalid address";
		return;
	}

	let tmp = { firstName: frName, lastName: laName, phoneNumber: phone, email: email, address: address, userId: userId };
	// var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/AddContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("AddContactsResult").innerHTML = "Contact has been added";
				saveCookie();
				document.getElementById("firstName").value = "";
				document.getElementById("lastName").value = "";
				document.getElementById("phoneNumber").value = "";
				document.getElementById("email").value = "";
				document.getElementById("address").value = "";
				// backToHome();
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("AddContactsResult").innerHTML = err.message;
	}
}

function editContact()
{
    let frName = document.getElementById("editfirstName").value;
	let laName = document.getElementById("editlastName").value;
	let phone = document.getElementById("editphoneNumber").value;
	let email = document.getElementById("editemail").value;
	let address = document.getElementById("editaddress").value;
	document.getElementById("EditContactResult").innerHTML = "";

	let tmp = { editfirstName: frName, editlastName: laName, editphoneNumber: phone, editemail: email, editaddress: address, ID:ID, userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/EditContacts.' + extension;
	let xhr = new XMLHttpRequest();
	 xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function ()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("EditContactResult").innerHTML = "Contact has been edited.";
				saveCookie();
	 			//backToHome();
			}
		};
	 	xhr.send(jsonPayload);
	}

	catch (err)
	{
		document.getElementById("EditContactResult").innerHTML = err.message;
	}
}

function queryEdit()
{
	ID = event.target.parentNode.parentNode.id;
	var rowdata = document.getElementById(ID).querySelectorAll(".rowdata");

	editfirstName = rowdata[0].innerHTML;
	editlastName = rowdata[1].innerHTML;
	editphoneNumber = rowdata[2].innerHTML;
	editemail = rowdata[3].innerHTML;
	editaddress = rowdata[4].innerHTML;

	$.confirm({
		boxWidth: '30%',
		useBootstrap: false,
		title: 'Edit Contact',
		fontSize: 20 ,
		fontFamily: "verdana,sans-serif",
		content:
			`
			<form action="" class="contactEdit">
			<div class="form-group">
			<input type="text" id="editfirstName" value="${editfirstName}" class="edit form" required />
			<input type="text" id="editlastName" value="${editlastName}" class="edit form" required />
			<input type="text" id="editphoneNumber" value="${editphoneNumber}" class="edit form" required />
			<input type="text" id="editemail" value="${editemail}" class="edit form" required />
			<input type="text" id="editaddress" value="${editaddress}" class="edit form" required />
			</div>
			</form>
			`,
		theme: 'dark',
		buttons:
		{
			formSubmit:
			{
				text: 'Save',
				btnClass: 'button-8',
				action: function () {
					editContact();
				}
			},
			cancel: function () {

			},
		},

	});
}

function delConfirm()
{
	ID = event.target.parentNode.parentNode.id;
	var rowdata = document.getElementById(ID).querySelectorAll(".rowdata");

	deletefirstName = rowdata[0].innerHTML;
	deletelastName = rowdata[1].innerHTML;

	$.confirm(
		{
			boxWidth: '30%',
			useBootstrap: false,
			theme: 'dark',
			title: "Delete " + deletefirstName + " " + deletelastName + " from  contacts?",
			content: '',
			buttons:
			{
				confirm: function () {
					deleteContact();
                },
				cancel: function () {
					//close
				},
			}
		});
}
function deleteContact()
{
	document.getElementById("DeleteContactsResult").innerHTML = "";

	let tmp = { ID: ID, userId: userId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/DeleteContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(ID).remove();
				document.getElementById("DeleteContactsResult").innerHTML = "Contact has been deleted.";
			}
		};
		xhr.send(jsonPayload);
	}

	catch (err) {
		document.getElementById("DeleteContactsResult").innerHTML = err.message;
	}
}

function goAddContact()
{
	window.location.href = "addcontact.html";
	// let url = urlBase + '/Register.' + extension;
}

function goEditContact()
{
	window.location.href = "editcontact.html";
}
