var probability = 0;

chrome.tabs.onCreated.addListener( function(tab) {
	currentTabId = tab.id;
	if (Math.floor((Math.random()*10)+1) <= probability) {
		chrome.windows.getAll({populate:true}, function(windowList) {
			for (var i = 0; i < windowList.length; i++) {
				for (var j = 0; j < windowList[i].tabs.length; j++) {
					tabId = windowList[i].tabs[j].id
					if (tabId != currentTabId) {
						try {
    						chrome.tabs.remove(tabId, function() {
      							appendToLog('tab: ' + tabId + ' removed.');
    						});
  						} catch (e) {
  							alert(e);
  						}
					}
				}
			}
		});
		probability = 0; 
	}
	probability = (probability + 1) % 10;
});

chrome.tabs.onRemoved.addListener( function(tab) {
	if (probability > 0) {
		probability--;
	}
});
