//alert("super upload") ;

function superUpload(){
    //alert("super upload !") ;
    document.querySelector("#super-upload-area").style.display = "block" ;
}

function confirmSuperUpload(){
    let voucher = document.querySelector("#prof-pass").value ;
    let ref = database.ref("admin/vouchers/" + voucher) ;
    ref.on("value" , superLog , errSuperLog) ;
    document.querySelector("#super-upload-area").style.display = "none" ;
}

function cancelSuperUpload(){
    document.querySelector("#super-upload-area").style.display = "none" ;
}

function errSuperLog(err){  
    alert("voucher invalid") ;
}

function superLog(data){
    ///
    var data = data.val() ;
    if(data != null){
        alert("invalid" ) ;
    }
    else{
        
        var key = Object.keys(data) ;
    //
    var password = data[key[0]].password ;
    var email = data[key[0]].email ;
    alert("email : " + email ) ;
    alert("pass : " + password ) ;
    // log in  then open upload area ;
    firebase.auth().signInWithEmailAndPassword(email , password).then(function(data){console.log(data)}).catch(function(error){
        alert(error) ;
    });
    }
    
    
    //document.getElementById("login-form").reset() ;
}

document.querySelector("#superass").addEventListener('submit' , function(e){
    e.preventDefault() ;
    confirmSuperUpload() ;
}) ;

