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

let timerRef = database.ref("timer/" + timerId);
timerRef.set({duration : 0}) ;

const addTime = () => {
    time += 5 ;
    timerRef.set({duration : time}) ;
}

setInterval(addTime , 5000) ;