;
(function (win) {
	const log = win.log = console.log;

	const {
		ipcRenderer,
		remote
	} = require('electron');

	const BrowserWindow = remote.BrowserWindow;

	const jqueryUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
	// const jqueryUrl = 'http://localhost:8080/app/bower_components/jquery/dist/jquery.js';

	const loginUrl = 'https://passport.baidu.com/v2/?login';


	let parent = null;
	let currentId = null;

	const responseHandlers = mapHandlers();

	const initPromise = init();

	return void(0);

	function init() {
		ipcRenderer.on('response', responseHandler);

		return Promise.resolve()
			.then(loadJQuery);
	}

	function backLog() {
		Log = log;
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

		request({
			action: 'validate',
			data: $('#TANGRAM__PSP_3__verifyCodeImg').attr('src'),
		});
	}

	function request(option) {
		option.contentsId = currentId;
		parent.send('request', option);
	}

	function responseHandler(event, response) {
		log('response:', arguments);
		const action = response.action;
		const handler = responseHandlers[action];

		if (!handler) {
			console.error(`there no handler for: ${action}`);
			return;
		}

		handler(response.result);
	}

	function mapHandlers() {
		return {
			invite,
			close,
			validate,
		};
	}

	function invite(invite) {
		log('invite:', arguments);
		parent = BrowserWindow.fromId(invite.parentId).webContents;
		currentId = remote.getCurrentWebContents().id;

		initPromise
			.then(backLog)
			.then(() => {
				if (location.href.indexOf(loginUrl) === 0) {
					login();
				}
			});
	}

	function close(data) {
		log('close:', arguments);
		window.close();
		parent = null;
	}

	function validate(data) {
		log('validate:', arguments);
		$('#TANGRAM__PSP_3__verifyCode').val(data);
		$('#TANGRAM__PSP_3__submit').click();
	}

})(window);