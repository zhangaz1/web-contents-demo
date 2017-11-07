;
(function(win) {
	// var jqueryUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
	var jqueryUrl = 'http://localhost:8080/app/bower_components/jquery/dist/jquery.js';

	var log = win.log = console.log;

	Promise.resolve()
		.then(backLog)
		.then(sendMessage)
		.then(loadJQuery)
		.then(login);

	return void(0);

	function backLog() {
		console.Log = log;
	}

	function sendMessage() {
		const ipcRenderer = require('electron').ipcRenderer;

		ipcRenderer.on('message', (event, data) => {
			log('got message', data);
		});

		ipcRenderer.send('message', {
			data: 123
		});
	}

	function loadJQuery() {
		var resolvePromise;
		var promise = new Promise(function(resolve, reject) {
			resolvePromise = resolve;
		});

		var script = document.createElement('script');
		script.src = jqueryUrl;
		script.onload = checkJQuery;

		win.onload = () => {
			document.body.appendChild(script);
		};

		return promise;

		function checkJQuery() {
			log('load jquery ready');
			resolvePromise();
		}
	}

	function login() {
		$('#TANGRAM__PSP_3__userName').val('zhangaz_temp');
		$('#TANGRAM__PSP_3__password').val('abc123456');

		$('#TANGRAM__PSP_3__verifyCode').val('abc');
		// $('#TANGRAM__PSP_3__submit').click();
	}
})(window);
