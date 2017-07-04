window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
        else {
        	try {
				window.alert("HELLO WORLD");
			} catch (e) {
				
			}
        }
    });
    
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    
    button1.addEventListener("click", function(){
    	var trigger = document.getElementById("tizenpic").style.visibility;
    	document.getElementById("tizenpic").style.visibility = (trigger == "visible") ? "hidden" : "visible";
    });

    button2.addEventListener("click", function(){
    	alert(screen.height + "X" + screen.width);
//    	document.getElementsByName("span").innerHTML =screen.height + "X" + screen.width ;
    });
    
};