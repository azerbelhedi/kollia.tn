document.addEventListener("keydown" , (e) => {
	//console.log(e.which) ;
	//alert(e.which) ;
	if(e.which === 123){e.preventDefault();}
	if(e.which === 67){e.preventDefault();}
});

let fileEvent ;
// init 

document.querySelector("#other-subject").value = "select-subject" ;
document.querySelector("#file-types").value = "select-type" ;
document.querySelector("#track").value = "select-track" ; 
document.querySelector("#level").value = "select-level" ;

// /init


console.log("hey") ;
var globalUser ;
var loginButton = "log in" ;
// Initialize Firebase
displayMain() ;
renderState = "main";

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
logout() ;
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
	document.getElementsByClassName("fixed-login")[0].innerHTML = "home";
	deleteDisplay();
	document.getElementsByClassName("upload-block")[0].style.display = "block" ;
}


function switchLog(){
	deleteDisplay();
	if(renderState == "main"){
		if(loginButton == "log in"){
			displayLog();
			renderState = "log";
			document.getElementsByClassName("fixed-login")[0].innerHTML = "home";
		}
		else if(loginButton == "log out"){
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
	firebase.auth().signInWithEmailAndPassword(email , password).then(function(data){console.log(data)}).catch(function(error){
		alert(error) ;
	});
	//setTimeout(function(){} , 2000)
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
	//if(nameExist(name)){alert("the name is already token") ; return false ;}
	//
	var res ;
	var usersListRef = database.ref('usersList') ;
	const gotUsersList = (data) => {
		data = data.val() ;
		var keys = Object.keys(data) ;
		var userNames = [] ;
		keys.map(x => {userNames.push(data[x].name) ; }) ;
		//console.log(userNames) ;
		res = userNames.findIndex(function(element){
			return element == name ;
		});
		//console.log(res) ;
		if(res != -1){
			alert("the name is already token") ;
			return false ;}
		else{
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
					ref.push({
						name : "name" ,
						path : 'path' ,
						userName :  'userName' ,
						type : 'type' ,
						uni : 'uni' ,
						school : 'school' ,
						subject : 'subject' ,
						date : 'date' ,
						views : 0 ,
						userUid  : data.user.uid 
					}) ;
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
				
					ref = database.ref('users/' + data.user.uid + '/img') ;
					ref.push({img : "src"}) ;
		
				}).catch(function(error){
					alert("error while signing up ! : " + error.message) ;
				});	
			}
		
			//alert("email : "+email + "\n pass : "+name);
			// firebase log in 
			//switchLog();
		}
		
	}

	const errorUsersList = (err) => {
		console.log("err :" , err) ;
	}
	usersListRef.on('value' , gotUsersList , errorUsersList) ;
	//
	
}


document.getElementById("login-form").addEventListener('submit',function(e){
	login(e);
});

document.getElementById("signup-form").addEventListener('submit',function(e){
	createAccount(e);
});


document.getElementById("file").addEventListener('change',function(e){
	fileEvent = e ;
 	let upSubject = document.querySelector("#other-subject").value ;
	let upType = document.querySelector("#file-types").value ;
	let upTrack = document.querySelector("#track").value ; 
	let upLevel = document.querySelector("#level").value ;
	document.querySelector("#stage2").style.display = "inline" ;
	document.querySelector("#stage1").style.display = "none" ;
	let fileName = e.target.files[0].name ;
	// make 50
	if(fileName.length > 50) {
		fileName = fileName.substring(0 , 50) ;
	}
	document.querySelector("#finalFileName").value =  fileName ;
	//e.target.files[0].name = "azer" ;
	//console.log("files 00 name :") ;
	//console.log(e.target.files[0].name) ;

	// get the name 
	
});


