var ideaObjectArray = []; //this Array holds idea objects that contain information about the idea. 


function prioritize(rating) {

	for( i=0; i<ideaObjectArray.length; i++) { //iterate through array starting at the beginning
	
		var ideaObject= ideaObjectArray[i];
		var ranking = ideaObject.rank;   //for each idea get its rating(ranking) to compare to rating of current idea
		
		var rankingNum = parseInt(ranking); 
		var ratingNum = parseInt(rating);  //converts string to number to compare values
	
		if(ratingNum>=rankingNum) {
			
			return i; 
		}
	}
	return ideaObjectArray.length;  //idea rating is not bigger or equal to existing ideas. so it goes at the bottom. 
} 


function outputArray() {

	$('ol#list').children().remove();  //removes existing list
	
	for(i=0; i<ideaObjectArray.length; i++) { //writes out existing list in order 
		
		var ideaName = ideaObjectArray[i].name;	 
		var sanatizedName = $('<div>').text(ideaName).html(); //escape ideaName 
	
		var ideaRating = ideaObjectArray[i].rank; 
		var ideaDescription = ideaObjectArray[i].description; 
		var sanatizedDescription = $('<div>').text(ideaDescription).html(); //escape ideaDescription
		
		if(sanatizedDescription != '') {
			sanatizedDescription = '<p class="description">'+ sanatizedDescription + '</p>'; 
		}
		
		$('ol#list').append('<li><span class="ideaTitle">'+sanatizedName+'</span><span class="rating">'+ideaRating+
		'</span><span class="delete">'+'delete item'+ '</span>'+sanatizedDescription+'</li>');  //adds idea name, rating and description to the page 
	
	}
}
 	

$("#addIdeaDialog").dialog({
		modal:true,
		autoOpen:false,
		width: 310,
		draggable: false,
		resizable:false,
		buttons: {
		
			Add : function() {
			
			if($('#ideaTitle').val() != '') { //check that name isn't empty
				var rating = $("#ideaRating").val(); 
				var ideaObject = {name: $('#ideaTitle').val(), description: $('#ideaDescription').val(), rank: rating}; //create object to be added
		 
				if(ideaObjectArray.length===0) { 
				
					ideaObjectArray.push(ideaObject); //if there are no other ideas add it to the list straight away
				
				}else { //start testing to place the idea in order 
				
					if(rating==10) {
		
						ideaObjectArray.unshift(ideaObject); //puts an idea with highest ranking at top of the list
					}
					else {
					
						var position= prioritize(rating); //return index number to place idea object in order
						
						ideaObjectArray.splice(position,0,ideaObject);  //place object in array ready to become a html list

					}
				} //end conditional to test if the list is empty
					
				//writeNewArray(); // if there's list items deletes old list and writes new list. 
				
				for(i=0; i<ideaObjectArray.length; i++) {
					console.log(ideaObjectArray[i]); 
				}
				console.log('<br>'); 
				
				outputArray(); //outputs html for updated list 
				
				$(this).dialog('close'); //closes dialog
			} 
			else {
				console.log('iam here'); 
				$('#ideaTitle').effect('shake','fast'); 
	
			}//end if/else to check a name has been entered
			
			}//end submit function 	
		}//end buttons
	}); //initialize addIdeaDialog


$("#addIdea").button({
		icons: {primary: "ui-icon-plus" }
	}); //adds jquery add task button with icon	


$("#addIdea").click(function(){
	$("#addIdeaDialog").dialog("open");
	$("#ideaTitle").val('');           // resets form fields on popup
	$("#ideaDescription").val('');  

	}); 
		

$("#list").on("click", ".delete", function(){   //event delegation 

	var previousListItems = $(this).parent().prevAll(); //find number list items above item to be deleted 
	var indexToDelete = previousListItems.length;  //number of previous list items == index to be deleted from array
	
	ideaObjectArray.splice(indexToDelete,1); // delete from idea object array 
	
	$(this).parent().remove(); //removes list item from the DOM	
 }); 
	
