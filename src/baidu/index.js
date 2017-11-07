const path = require('path');

let baiduWindow = null;
let webContents = null;

const loginUrl = 'https://passport.baidu.com/v2/?login';

// const preJs = 'bower_components/jquery/dist/jquery.js';
// const jqueryPath = ['file://', __dirname, preJs].join('/');
const jqueryPath = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
// const jqueryPath = 'https://10.10.0.20:8080/app/bower_components/jquery/dist/jquery.js';

export const init = () => {
	$('#open').click(openHandler);
};

// return void(0);

function openHandler() {
	baiduWindow = createWindow();
	webContents = baiduWindow.webContents;

	webContents.openDevTools();

	webContents.on('did-finish-load', login);
	webContents.loadURL(loginUrl);

	// baiduWindow = open(loginUrl);
}

function createWindow() {
	const remote = require('electron').remote;
	const BrowserWindow = remote.BrowserWindow;
	return new BrowserWindow({
		width: 800,
		height: 600,
	});
};

function login() {
	return Promise.resolve()
		.then(() => webContents.executeJavaScript(replaceModule()))
		.then(() => webContents.executeJavaScript(loadJQuery(), true))
		.then(result => console.log(result))
		.then(() => webContents.executeJavaScript(rollbackModule()))
		.then(() => webContents.executeJavaScript(registerMessage()))
		.then(() => webContents.executeJavaScript(loginCode()));
}

function loginCode() {
	return `
		$('#TANGRAM__PSP_3__userName').val('zhangaz_temp');
		$('#TANGRAM__PSP_3__password').val('abc123456');

		$('#TANGRAM__PSP_3__verifyCode').val('abc');
		// $('#TANGRAM__PSP_3__submit').click();
	`;
}

function replaceModule() {
	return `
        window.module = module;
        module = undefined;
	`;
}

function rollbackModule() {
	return `
        module = window.module;
	`;
}

function loadJQuery() {
	return addScript(initScriptBySrc(jqueryPath));
}

function registerMessage() {
	const code = `
		const ipcRenderer = require('electron').ipcRenderer;

		ipcRenderer.on('message', (event, data) => {
			console.log(JSON.stringify(data), 'yyyyyyyyyyy');
		});

		ipcRenderer.send('message', {
			data: 123
		});
	`;

	return addScript(initScriptByCode(code));
}

function addScript(initScript) {
	return `
		var script = document.createElement('script');
		${initScript}
		script.onload = function() {
			console.log(\`${replaceQuotationMarks(initScript)}\`, 'load script: ');
		};
		document.body.appendChild(script);
	`;
}

function initScriptBySrc(src) {
	return `script.src = \`${replaceQuotationMarks(src)}\``;
}

function initScriptByCode(code) {
	return `script.innerHTML = \`${replaceQuotationMarks(code)}\``;
}

function replaceQuotationMarks(str) {
	return str.replace(/(["'`])/g, `\\$1`)
}
