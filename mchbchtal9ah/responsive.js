if(screen.width < 600) {
//    alert(screen.width) ;
}

let filterResponsiveState = "hidden" ;
//responsiveFilterButton() ;

function responsiveFilterButton(){
    //alert("ready") ;
    if(filterResponsiveState == "hidden"){
        filterResponsiveState = "shown" ;
        // show it
        document.getElementsByClassName("menu")[0].style.display = "inline" ;
    }
    else{
        filterResponsiveState = "hidden" ;
        // hide it 
        document.getElementsByClassName("menu")[0].style.display = "none" ;
    }
}

