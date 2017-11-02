const path = require('path');

let baiduWindow = null;
let webContents = null;

const loginUrl = 'https://passport.baidu.com/v2/?login';
const preJs = './bower_components/jquery/dist/jquery.js';

export const init = () => {
	$('#open').click(openHandler);
};

// return void(0);

function openHandler() {
	baiduWindow = createWindow();
	webContents = baiduWindow.webContents;

	webContents.on('did-finish-load', login);

	webContents.loadURL(loginUrl);
	webContents.openDevTools();

	// baiduWindow = open(loginUrl);
}

function createWindow() {
	const remote = require('electron').remote;
	const BrowserWindow = remote.BrowserWindow;
	return new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: 'file://' + path.join(__dirname, preJs)
		}
	});
};

function login() {
	console.log('did-finish-load');
}