firebase.auth().onAuthStateChanged(function(user){
	if(user){
		//setTimeout(function{} , 2000) ;
		console.log("uid ::: :: : " + user.uid ) ;
		document.querySelector("#the-upload-button").style.display = "inline" ;
		loginButton = "log out" ;
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
			//document.querySelector("#user-name").innerHTML = name ;
		}
		ref.on('value' , gotName , errName) ;

		//job
		var job ;
		var ref = database.ref('users/' + user.uid + '/job') ;
		function gotJob(data){
			data = data.val() ;
			var keys = Object.keys(data) ;
			job = data[keys[0]].job ;
			//document.querySelector("#user-location").innerHTML = job ;
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
			//document.querySelector("#user-location").innerHTML += (" at " + uni) ;
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
			//document.querySelector("#user-location").innerHTML += ( "/" + school) ;
			globalUser = {
				name : name ,
				uni : uni ,
				school : school ,
				uid : user.uid
			}
			console.log("salem alhiko" + uni + school + name + user.uid ) ;
			if(name == undefined || uni == undefined || school == undefined || user.uid == undefined){
				alert("sorry ! we have a problem connetcting to your account ! please try again now") ;
				//logout
				logout() ;
				loginButton = "log in" ;
			document.querySelector("#the-upload-button").style.display = "none" ;
			document.querySelector(".popup").style.display = "none" ;
			// delete data !!
			name = "" ;
			//document.querySelector("#user-name").innerHTML = name ; 
			document.getElementsByClassName("fixed-login")[0].innerHTML = loginButton;
			}
			console.log("user is connected succefuly yy : " + globalUser.name) ;
			console.log("user is connected succefuly yy : " + globalUser.uni) ;
			console.log("user is connected succefuly yy : " + globalUser.school) ;
			console.log("user is connected succefuly yy : " + globalUser.uid) ;
	
		}
		function errSchool(err){
			console.log(err) ;
		}
		ref.on('value' , gotSchool , errSchool) ;
		// load profile ;
			}
	else{
		loginButton = "log in" ;
		document.querySelector("#the-upload-button").style.display = "none" ;
		document.querySelector(".popup").style.display = "none" ;
		// delete data !!
		name = "" ;
		//document.querySelector("#user-name").innerHTML = name ; 
	}
	document.getElementsByClassName("fixed-login")[0].innerHTML = loginButton;
	//switchLog();
});

function logout(){
    firebase.auth().signOut().then(function(){
		// mrigel 
		//switchLog();
		// last chance !! 
			document.querySelector(".main").style.display = "block" ;
		//
		console.log("outttt") ;
    } , function(error){
        alert(error) ;
    });
}

function loadData(){
	// load unis 
	//getSyncs() ;
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
		getSyncs() ;
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
	// control file size !!
	var uploader = document.querySelector("#uploader") ;
	var subject = document.querySelector("#other-subject").value ; 
	var type = document.querySelector("#file-types").value ;
	var track = document.querySelector("#track").value ;
	var level = document.querySelector("#level").value ;
	console.log(subject + " " + type) ;
	var storageRef = firebase.storage().ref(subject + "/" + file.name) ;
	var task = storageRef.put(file) ;
	let data ;
	task.on('state_changed' , 
	
	function progress(snapshot){
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100 ;
		uploader.value = percentage ;
		document.querySelector("#uploadState").innerHTML = "uploading..." ;
		data = snapshot ;
	} ,

	function error(e){
		console.log(e) ;
		alert("alet while uploading the file ! try again ") ;
	} ,

	function complete(){
		console.log("done : ") ;
		document.querySelector("#uploadState").innerHTML = "file uploaded successfully" ;
		document.querySelector("#doneUpload").style.display = "inline" ;
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
		console.log("come on") ;
		var name = data.task.metadata_.name  ;
		var path = data.task.metadata_.fullPath ;
		var userName =  globalUser.name ;
		var uni = globalUser.uni ;
		var school = globalUser.school ;
		var date = data.task.metadata_.updated ;
		console.log({
			name : name ,
			path : path ,
			userName :  userName ,
			type : type ,
			uni : uni ,
			school : school ,
			subject : subject ,
			track : track ,
			level : level ,
			date : date ,
			views : 0 
		}) ;
		var ref = database.ref('files') ;
		ref.push({
			name : name ,
			path : path ,
			userName :  userName ,
			type : type ,
			uni : uni ,
			school : school ,
			subject : subject ,
			track : track ,
			level : level ,
			date : date ,
			views : 0
		}) ;

		var ref = database.ref('users/'+globalUser.uid + "/files") ;
		ref.push({
			name : name ,
			path : path ,
			userName :  userName ,
			type : type ,
			uni : uni ,
			school : school ,
			subject : subject ,
			track : track ,
			level : level ,
			date : date ,
			views : 0
		}) ;
		//alert("file uploaded ") ;
		/*
		if(confirm("file uploaded successfully ! \n do you want to upload more documents ?")){
			// upload more
		}
		else{
			location.reload() ;
		}
		*/
		// confirm 
	}
	) ;
}

