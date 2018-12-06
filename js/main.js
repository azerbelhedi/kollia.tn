console.log("hey") ;
var loginButton = "log in" ;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6DClDypVl6AqFWcg2c7MUu8O56JQLaOo",
    authDomain: "flybaby-00.firebaseapp.com",
    databaseURL: "https://flybaby-00.firebaseio.com",
    projectId: "flybaby-00",
    storageBucket: "flybaby-00.appspot.com",
    messagingSenderId: "614291697698"
};
firebase.initializeApp(config);

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
		if(loginButton == "logo in"){
			displayLog();
			renderState = "log";
			document.getElementsByClassName("fixed-login")[0].innerHTML = "back to home";
		}
		else if(loginButton == "logo out"){
			logout() ;
		}
	}
	else if (renderState == "log"){
		displayMain();
		renderState = "main";
		document.getElementsByClassName("fixed-login")[0].innerHTML = loginButton;
	}
}

function login(e){
	e.preventDefault();
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email , password).catch(function(error){
		alert(error) ;
	})
	document.getElementById("login-form").reset();	
	//alert("email : "+email + "\n pass : "+password);
	// firebase log in 
	//switchLog();
}

function createAccount(e){
	e.preventDefault();
	let email = document.getElementById("email2").value;
	let name = document.getElementById("name").value;
	let phone = document.getElementById("phone").value ;
	let uni = document.getElementById("uni").value ;
	let school = document.getElementById('school').value ;
	let pass = document.getElementById("pass1").value ;
	let confirmPass = document.getElementById("pass2").value ;
	let data = {
		email : email , 
		name : name ,
		phone  : phone ,
		uni  : uni ,
		school : school , 
		pass : pass ,
		confirmPass : confirmPass
	}
	document.getElementById("email2").value = "";
	document.getElementById("name").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("uni").value = "";
	document.getElementById('school').value = "";
	document.getElementById("pass1").value = "";
	document.getElementById("pass2").value = "";
	console.log(data);
	// other data
	document.getElementById("login-form").reset();	
	// firebase create-account
	if(pass != confirmPass){alert("invalid password !") ;}
	else{
		firebase.auth().createUserWithEmailAndPassword(email , pass).then(function(data){
			//alert("great !" + user);
			console.log(data.user) ;
			console.log("logggg : + " + data.user.uid) ;
			let database = firebase.database() ;
			let ref = database.ref('usersList') ;
			var myData = {name : name } ;
			ref.push(myData) ;

			ref = database.ref('users/' + data.user.uid + '/notification') ;
			ref.push(0) ;

			ref = database.ref('users/' + data.user.uid + '/following') ;
			ref.push(["azerbelhedi"]) ;

			ref = database.ref('users/' + data.user.uid + '/followers') ;
			ref.push(["azerbelhedi"]) ;
			
			ref = database.ref('users/' + data.user.uid + '/files') ;
			ref.push([{fileName : "fileName" , fileLink :"fileLink" , fileViews : 0}]) ;

			// phone uni school job
			ref = database.ref('users/' + data.user.uid + '/name') ;
			ref.push(name) ;

			ref = database.ref('users/' + data.user.uid + '/phone') ;
			ref.push(phone) ;
			
			ref = database.ref('users/' + data.user.uid + '/uni') ;
			ref.push(uni) ;

			ref = database.ref('users/' + data.user.uid + '/school') ;
			ref.push(school) ;

			ref = database.ref('users/' + data.user.uid + '/job') ;
			ref.push('student/prof') ;
			

		}).catch(function(error){
			alert("error while signing up ! : " + error.message) ;
		});	
	}

	//alert("email : "+email + "\n pass : "+name);
	// firebase log in 
	//switchLog();
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

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		loginButton = "logo out" ;
		switchLog() ;
		document.querySelector(".popup").style.display = "block" ;
		
		//console.log(user) ;
		//console.log(user.uid) ;
		/////
		let database = firebase.database() ;
		let ref = database.ref('users/6KPhhLeHkwX0JYh66MEuk17Aljn1/name') ;

		function errData(error){
			console.log("error : " + error) ;
		}

		function gotData(data){
			console.log("data log :: " + data.val()) ;
		}

		ref.on('value' , gotData , errData) ;

		// load profile ;
	}
	else{
		loginButton = "logo in" ;
		document.querySelector(".popup").style.display = "none" ;
	}
	document.getElementsByClassName("fixed-login")[0].innerHTML = loginButton;
	//switchLog();
});

function logout(){
    firebase.auth().signOut().then(function(){
		// mrigel 
		//switchLog();
		console.log("outttt") ;
    } , function(error){
        alert(error) ;
    });
}