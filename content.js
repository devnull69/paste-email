var clickedElement = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.funktion == 'paste') {
		if(clickedElement && (clickedElement.tagName == 'INPUT' || clickedElement.tagName == 'TEXTAREA'))
            insertAtCaret(request.topaste);
	}
});


window.addEventListener('contextmenu', function(event) {
	clickedElement = event.target;
}, false);


function insertAtCaret(text) {
    var txtarea = clickedElement;
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    
    strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 

    txtarea.value=front+text+back;

    strPos = strPos + text.length;
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
}