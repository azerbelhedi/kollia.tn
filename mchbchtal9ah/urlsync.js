let rootLink = "index.html" ;


function syncLink(x , path){
    let name = "&name=" + x.name ;
    let userName = "&userName=" + x.userName ;
    let longData = name + userName ;
    console.log(longData) ;
    //let longData = "&name="​ + name + "&userName=" + userName ;
    history.pushState({ id : "home page"} , "new title" , rootLink + "?mode=file&path=" + path + longData) ;
    console.log(name) ;
    console.log(userName) ;
    //alert("sync") ;
}

function homeLink(){
    history.pushState({ id : "home page"} , "new title" , rootLink) ;
}

function syncFilter(filter){
    // filter = {uni , school , subject , type , track , level , order}
    let uni = "uni=" + filter.uni ;
    let school = "&school=" + filter.school ;
    let subject = "&subject=" + filter.subject ;
    let searchData = "" ;
    let type = "&type=" + filter.type ;
    let level = "&level=" + filter.level ;
    let track = "&track=" + filter.track ;

    searchData += uni ;
    searchData += school ;
    searchData += subject ;
    searchData += type ;
    searchData += level ;
    searchData += track ;

    history.pushState({ id : "home page"} , "new title" , rootLink + "?mode=search&" + searchData) ;
}


function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, "/").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function getSyncs(){
    //
    let myData = parseURLParams(window.location.href) ; 
    let mode = myData.mode ;
    if(mode == "search"){
        //alert("do search") ;
        let uni = myData.uni ;
        let school = myData.school ;
        let subject = myData.subject ;
        let type = myData.type ;
        let track = myData.track ;
        let level = myData.level ;
        //alert(subject) ;
        document.querySelector('#unis').value = uni ;
        document.querySelector('#subject').value = subject ;
	    document.querySelector('#docType').value = type  ;
	    document.querySelector("#level-filter").value = level ;
	    document.querySelector("#track-filter").value = track  ;
        filter() ;
    }
    else if(mode == "file"){
        //alert("do file") ;
        // let path = myData.path this is a string from array from object 
        let path = "" // this is a pure string :)
        path += myData.path ;
        let name = myData.name ;
        let userName = myData.userName ;
        let xObject = {
            name : name ,
            userName : userName
        } ;
        let e = "" ;
        //alert(path + "*" + name + "*" + userName ) ;
        //alert("now") ;
        openFile(e, xObject , path);
    }
    //alert("we are sync " ) ;
}