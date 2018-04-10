var issue_content = document.getElementById("content");
var issue_history = document.getElementById("history");
// issue_history.style.backgroundColor="red";

function createShortCommentsBlock(issue_history) {
	var com_block = document.createElement( 'div' );
	com_block.className = "spoiler-invert-block";
	var notes_arr = issue_history.getElementsByClassName('has-notes');
	if(notes_arr.length == 0){return com_block;}

	title_comments =document.createElement("h4");
	title_comments.textContent = "Только сообщения:";
	com_block.appendChild(title_comments)

	function clearByClassName(change_entry, cl_name) {
		var need_del_list = change_entry.getElementsByClassName(cl_name);
		if(need_del_list.length == 0){return;}
		for (var i = 0; i < need_del_list.length; i++) {
			need_del_list[i].remove();}
	}

	for (var i = 0; i < notes_arr.length; i++) {
		var entry = notes_arr[i].cloneNode(true);
		clearByClassName(entry, "contextual");
		clearByClassName(entry, "details");
		com_block.appendChild(entry);
    }

	return com_block;
}
function createShortCommentsBlock111(issue_history) {
	var com_block = document.createElement( 'div' );
	com_block.className = "spoiler-invert-block";
	if(issue_history.getElementsByClassName('has-notes').length == 0){return com_block;}
	
	var note_assigned = "???";
	var assigned_issue_ = document.querySelector('td.assigned-to a');
	if (assigned_issue_){note_assigned= assigned_issue_.innerText;}
	
	function getAssignedTo(entry, curr_assigned) {
		var details = entry.getElementsByClassName("details");
		if(details.length == 0){return curr_assigned};
		var li_arr = details[0].getElementsByTagName("li");
		for (var i = 0; i < li_arr.length; i++) {
			var _is_assig = li_arr[0].getElementsByTagName("strong");
			if(_is_assig.length<1){continue;};	
			if(_is_assig[0].innerText != "Назначена"){continue;};
			console.log(_is_assig[0])
			
			break;

				
		}

		
	}


	// title_comments =document.createTextNode("Только сообщения:");
	title_comments =document.createElement("h4");
	title_comments.textContent = "Только сообщения:";
	com_block.appendChild(title_comments);

	console.log(" issue_history.length " + issue_history.children.length)
	for (var i = 0; i < issue_history.children.length; i++) {
		var orig_note = issue_history.children[i];
		note_assigned = getAssignedTo(orig_note, note_assigned);

		// test
		test = document.createTextNode("\nnote_assigned:"+note_assigned+"\n\n")
		orig_note.appendChild(test)
		console.log(i +" note " + test)
		// /test
	}


		
	return com_block;
	// ////function clearByClassName(change_entry, cl_name) {
	// 	var need_del_list = change_entry.getElementsByClassName(cl_name);
	// 	if(need_del_list.length == 0){return;}
	// 	for (var i = 0; i < need_del_list.length; i++) {
	// 		need_del_list[i].remove();}
	// }

	// for (var i = 0; i < notes_arr.length; i++) {
	// 	var entry = notes_arr[i].cloneNode(true);
	// 	clearByClassName(entry, "contextual");
	// 	clearByClassName(entry, "details");

	// 	com_block.appendChild(entry);

	// 	// console.log(i+":" + entry);
	// 	// var note_author =  entry.getElementsByTagName("h4");
	// 	// console.log("note_author:");
	// 	// console.log(note_author);
	// 	// var notes_msg = issue_history.getElementsByClassName('wiki'); // todo div id="journal-3586-notes"
	// 	// console.log("notes_msg:");
	// 	// console.log(notes_msg);
 //    }

	// return com_block;
}

function createSpoilerLink() {
	var spoiler_link = document.createElement( 'a' );
	spoiler_link.setAttribute('href', "#");
	spoiler_link.appendChild(document.createTextNode("Вся история..."));
	spoiler_link.className  = "spoiler-trigger"
	return spoiler_link;
}


if (issue_history && issue_content) {

	var short_comments = createShortCommentsBlock(issue_history);
	var spoiler_link = createSpoilerLink();
	issue_content.insertBefore(short_comments, issue_history);
	issue_content.insertBefore(spoiler_link, issue_history);
	issue_history.className  = "spoiler-block";

	$(document).on('click','.spoiler-trigger',
			function(e)
			{
				e.preventDefault();
				$(this).toggleClass('active');
				$(this).parent().find('.spoiler-block').first().slideToggle(300);
				$(this).parent().find('.spoiler-invert-block').first().slideToggle(300);
			}
		);

} else
{
console.log("rhh no history");
}
