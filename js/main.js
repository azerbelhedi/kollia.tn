console.log("hey") ;
var globalUser ;
var loginButton = "log in" ;
// Initialize Firebase
displayMain() ;
var config = {
    apiKey: "AIzaSyD6DClDypVl6AqFWcg2c7MUu8O56JQLaOo",
    authDomain: "flybaby-00.firebaseapp.com",
    databaseURL: "https://flybaby-00.firebaseio.com",
    projectId: "flybaby-00",
    storageBucket: "flybaby-00.appspot.com",
    messagingSenderId: "614291697698"
};
firebase.initializeApp(config);
var database = firebase.database() ;
 //
 /*
var ref = database.ref('usersList') ;
ref.on('value' , gotData , errData) ;
function gotData(data){
	console.log("here is bug data : " + data) ;
}

function errData(err){
	console.log("zrrorra : " + err ) ;
}
*/
//

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
	let school = document.getElementById('school2').value ;
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
	document.getElementById('school2').value = "";
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
			var ref = database.ref('usersList') ;
			var myData = {name : name } ;
			ref.push(myData) ;

			// new create account method :
			//var ref = database.ref('data') ;
			///ref.push(data) ;
			//
			
			ref = database.ref('users/' + data.user.uid + '/notification') ;
			ref.push({notification : 0}) ;

			ref = database.ref('users/' + data.user.uid + '/following') ;
			ref.push({following : ["azerbelhedi"]}) ;

			ref = database.ref('users/' + data.user.uid + '/followers') ;
			ref.push({followers : ["azerbelhedi"]}) ;
			
			ref = database.ref('users/' + data.user.uid + '/files') ;
			ref.push({files : [{fileName : "fileName" , fileLink :"fileLink" , fileViews : 0}]}) ;

			// phone uni school job
			ref = database.ref('users/' + data.user.uid + '/name') ;
			ref.push({name : name}) ;

			ref = database.ref('users/' + data.user.uid + '/phone') ;
			ref.push({phone : phone}) ;
			
			ref = database.ref('users/' + data.user.uid + '/uni') ;
			ref.push({uni : uni}) ;

			ref = database.ref('users/' + data.user.uid + '/school') ;
			ref.push({school : school}) ;

			var job = document.querySelector("#job").value ;
			ref = database.ref('users/' + data.user.uid + '/job') ;
			ref.push({job : job}) ;
		

		}).catch(function(error){
			alert("error while signing up ! : " + error.message) ;
		});	
	}

	//alert("email : "+email + "\n pass : "+name);
	// firebase log in 
	//switchLog();
}


document.getElementById("login-form").addEventListener('submit',function(e){
	login(e);
});

document.getElementById("signup-form").addEventListener('submit',function(e){
	createAccount(e);
});


