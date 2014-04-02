function cancel() {
	window.close();
}
function save() {
	var localStorageKey = 'paste_email2';
   
   var theEntries = document.getElementsByClassName('entry');
   var theContents = document.getElementsByClassName('content');
   
   var newObject = [];
   for(i=0; i<theEntries.length; i++) {
      if(theEntries[i].value != "" && theContents[i].value != "") {
         newObject[i] = {};
         newObject[i].entry = theEntries[i].value;
         newObject[i].content = theContents[i].value;
      }
   }
   
	localStorage[localStorageKey] = JSON.stringify(newObject);
	chrome.extension.sendMessage({'funktion': 'resetMenu'});
	window.close();
}

function addentry() {
   var theTableBody = document.getElementById('liste');
   var theHTML = theTableBody.innerHTML;
   theHTML += '<tr><td>Entry:</td><td><input type="text" size="30" class="entry" value=""/></td><td>Text:</td><td><textarea cols="80" rows="10" class="content"></textarea></td><td><input type="button" value="Delete Entry" class="delentry" /></td></tr>\n';
   theTableBody.innerHTML = theHTML;
}

function clickHandler(innerI) {
   return function() {
      var theTR = document.getElementsByTagName('tr');
      theTR[innerI].parentNode.removeChild(theTR[innerI]);
      addEventListeners();
   }
}

function addEventListeners() {
   var theDelButtons = document.getElementsByClassName('delentry');
   for(i=0; i<theDelButtons.length; i++) {
      theDelButtons[i].onclick = clickHandler(i);
   }
}

window.addEventListener('load', function() {
   document.getElementById('save').addEventListener('click', save, false);
   document.getElementById('cancel').addEventListener('click', cancel, false);
   document.getElementById('addentry').addEventListener('click', addentry, false);
	var localStorageKey = 'paste_email2';
   var oldlocalStorageKey = 'paste_email';
   
	if(typeof localStorage[oldlocalStorageKey] != 'undefined')	{
		var theEmailArray = JSON.parse(localStorage[oldlocalStorageKey]);
      
      var newObject = [];
      for(i=0; i<theEmailArray.length; i++) {
         newObject[i] = {};
         newObject[i].entry = theEmailArray[i];
         newObject[i].content = theEmailArray[i];
      }
      
      localStorage[localStorageKey] = JSON.stringify(newObject);
      localStorage.removeItem(oldlocalStorageKey);
	}
   
	if(typeof localStorage[localStorageKey] != 'undefined')	{
		var theObject = JSON.parse(localStorage[localStorageKey]);

      var theTableBody = document.getElementById('liste');
      
      var theHTML = "";
      for(i=0; i<theObject.length; i++) {
         theHTML += '<tr><td>Entry:</td><td><input type="text" size="30" class="entry" value="' + theObject[i].entry + '"/></td><td>Text:</td><td><textarea cols="80" rows="10" class="content">' + theObject[i].content + '</textarea></td><td><input type="button" value="Delete Entry" class="delentry"/></td></tr>\n';
      }
      theTableBody.innerHTML = theHTML;
      addEventListeners();
   }
}, false);
