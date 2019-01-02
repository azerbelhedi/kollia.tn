const makeid = (length) =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++)
        {text += possible.charAt(Math.floor(Math.random() * possible.length));}
    return text;
}
  

console.log("logtimer ready !") ;
//alert("logtimer ready !") ;

let timerId = makeid(15) ; 
//alert(timerId);
let time = 0 ;
let date = new Date() ;
let year = date.getFullYear() ;
let month = date.getMonth() +1 ;
let day = date.getDate() ;
let hours = date.getHours() ;
let minutes = date.getMinutes() ;
let seconds = date.getSeconds() ;
let mSeconds = date.getMilliseconds() ;
let dateObject = {
    date :date ,
    year : year ,
    month : month ,
    day : day ,
    hours : hours ,
    minutes : minutes ,
    seconds : seconds ,
    mSeconds : mSeconds
};


let browserData = {
    appCodeName : navigator.appCodeName ,
    appName : navigator.appName ,
    product : navigator.product ,
    userAgent : navigator.userAgent ,
    platform : navigator.platform
} ;
//console.log(browserData) ;

let device ;
let type ;
if(screen.width > 900){
    type = "computer" ;
}
else{
    type = "phone" ;
}

device = {type : type , width : screen.width} ;

console.log("test date object");
console.log(dateObject) ;
let timerRef = database.ref("timer/" + timerId);
timerRef.set({duration : 0 , date : dateObject , device , device , browserData : browserData}) ;

const addTime = () => {
    time += 1 ;
    timerRef.set({duration : time , date : dateObject , device : device , browserData : browserData}) ;
}

setInterval(addTime , 60000) ;