// load files :
var files = [] ;
var ref = database.ref('files') ;
ref.on('value' , gotFiles , errFiles) ;

function gotFiles(data){
	//document.querySelector("#top-docs") ='<h1 id = "top-docs">#TOP</h1>'
	data = data.val() ;
	var keys = Object.keys(data) ;
	keys.map(x => {
		console.log("file : " + data[x].path) ;
		files.push(data[x]) ;
	})
	console.log(files) ;
	// render :
	var date_diff_indays = function(date1, date2) {
		dt1 = new Date(date1);
		dt2 = new Date(date2);
		return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	}
	var i = 1 ;
	files.map(x => {
		//alert(i) ;
		console.log("file" + x.name) ;
		var d = new Date();
		var color = "grey" ;
		if(x.type == "exercices"){
			color = "#D1B6E1" ;
		}
		else if(x.type == "test"){
			color = "#519D9E" ;	
		}
		else if(x.type == "course"){
			color = "#58C9B9" ;	
		}
		else if(x.type == "exercices-correction"){
			color = "#9DC8C8" ;	
		}
		else if(x.type == "test-correction"){
			color = "#9DC8C8" ;	
		}
		var time = date_diff_indays(x.date , d) ;
		var id = x.name+i ;
		id = id.replace(/\s/g,'');
		//alert ("space id : " + id) ;
		link = x.path ;
		var name = x.userName;
		name = name.replace(/\s/g,'');
		name = name + "/231321" + i ; 
		i++ ;
		let yearex ;
		if(x.level == 1){yearex = "st " ;}
		else if(x.level == 2){yearex = "nd " ;}
		else if(x.level == 3){yearex = "rd " ;}
		//alert('day : ' +time) ;
		var element = document.querySelector("#top-docs") ;
		//element.outerHTML = '<div class = "row top-docs" > <h1 id = "top-docs"></h1> </div>' ;
		element.outerHTML += ('  <div  class = "doc3 col-md-2 col-sm-2" id = "' + id + '" > ' +
		'<div class = "subject-type" style = "background-color : '+color+'"> <center>'+
		'<div class = "type"><h4>' + x.type + '</h4></div>' +
		'<div class = "subject"><h4>' + x.subject + '</h4></div> '+
	'</center> </div> ' +
		'<div class = "name-and-path">'+
			'<h2 class = "file-name"> ' + x.name + '</h2> ' +
			'<h4> ' + x.uni + "/" + x.school +'<br/>' + x.level + yearex+ x.track + '</h4>' +
			//'<h4> ' + x.level + yearex+ x.track + ' </h4>' +
		'</div>' +
		'<div class = "doc2-img"> '+
		//'<img src="data:image/png;base64,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" alt="pic here"> ' +
		'</div> ' +
	'<div class = "footer"> <h5>by <a id = "'+ name +'" href = "">' + x.userName + '</a> <br/> ' + time+'days ago </h5></div> '+
	'</div> ')  ;
		
	}) ;

	var i = 1 ;
	files.map(x => {
		var id = x.name +i ;
		id = id.replace(/\s/g,'');
		var name = x.userName;
		name = name.replace(/\s/g,'');
		//alert(id) ;
		
		name = name + "/231321" + i ; 
		i++ ;
		document.getElementById(name).addEventListener('click' , function(e){
			renderOtherProfile(e , name) ;
		});
		document.getElementById(id).addEventListener('click' , function(e){
			if(e.target.localName != 'a'){openFile(e ,x , x.path) ;}
			console.log(e.target.localName) ;
			console.log(x) ;
		});

	});
	document.querySelector("#loading").style.display = "none" ;

}


