const path = require('path');

let baiduWindow = null;
let webContents = null;

const preloadJs = 'D:/Workspace/MyGit/MyProjects/web-contents-demo/app/preload.js';

const loginUrl = 'https://passport.baidu.com/v2/?login';
// const loginUrl = 'https://passport.cnblogs.com/user/signin';

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

	webContents.loadURL(loginUrl);
}

function createWindow() {
	const remote = require('electron').remote;
	const BrowserWindow = remote.BrowserWindow;
	return new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadJs,
			nodeIntegration: false
		}
	});
};