document.getElementById("file").addEventListener('change',function(e){
	uploadFile(e);
});

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		document.querySelector("#the-upload-button").style.display = "inline" ;
		loginButton = "logo out" ;
		switchLog() ;
		document.querySelector(".popup").style.display = "block" ;
		
		//console.log(user) ;
		console.log("user uid ; " + user.uid) ;
		/////
		var ref = database.ref('users/'+user.uid+'/name') ;
		var name ;
		function errName(error){
			console.log("error : " + error) ;
		}
		function gotName(data){
			// .val and object keys
			data = data.val() ;
			var keys = Object.keys(data) ;
			console.log("data log :: " + data[keys[0]].name) ;
			name = data[keys[0]].name ;
			document.querySelector("#user-name").innerHTML = name ;
		}
		ref.on('value' , gotName , errName) ;

		//job
		var job ;
		var ref = database.ref('users/' + user.uid + '/job') ;
		function gotJob(data){
			data = data.val() ;
			var keys = Object.keys(data) ;
			job = data[keys[0]].job ;
			document.querySelector("#user-location").innerHTML = job ;
		}
		function errJob(error){
			console.log("error : " + error) ;
		}
		ref.on('value' , gotJob , errJob) ;

		// uni ;
		var uni ;
		var ref = database.ref('users/' + user.uid + '/uni') ;
		function gotUni(data){
			data = data.val() ;
			var keys = Object.keys(data) ;
			uni = data[keys[0]].uni ;
			document.querySelector("#user-location").innerHTML += (" at " + uni) ;
		}	
		function errUni(error){
			console.log(error) ;
		}
		ref.on('value' , gotUni , errUni) ;
		
		//school 
		var school ; 
		var ref = database.ref('users/' + user.uid + '/school') ;
		function gotSchool(data){
			data = data.val() ;
			var keys = Object.keys(data) ;
			school = data[keys[0]].school ;
			document.querySelector("#user-location").innerHTML += ( "/" + school) ;
		}
		function errSchool(err){
			console.log(err) ;
		}
		ref.on('value' , gotSchool , errSchool) ;
		// load profile ;
		globalUser = {
			name : name ,
			uni : uni ,
			school : school ,
			uid : user.uid
		}
		console.log("user is connected succefuly yy : " + globalUser.name) ;
		console.log("user is connected succefuly yy : " + globalUser.uni) ;
		console.log("user is connected succefuly yy : " + globalUser.school) ;
		console.log("user is connected succefuly yy : " + globalUser.uid) ;
	}
	else{
		globalUser = {} ;
		loginButton = "logo in" ;
		document.querySelector("#the-upload-button").style.display = "none" ;
		document.querySelector(".popup").style.display = "none" ;
		// delete data !!
		name = "" ;
		document.querySelector("#user-name").innerHTML = name ; 
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

function loadData(){
	// load unis 
	console.log("bdina") ;
	var ref = database.ref('admin/uni') ;
	function errLoadUnis(error){
		console.log(error) ;
	}
	function loadUnis(data){
		data = data.val() ;
		var keys = Object.keys(data) ;
		var list = document.querySelector("#unis") ;
		keys.map(x => {
			console.log(data[x].uni) ;	
			var option = document.createElement("option") ;
			option.text = data[x].uni ;
			list.add(option , list[0]) ;
		});

		var list = document.querySelector("#uni") ;
		keys.map(x => {
			console.log(data[x].uni) ;	
			var option = document.createElement("option") ;
			option.text = data[x].uni ;
			list.add(option , list[0]) ;
		});

	}
	ref.on('value' , loadUnis , errLoadUnis) ;	
	// laod schools of sousse
	loadSchool() ; // !!!!!!!!!
	// laod subjects
	var ref = database.ref('admin/subject');
	ref.on('value' , gotSub , errSub) ;
	function gotSub(data){
		data = data.val() ;
		var keys = Object.keys(data) ;
		var subjectList = document.querySelector("#subject") ;
		keys.map(x => {
			var option = document.createElement("option") ;
			option.text = data[x].subject ;
			subjectList.add(option , subjectList[0]) ;
		});

		var subjectList2 = document.querySelector("#other-subject") ;
		keys.map(x => {
			var option = document.createElement("option") ;
			option.text = data[x].subject ;
			subjectList2.add(option , subjectList2[0]) ;
		});
	}
	function errSub(error){
		console.log("error : " + error) ;
	}
	// other subject

	// laod jobs 
}

function loadSchool(){
	var uni = "sousse" ;
	uni = document.querySelector("#unis").value ;
	console.log("thas the uni : " + uni) ;
	var ref = database.ref('admin/' + uni) ;
	ref.on('value' , gotSchool , errSchool) ;
	function gotSchool(data){
		data = data.val() ;
		var keys = Object.keys(data) ;
		var select = document.querySelector("#schools") ;
		keys.map( x => {
			console.log("uniii : " + data[x].school) ;
			var option = document.createElement("option") ;
			option.text = data[x].school ;
			select.add(option , select[0]) ;
		});
	}	
	function errSchool(error){
		console.log("error : " + error ) ;
	}
}

function loadSchool2(){
	console.log("tatwta") ;
	var uni = document.querySelector("#uni").value ;
	var ref = database.ref('admin/' + uni) ;
	ref.on('value' , gotUni , errUni) ;
	function gotUni(data){
		var data = data.val() ;
		var keys = Object.keys(data) ;
		var select = document.querySelector("#school2") ;
		keys.map(x => {
			var option = document.createElement("option") ;
			option.text = data[x].school ;
			console.log("hadha : " + data[x].school) ;
			select.add(option , select[0]) ;
		}) ;
	}
	function errUni(err){
		console.log("error : " + err) ;
	}
}

function uploadFile(e){
	e.preventDefault();
	//alert("upload");
	var file = e.target.files[0] ;
	var uploader = document.querySelector("#uploader") ;
	var subject = document.querySelector("#other-subject").value ; 
	var type = document.querySelector("#file-types").value ;
	console.log(subject + " " + type) ;
	var storageRef = firebase.storage().ref(subject + "/" + file.name) ;
	var task = storageRef.put(file) ;
	let data ;
	task.on('state_changed' , 
	
	function progress(snapshot){
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100 ;
		uploader.value = percentage ;
		data = snapshot ;
	} ,

	function error(e){
		console.log(e) ;
		alert("alet while uploading the file ! try again ") ;
	} ,

	function complete(){
		console.log("done : ") ;
		console.log(data.task.metadata_.size) ;
		console.log(data.task.metadata_.bucket) ;
		console.log(data.task.metadata_.fullPath) ;
		console.log(data.task.metadata_.updated) ;
		console.log(data.task.metadata_.name) ;
		// push to realtime database
		console.log(type) ;
		console.log(globalUser.uni) ;
		console.log(globalUser.school) ;
		console.log(subject) ;
		console.log(data.task.metadata_.updated) ;
		console.log(globalUser.name) ;

		let haha = {h : "haha"} ;
		console.loh(haha.h) ;

		let dataOfFile = {
			name : file.data.task.metadata_.name ,
			path : data.task.metadata_.fullPath ,
			userName :  globalUser.name ,
			type : type ,
			uni : globalUser.uni ,
			school : globalUser.school ,
			subject : subject ,
			date : data.task.metadata_.updated 
		} ;
		console.log(dataOfFile.school) ;
		var ref = database.ref('files') ;
		ref.push(dataOfFile) ;

		var ref = database.ref('users/'+globalUser.uid + "/files") ;
		ref.push(dataOfFile) ;
		alert("file uploded ") ;
	}
	) ;
}