function errFiles(error){
	console.log("error : " + error) ;
}

function addViews(pathID){
	let viewRef = database.ref('views/' + pathID) ;
	var times = 0;

	viewRef.on('value' , gotView , errView) ;
	
	function gotView(data){
		console.log('got view success : ' + data.val()) ;
		if(data.val() != null){
			//get add push
			if(times == 0){
				times++;
				var finalViews ;
				data = data.val() ;
				//let viewKeys = Object.keys(data) ;
				console.log(data.value) ;
				//console.log(data[viewKeys[0]].value) ;
				finalViews = data.value + 1 ;
				viewRef.set({value : finalViews}) ;
			}
		}
		else{
			console.log("need to create new ref !") ;
			if(times == 0){
				times++ ;
				viewRef.set({value : 1}) ;
			}
		}
	}

	function errView(err){
		console.log("view error : " + error) ;
	}
	
	//alert("adding") ;
}

function convertPath(path){
	let testPath = path ;
	while(testPath != testPath.replace('/','')){
		testPath = testPath.replace('/','') ;
		console.log(testPath) ;
 	}
	while(testPath != testPath.replace(' ','')){
		testPath = testPath.replace(' ','') ;
		console.log(testPath) ;
	}
	while(testPath != testPath.replace('.','')){
		testPath = testPath.replace('.','') ;
		console.log(testPath) ;
	}
	while(testPath != testPath.replace('#','')){
		testPath = testPath.replace('#','') ;
		console.log(testPath) ;
	}
	while(testPath != testPath.replace('$','')){
		testPath = testPath.replace('$','') ;
		console.log(testPath) ;
	}
	while(testPath != testPath.replace('[','')){
		testPath = testPath.replace('[','') ;
		console.log(testPath) ;
	}
	while(testPath != testPath.replace(']','')){
		testPath = testPath.replace(']','') ;
		console.log(testPath) ;
	}
	return testPath ;
	//.", "#", "$", "[", or "]"
}
function openFile(e , x , path){
	// sync link 
	
	syncLink(x , path) ;
	//C2i/d5.pdf
	//C2i/d5.pdf
	console.log("path : " + path) ;
	//alert(path) ;
	//alert('trying to open ') ;

	let testPath = convertPath(path) ;
	console.log(testPath) ;
	addViews(testPath) ;
	
	//alert(testPath) ;
	
	

	//alert("showing id") ;
	// delete iframe link 
	// add view part
	/*
	var mara = 0 ;
	var pathLink = undefined ;
	var currentViews = undefined ;
	var rootFilesRef = database.ref("files") ;
	const errFilesRoot = (err) => {console.log(err) ; }
	const gotFilesRoot = (localData) => {
		localData = localData.val() ;
		var keys = Object.keys(localData) ;
		keys.map(z => {
			if(localData[z].path == path){
				console.log("salem" + localData[z].path) ;
				//alert("wait") ;
				pathLink = z ;
				currentViews = localData[z].views ;
				//break ;
			}
		}) ;
		if(pathLink != undefined && currentViews != undefined && mara == 0){
			mara++ ;
			console.log("y : " , pathLink) ;
			console.log("views : " , currentViews) ;
			var viewSetRef = database.ref('files/' + pathLink + '/views') ;
			currentViews++ ;
			viewSetRef.set(1) ;
		}
		
	}


	rootFilesRef.on('value' , gotFilesRoot , errFilesRoot) ;
*/
	/*
	var viewFileRef = database.ref('files/-LTHHabmRWRZ-cIpYF78/views') ;
	viewFileRef.set(0) ;
	*/
	//console.log(x) ;
	//alert("wait" ) ;
	//
	
	document.querySelector("#report-file-name").innerHTML = x.name ;
	document.querySelector("#report-user-name").innerHTML = x.userName ;
	document.querySelector("#more-report-details").value = "" ;
	document.querySelector("#report-send-button").addEventListener('click' , function(e){
		e.preventDefault() ;
		var reason = document.querySelector("#report-reason").value ;
		var details = document.querySelector("#more-report-details").value ;
		reportFile(x.name , x.userName , reason , path , details) ;
		cancelReport() ;
	});
	document.querySelector("#doc-iframe").src = "" ;
	// display iframe
	document.querySelector("#doc-section").style.display = "block" ;
	//e.preventDefault() ;
	//alert(path) ;
	// open it ;
	var storageRef = firebase.storage().ref('') ;
	var starsRef = storageRef.child(path) ;
	starsRef.getDownloadURL().then(function(url){
		//window.open(url) ;	
	// add iframe link 	
	document.querySelector("#doc-iframe").src = url ;
});
}

