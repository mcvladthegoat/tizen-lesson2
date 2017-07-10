$(document).ready(function(){
	var baseName 	  = "WebBase";
	var storeName 	  = "WebBaseStore4";
	var db = openDatabase(baseName, '1.0', 'Test DB', 2 * 1024 * 1024);
	
	$("#select-choice-1").change(function(){
		var curr = $(this).val();
		console.log(curr);
		   
	    $.mobile.activePage.find('.ui-btn').not('.ui-li-divider')
	                       .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
	                       .addClass('ui-btn-up-' + curr)
	                       .attr('data-theme', curr);
	    
	    $.mobile.activePage.find('.ui-li-divider').each(function (index, obj) {
	        if ($(this).parent().attr('data-divider-theme') == 'undefined') {
	            $(this).removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
	                   .addClass('ui-bar-b')
	                   .attr('data-theme', 'b');
	        }
	    })
	                       
	    $.mobile.activePage.find('.ui-header, .ui-footer')
	                       .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
	                       .addClass('ui-bar-' + curr)
	                       .attr('data-theme', curr);
	    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
	                       .addClass('ui-body-' + curr)
	                       .attr('data-theme', curr);
	});
	
	
	$("#search_btn").click(function(){
		var needle = $("#search_field1").val(); 
        var pl = $("#search_result");
        pl.empty();
        
	    db.transaction(function (tx) {
	    	console.log(needle);
	        tx.executeSql('SELECT * FROM ' + storeName + " WHERE title LIKE '%" + needle + "%'", [], function (tx, results) {
	           var len = results.rows.length, i;
	           msg = "<p>Found rows: " + len + "</p>";
	           console.info("!", msg);


	           
	           for (i = 0; i < len; i++){
	        	   console.log("CHECK ME", results.rows.item(i));
	        	   
		           pl.append($('<li/>', {    //here appending `<li>`
		        	    'data-role': "list-divider"
		        	}).append($('<a/>', {    //here appending `<a>` into `<li>`
		        	    'href': '' ,
		        	    'data-transition': 'slide',
		        	    'text': results.rows.item(i).title
		        	})));
		           pl.listview('refresh');
//	              msg = "<p><b>" + results.rows.item(i).title + "</b></p>";
//	              
//	              $("#rssContent").append('<div class="feed"><div class="image"><img src=' + results.rows.item(i).image 
//	            		  + ' width=' + width + 'px /><div class="title"> Title:' + results.rows.item(i).title 
//	 		        		+ '</div><br><div class="description">Desc: ' + results.rows.item(i).description + '</div><br><i>' + results.rows.item(i).pubdate + '</i></div>');
//	           
		           }
	        }, function(error){console.error(error)});
	     });
	    
	    pl.listview('refresh');
		
	});
	

});	



