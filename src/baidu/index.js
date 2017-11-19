const remote = require('electron').remote;
const path = remote.require('path');
const BrowserWindow = remote.BrowserWindow;

const roomManager = remote.require('master-room');

const preloadJs = path.join(__dirname, './../src/baidu/preload.js');
const loginUrl = 'https://passport.baidu.com/v2/?login';

const roomName = 'baidu';
let room = createNewRoom();

let baiduWindow = null;
let webContents = null;

export const init = () => {
	$('#open').click(openHandler);
	$('#close').click(closeRoom);
};

// return void(0);

function openHandler() {
	baiduWindow = createWindow();
	webContents = baiduWindow.webContents;

	webContents.on('did-finish-load', loadHandler);
	webContents.on('close', subPageClose);

	webContents.openDevTools();
	webContents.loadURL(loginUrl);
}

function loadHandler() {
	// baiduWindow.send('message', {
	// 	data: 'xyz'
	// });
}

function subPageClose() {

}

function closeRoom() {
	room = createNewRoom()
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

function createNewRoom() {
	const oldRoom = roomManager.getRoom(roomName);
	if (oldRoom) {
		oldRoom.close()
	}

	const newRoom = roomManager.createRoom(roomName, {
		validate,
	});

	return newRoom;
}

function validate(data) {
	return data;
}