function renderOtherProfile(e , name){
	e.preventDefault() ;
	var pos = name.search("/231321") ;
	name = name.substring(0 , pos) ;
	//alert("profile : " + name) ;
	var user ;
	var ref = database.ref('users') ;
	ref.on('value' , readUsers , errorUsers) ;
	function errorUsers(err){
		console.log(err) ;
	}
	function readUsers(data){
		data = data.val() ;
		var keys = Object.keys(data) ;
		keys.map(x => {
			//console.log(data[x].name) ;
			localData = data[x].name ;
			var lkeys = Object.keys(localData) ;
			console.log(localData[lkeys[0]].name) ;
			var theName = localData[lkeys[0]].name ;
			theName = theName.replace(/\s/g,'');
			console.log(theName) ;
			if(theName == name){
				//alert(name) ;
				user = data[x] ;
			}
		});
	}
}


function filter(){
	if(screen.width < 600 && filterResponsiveState == "shown"){
		responsiveFilterButton() ;
	}
	//alert("filter") ;
	document.querySelector(".top-docs").outerHTML = '<div class = "row top-docs" > ' +
	'<h1 id = "top-docs"></h1>' +
	'<hr> ' +
	'</div>';
	var uni = document.querySelector('#unis').value  ;
	var school = document.querySelector('#schools').value  ;
	var subject = document.querySelector('#subject').value  ;
	var type = document.querySelector('#docType').value  ;
	var level = document.querySelector("#level-filter").value;
	var track = document.querySelector("#track-filter").value ;
	let filterObject = {
		uni : uni ,
		school : school ,
		subject : subject ,
		type : type ,
		level : level ,
		track : track 
	} ;
	syncFilter(filterObject) ;
	//alert(uni + school + subject + type ) ;
	var files = [] ;
	var ref = database.ref('files') ;
	ref.on('value' , gotFiles2 , errFiles2) ;

	function errFiles2(error){
		console.log(error) ;
	}

	function gotFiles2(data){
		data = data.val() ;
		var keys = Object.keys(data) ;
		keys.map(x => {
			if((data[x].level == level || level == "all") &&  (data[x].track == track || track == "all") && (data[x].uni == uni || uni == "all") && (data[x].school == school || school == "all") && (data[x].subject == subject || subject == "all") && (data[x].type == type || type == "all") ){
				files.push(data[x]) ;
			}
		}) ;
		// render :
		var date_diff_indays = function(date1, date2) {
		dt1 = new Date(date1);
		dt2 = new Date(date2);
		return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
	}
	//alert(files.length);
	if(files.length == 0){
		document.querySelector("#no-results").style.display = "block" ;
	}
	else{
		document.querySelector("#no-results").style.display = "none" ;
	}
	var i = 1 ;
	files.map(x => {
		//alert(i) ;
		var color = "grey" ;
		if(x.type == "exercices"){
			color = "#D1B6E1" ;
		}
		else if(x.type == "test"){
			color = "#519D9E" ;	
		}
		else if(x.type == "course"){
			color = "#58C9B9" ;	
		}
		else if(x.type == "exercices-correction"){
			color = "#9DC8C8" ;	
		}
		else if(x.type == "test-correction"){
			color = "#9DC8C8" ;	
		}
		console.log("file" + x.name) ;
		var d = new Date();
		var time = date_diff_indays(x.date , d) ;
		var id = x.name + i;
		id = id.replace(/\s/g,'');
		//alert ("space id : " + id) ;
		link = x.path ;
		var name = x.userName;
		name = name.replace(/\s/g,'');
		name = name + "/231321" + i ; 
		i++ ;
		let yearex ;
		if(x.level == 1){yearex = "st " ;}
		else if(x.level == 2){yearex = "nd " ;}
		else if(x.level == 3){yearex = "rd " ;}
		//alert('day : ' +time) ;
		var element = document.querySelector("#top-docs") ;
		element.outerHTML +=  ('  <div  class = "doc3 col-md-2 col-sm-2" id = "' + id + '" > ' +
		'<div class = "subject-type" style = "background-color : '+color+'"> <center>'+
		'<div class = "type"><h4>' + x.type + '</h4></div>' +
		'<div class = "subject"><h4>' + x.subject + '</h4></div> '+
	'</center> </div> ' +
		'<div class = "name-and-path">'+
			'<h2 class = "file-name"> ' + x.name + '</h2> ' +
			'<h4> ' + x.uni + "/" + x.school +'<br/>' + x.level + yearex+ x.track + '</h4>' +
			//'<h4> ' + x.level + yearex+ x.track + ' </h4>' +
		'</div>' +
		'<div class = "doc2-img"> '+
		//'<img src="data:image/png;base64,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" alt="pic here"> ' +
		'</div> ' +
	'<div class = "footer"> <h5>by <a id = "'+ name +'" href = "">' + x.userName + '</a> <br/> ' + time+'days ago </h5></div> '+
	'</div> ')  ;
		
	}) ;
	var i = 1 ;
	files.map(x => {
		var id = x.name + i  ;
		id = id.replace(/\s/g,'');
		var name = x.userName;
		name = name.replace(/\s/g,'');
		//alert(id) ;
		
		name = name + "/231321" + i ; 
		i++ ;
		document.getElementById(name).addEventListener('click' , function(e){
			renderOtherProfile(e , name) ;
		});
		document.getElementById(id).addEventListener('click' , function(e){
			if(e.target.localName != 'a'){openFile(e ,x , x.path) ;}
			console.log(e.target.localName) ;
		});

	});

		console.log(files) ;
	}
}


