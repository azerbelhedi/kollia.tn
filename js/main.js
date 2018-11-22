console.log("on");
var renderState = "main";

function deleteDisplay(){
	document.getElementsByClassName('main')[0].style.display = "none" ;
	document.getElementsByClassName('log-block')[0].style.display = "none" ;
	//displayLog();
	//displayMain();	
}

function displayMain(){
	document.getElementsByClassName('main')[0].style.display = "block" ;
}

function displayLog(){
	document.getElementsByClassName('log-block')[0].style.display = "block" ;
}

function switchLog(){
	deleteDisplay();
	if(renderState == "main"){
		displayLog();
		renderState = "log";
		document.getElementsByClassName("log")[0].innerHTML = "back to home";
	}
	else if (renderState == "log"){
		displayMain();
		renderState = "main";
		document.getElementsByClassName("log")[0].innerHTML = "log in";
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
	// other data
	document.getElementById("login-form").reset();	
	// firebase create-account
	alert("email : "+email + "\n pass : "+name);
	// firebase log in 
	switchLog();
}



document.getElementById("login-form").addEventListener('submit',function(e){
	login(e);
});

document.getElementById("signup-form").addEventListener('submit',function(e){
	createAccount(e);
});
