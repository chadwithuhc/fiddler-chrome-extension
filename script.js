/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request,
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

const template = `
	<button class="no-sidebar">Toggle Sidebar</button>
	<div class="no-panel">
		<button data-panel="html">Toggle HTML Panel</button>
		<button data-panel="css">Toggle CSS Panel</button>
		<br />
		<button data-panel="js">Toggle Javascript Panel</button>
		<button data-panel="result">Toggle Result Panel</button>
	</div>
`

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
function toggleSidebar() {
	if(sidebarOpen) {
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		sidebarOpen = false;
	}
	else {
		var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
		sidebar.innerHTML = template
		sidebar.style.cssText = "\
			position:fixed;\
			bottom:0px;\
			left:0px;\
			width:100%;\
			height:20%;\
			background:white;\
			box-shadow:inset 0 0 0.2em black;\
			z-index:999999;\
		";
		document.body.appendChild(sidebar);
		sidebarOpen = true;
	}

	setupListeners(sidebar)
}

function setupListeners(container) {
	container.querySelector('.no-sidebar').addEventListener('click', Fiddler.toggleSidebar)
	container.querySelector('.no-panel').addEventListener('click', Fiddler.togglePanel)
}

const Fiddler = {

	toggleSidebar() {
		document.body.classList.toggle('fiddler--no-sidebar')
	},

	togglePanel(e) {
		const panel = e.target.dataset.panel

		if (panel) {
			document.body.classList.toggle(`fiddler--no-${panel}-panel`)
		}
	}

}
