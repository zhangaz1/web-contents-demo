const path = require('path'); // ???

const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;


const {
	createMaster
} = remote.require('./node/framework/message/client/index.js');

const preloadJs = path.join(__dirname, './../src/baidu/preload.js');
const loginUrl = 'https://passport.baidu.com/v2/?login';

let baiduWindow = null;
let webContents = null;
let messageMaster = null;

export const init = () => {
	$('#open').click(openHandler);
};

// return void(0);

function openHandler() {
	messageMaster = createMaster('baidu');
	baiduWindow = createWindow();
	webContents = baiduWindow.webContents;

	webContents.on('did-finish-load', () => {
		// baiduWindow.send('message', {
		// 	data: 'xyz'
		// });

	})

	webContents.openDevTools();
	webContents.loadURL(loginUrl);
}

function createWindow() {
	return new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: preloadJs,
			webSecurity: false,
			nodeIntegration: false
		}
	});
};
