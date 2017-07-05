
window.onload = function () {
	
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";
	

};


var baseName 	  = "WebBase";
var storeName 	  = "WebBaseStore";



function getFeed(){
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "visible";
    	var width = screen.width;
    	var arr = [];
    	var i=0;
	 var FEED_URL = "http://www.3dnews.ru/news/rss/";
	 
	 
	 
	 $(document).ready(function () {
		    $.ajax({
		        type: "GET",
		        url: FEED_URL,
		        dataType: "xml",
		        error: 	 getStorage,  
		        success: xmlParser
		    });
		});

		function xmlParser(xml) {

			indicator.style.display = "none";

		    $(xml).find("item").each(function () {
		    	  var url =  $(this).find("enclosure").attr('url')

			        $("#rssContent").append('<div class="feed"><div class="image"><img src=' + url + ' width=' + width + 'px /><div class="title"> Title:' + $(this).find("title").text() 
			        		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div></div>');


		    	  var self = this;
		    	  convertImgToDataURLviaCanvas($(this).find("enclosure").attr('url'), 
		    	   function(t){ 
		    		  arr[i] = { title:$(self).find("title").text(), description:$(self).find("description").text(), image: t};
		    		  console.info("HEYYA", t.length);
		    		  setData(arr[i]); // чем плоха данная схема? переделать на передачу массива.
		    	  });
		          

		          
		          i++;
		    });
		    
		    getStorage();
		}
	 
	 

		 var db = openDatabase(baseName, '1.0', 'Test DB', 2 * 1024 * 1024);
		 if(!db){alert("Failed to connect to database.");}
         var msg;
         
     	function onError( err ){
    		console.log( err )
    	}
     	
     	
         
         function setData(title_, description_, image_){

        	 db.transaction(function (tx) {
 tx.executeSql('CREATE TABLE IF NOT EXISTS ' + storeName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, image TEXT)', [],
		 null,
		 null);            

  tx.executeSql('INSERT INTO ' + storeName + ' (title, description, image) VALUES (?, ?, ?)', [title_, description_, image_], null, onError);
         });
         };
         
         function getStorage(){
         db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM ' + storeName, [], function (tx, results) {
               var len = results.rows.length, i;
               msg = "<p>Found rows: " + len + "</p>";
               $("#rssContent").append(msg);
					
               for (i = 0; i < len; i++){
            	   console.log("CHECK ME", results.rows.item(i));
                  msg = "<p><b>" + results.rows.item(i).title + "</b></p>";
                  $("#rssContent").append(msg);
               }
            }, onError);              
         });
         };
         
         
         function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
       	  var img = new Image();
       	  var r;
       	  img.crossOrigin = 'Anonymous';
       	  img.onload = function() {
       	    var canvas = document.createElement('CANVAS');
       	    var ctx = canvas.getContext('2d');
       	    var dataURL;
       	    canvas.height = this.height / 5;
       	    canvas.width = this.width / 5;
       	    ctx.drawImage(this, 0, 0);
       	    dataURL = canvas.toDataURL(outputFormat);
       	    r = dataURL;
       	    callback(dataURL);
       	    canvas = null;
       	  };
       	  img.src = url;
       	}
}
