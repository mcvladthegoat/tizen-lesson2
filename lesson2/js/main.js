( function ($) {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "one" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );

    function getRandomArbitrary(min, max) {
    	  return Math.random() * (max - min) + min;
    }
    
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    
    button1.addEventListener("click", function(){
    	var trigger = document.getElementById("tizenpic").style.visibility;
    	document.getElementById("tizenpic").style.visibility = (trigger == "hidden") ? "visible" : "hidden";
    });

    button2.addEventListener("click", function(){
    	document.getElementById("hw-label").innerHTML = screen.height + "X" + screen.width;
    });
    
    t = function(){ return Math.trunc(getRandomArbitrary(0, 256))};
    
    jQuery("#to-color-them").click(function(){    	
    	jQuery("#need-to-color").css("color", "rgb(" + t() + "," + t() + "," + t() + ")");    	
    });
    
    var canvas = document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    ctx.font="italic 30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Tizen", canvas.width/4, canvas.height/4);
    ctx.fillStyle = "blue";
    ctx.fillText("Javascript", canvas.width/4, canvas.height/2.8);
    ctx.fillStyle = "blue";
    ctx.fillText("canvas", canvas.width/3, canvas.height/1.7);
    ctx.fillStyle = "red";
    ctx.fillText("HTML5", canvas.width/3.9, canvas.height/1.8);
    
    
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var flag = false;
      for(var i=0; i<8; ++i){
        	for(var j=0; j<8; ++j){
        		ctx.fillStyle=(flag)  ? "#FFFFFF" : "#000000";
        		ctx.fillRect((j+1)*10,(i+1)*10,10,10);
        		ctx.stroke();
                flag = !flag;
        	}
            flag = !flag;
       }
} ());
