var callback = null;
var theObject = [];
var theMenuArray = [];

function react(info, tab) {
	if(typeof theMenuArray[info.menuItemId] != 'undefined') {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         var tabId = tabs[0].id;
         chrome.tabs.sendMessage(tabId, {'funktion': 'paste', 'topaste': theObject[theMenuArray[info.menuItemId]].content});
      });
	} else {
		chrome.tabs.create({url:"options.html"});
	}
}

var parentMenu = null;
createMenu();
console.log(localStorage);

function createMenu() {
	parentMenu = chrome.contextMenus.create({"title": "Paste Email", "contexts": ["editable"]});

	if(typeof localStorage['paste_email2'] != 'undefined') {
		theObject = JSON.parse(localStorage['paste_email2']);
		for(var i=0; i<theObject.length; i++) {
			var theSubMenu = chrome.contextMenus.create({"title": theObject[i].entry, "parentId" : parentMenu, "contexts": ["editable"], "onclick": react});
			// store index of EmailArray for menu position
			theMenuArray[theSubMenu] = i;
		}
		chrome.contextMenus.create({"type": "separator", "parentId": parentMenu, "contexts": ["editable"]});
	}
	chrome.contextMenus.create({"title": "Options", "parentId": parentMenu, "contexts": ["editable"], "onclick": react});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.funktion == 'resetMenu') {
      chrome.contextMenus.removeAll();
      createMenu();
	}
});
