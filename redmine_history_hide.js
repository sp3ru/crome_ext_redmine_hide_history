var issue_content = document.getElementById("content");
var issue_history = document.getElementById("history");

function _clearByClassName(change_entry, cl_name) {
		var need_del_list = change_entry.getElementsByClassName(cl_name);
		if(need_del_list.length == 0){return;}
		for (var i = 0; i < need_del_list.length; i++) {
			need_del_list[i].remove();}
	}

function _createShortCommentsBlock(issue_history) {
	var com_block = document.createElement( 'div' );
	com_block.className = "spoiler-invert-block";
	var notes_arr = issue_history.getElementsByClassName('has-notes');
	if(notes_arr.length == 0){return com_block;}

	title_comments =document.createElement("h3");
	title_comments.textContent = "Только сообщения:";
	com_block.appendChild(title_comments)

	for (var i = 0; i < notes_arr.length; i++) {
		var entry = notes_arr[i].cloneNode(true);
		entry.id = entry.id + "xspoiler";
		for (var ich = 0; ich < entry.children.length; ich++) {
			if(entry.children[ich].id){
				entry.children[ich].id += "subspoiler";
			}
		}

		_clearByClassName(entry, "contextual");
		_clearByClassName(entry, "details");
		com_block.appendChild(entry);
    }

	return com_block;
}

function _getUserIdFromLink(link)
{
	var textarr = link.split("/");
	return textarr[textarr.length-1];
}

function _createOptionAuthor()
{
	p_author = document.getElementsByClassName("author");
	if(p_author.length==0){return;}
	p_author = p_author[0];
	user = p_author.getElementsByClassName("user")
	if(user.length==0){return;}
	user = user[0]
	var user_caption = user.innerText;
	var user_id = _getUserIdFromLink(user.href);

	if(!user_caption){return;}
	if(!user_id){return;}

	var issue_assigned_to_id_elem =  document.getElementById("issue_assigned_to_id");
	if(!issue_assigned_to_id_elem){return;}
	var auth_opt = document.createElement("option")
	auth_opt.style = "background-color:#fffae6"
	auth_opt.value = user_id
	auth_opt.appendChild(document.createTextNode("<<Автор>> "+user_caption));
	var second_elem = issue_assigned_to_id_elem.children[1];
	issue_assigned_to_id_elem.insertBefore(auth_opt, second_elem)
}


function _createSpoilerLink() {
	var spoiler_link = document.createElement( 'a' );
	spoiler_link.setAttribute('href', "#");
	spoiler_link.appendChild(document.createTextNode("Вся история..."));
	spoiler_link.className  = "spoiler-trigger"
	return spoiler_link;
}

if(issue_content)
{
	_createOptionAuthor();
}

if (issue_history && issue_content) {
	var short_comments = _createShortCommentsBlock(issue_history);
	var spoiler_link = _createSpoilerLink();
	issue_history.parentNode.insertBefore(short_comments, issue_history.nextSibling);
	issue_history.parentNode.insertBefore(spoiler_link, issue_history.nextSibling);
	issue_history.className  = "spoiler-block";

	$(document).on('click','.spoiler-trigger',
			function(e)
			{
				if($(this).parent().find('.spoiler-block').first().is(":visible"))
				{
					spoiler_link.innerHTML = "Вся история...";
				}else
				{
					spoiler_link.innerHTML = "Только сообщения...";
				}

				e.preventDefault();
				$(this).toggleClass('active');
				$(this).parent().find('.spoiler-block').first().toggle("slide");
				$(this).parent().find('.spoiler-invert-block').first().slideToggle(200);

			}
		);

}