;
(function (win) {
	const remote = require('electron').remote;
	const roomManager = remote.require('master-room');

	let room = null;

	joinRoom();

	const jqueryUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
	// const jqueryUrl = 'http://localhost:8080/app/bower_components/jquery/dist/jquery.js';

	const log = win.log = console.log;

	Promise.resolve()
		.then(backLog)
		.then(loadJQuery)
		.then(login);

	return void(0);

	function backLog() {
		console.Log = log;
	}

	function loadJQuery() {
		let resolvePromise;
		const promise = new Promise(function (resolve, reject) {
			resolvePromise = resolve;
		});

		const script = document.createElement('script');
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

		room.callMaster({
				action: 'validate',
				data: 'abc',
			})
			.then(data => {
				$('#TANGRAM__PSP_3__verifyCode').val('abc');
				$('#TANGRAM__PSP_3__submit').click();
			})
			.catch(() => {
				alert('validate failed');
			});
	}

	function joinRoom() {
		room = roomManager.getRoom('baidu');
		room.join({
			onClose: () => {
				window.close();
				room = null;
			}
		});
	}
})(window);