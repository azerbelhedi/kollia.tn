console.log("on");
var renderState = "main";
//deleteDisplay();
//document.getElementsByClassName("upload-block")[0].style.display = "block" ;

function deleteDisplay(){
	document.getElementsByClassName('main')[0].style.display = "none" ;
	document.getElementsByClassName('log-block')[0].style.display = "none" ;
	document.getElementsByClassName("upload-block")[0].style.display = "none" ;
	//displayLog();
	//displayMain();	
}

function displayMain(){
	document.getElementsByClassName('main')[0].style.display = "block" ;
}

function displayLog(){
	document.getElementsByClassName('log-block')[0].style.display = "block" ;
}

function displayUpload(){
	displayLog();
	renderState = "log";
	document.getElementsByClassName("fixed-login")[0].innerHTML = "back to home";
	deleteDisplay();
	document.getElementsByClassName("upload-block")[0].style.display = "block" ;
}


function switchLog(){
	deleteDisplay();
	if(renderState == "main"){
		displayLog();
		renderState = "log";
		document.getElementsByClassName("fixed-login")[0].innerHTML = "back to home";
	}
	else if (renderState == "log"){
		displayMain();
		renderState = "main";
		document.getElementsByClassName("fixed-login")[0].innerHTML = "log in";
	}
}

function login(e){
	e.preventDefault();
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	document.getElementById("login-form").reset();	
	alert("email : "+email + "\n pass : "+password);
	// firebase log in 
	switchLog();
}

function createAccount(e){
	e.preventDefault();
	var email = document.getElementById("email2").value;
	var name = document.getElementById("name").value;
	var phone = document.getElementById("phone").value ;
	var uni = document.getElementById("uni").value ;
	var school = document.getElementById('school').value ;
	var pass = document.getElementById("pass1").value ;
	var confirmPass = document.getElementById("pass2").value ;
	var data = {
		email : email , 
		name : name ,
		phone  : phone ,
		uni  : uni ,
		school : school , 
		pass : pass ,
		confirmPass : confirmPass
	}
	console.log(data);
	// other data
	document.getElementById("login-form").reset();	
	// firebase create-account
	alert("email : "+email + "\n pass : "+name);
	// firebase log in 
	switchLog();
}


function uploadFile(e){
	e.preventDefault();
	alert("upload");
}

document.getElementById("login-form").addEventListener('submit',function(e){
	login(e);
});

document.getElementById("signup-form").addEventListener('submit',function(e){
	createAccount(e);
});


document.getElementById("upload-form").addEventListener('submit',function(e){
	uploadFile(e);
});