function closeFile(){
	homeLink() ;
	document.querySelector("#doc-section").style.display = "none" ;
	document.querySelector("#doc-iframe").src = "" ;	
}

document.addEventListener('keypress' , (e) => {
	if(e.key == 'Escape'){closeFile() ;}
});



function refresh(){
	location.reload();
}

function displayReport(){
	//report alert class
	document.querySelector(".report-alert").style.display = "block" ;
}

function cancelReport(){
	document.querySelector(".report-alert").style.display = "none" ;
}

function reportFile(file , user , reason , path , details){
	//alert(file + user + reason + path ) ;
	// upload to fire base 
	var reportRef = database.ref('admin/reports') ;
	var reportData = {
		file : file ,
		user : user ,
		reason : reason ,
		details :details ,
		path : path ,
		waiting : 1
	} ;

	reportRef.push(reportData) ;
}

function resetFilter(){
	document.querySelector('#unis').value = "all" ;
	document.querySelector('#schools').value = "all" ;
	document.querySelector('#subject').value  = "all" ;
	document.querySelector('#docType').value  = "all" ;
	document.querySelector("#track-filter").value = "all" ;
	document.querySelector("#level-filter").value = "all" ;
	filter() ;
}


function courseFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "course" ;
	filter() ;
}

function testFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "test" ;
	filter() ;
}

function exercicesFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "exercices" ;
	filter() ;
}

function testCorrectionFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "test-correction" ;
	filter() ;
}

function exercicesCorrectionFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "exercices-correction" ;
	filter() ;
}


function allFilter(){
	//resetFilter();
	document.querySelector('#docType').value  = "all" ;
	filter() ;
}

// fast tracks filter

function filterTracks(){
	let track = document.querySelector("#fastTrack").value ;
	document.querySelector("#track-filter").value = track ;
	filter() ;
}


function backToStage1(){
	//alert("i am going back stage 1 ") ;
  	document.querySelector("#stage1").style.display = "inline" ;
	document.querySelector("#stage2").style.display = "none" ;
}

function goToStage3(){
	let upSubject = document.querySelector("#other-subject").value ;
	let upType = document.querySelector("#file-types").value ;
	let upTrack = document.querySelector("#track").value ; 
	let upLevel = document.querySelector("#level").value ;
	if(upSubject == "select-subject" || upType == "select-type" || upTrack == "select-track" || upLevel == "select-level"){
		alert("please select subject , type , track and level first !") ;
	}
	else{
		//alert("i am going to stage 3 ") ;
		document.querySelector("#fileNameEnd").innerHTML = document.querySelector("#finalFileName").value ;
		document.querySelector("#fileTypeSubjectEnd").innerHTML = upType + " " + upSubject ;
		document.querySelector("#fileLevelTrackEnd").innerHTML = upTrack + "(" + upLevel+ ")" ; 
		document.querySelector("#stage2").style.display = "none" ;
		document.querySelector("#stage3").style.display = "inline" ;


		//alert("will upload  !") ;
		
		// // /// / /this used to be the usual upload !!!
		//uploadFile(e);
		// /// / /// 
	}
	//uploadFile(e);
}

document.querySelector("#backToStage1").addEventListener("click" , function(e){
	e.preventDefault() ;
	backToStage1() ;
});

document.querySelector("#goToStage3").addEventListener("click" , function(e){
	e.preventDefault() ;
	goToStage3() ;
});


document.querySelector("#backToStage2").addEventListener("click" , function(e){
	e.preventDefault() ;
	document.querySelector("#stage3").style.display = "none" ;
	document.querySelector("#stage2").style.display = "inline" ;
}) ;

document.querySelector("#goToStage4").addEventListener("click" , function(e){
	e.preventDefault() ;
	document.querySelector("#stage4Background").style.display = "inline" ;
	document.querySelector("#stage4").style.display = "inline" ;
	uploadFile(fileEvent) ;
});


document.querySelector("#doneUpload").addEventListener("click" , function(e){
	e.preventDefault() ;
	//alert("go go go") ;
	document.querySelector("#doneUpload").style.display = "none" ;
	document.querySelector("#stage4").style.display = "none" ;
	document.querySelector("#stage3").style.display = "none" ;
	document.querySelector("#stage2").style.display = "none" ;
	document.querySelector("#stage1").style.display = "inline" ;
	document.querySelector("#stage4Background").style.display = "none" ;
});


//filter() ;



