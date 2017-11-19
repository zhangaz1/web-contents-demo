const {
	ipcRenderer,
	remote
} = require('electron');


const path = remote.require('path');
const BrowserWindow = remote.BrowserWindow;

const preloadJs = path.join(__dirname, './../src/baidu/preload.js');
const loginUrl = 'https://passport.baidu.com/v2/?login';

const currentId = remote.getCurrentWebContents().id;

const subPages = new Map();

const requestHandlers = mapHandlers();

export const init = () => {
	ipcRenderer.on('request', requestHandler);

	$('#open').click(openHandler);
	$('#close').click(closeAllSubPage);
};

// return void(0);

function openHandler() {
	const baiduWindow = createWindow();
	const webContents = baiduWindow.webContents;

	subPages.set(webContents.id, webContents);

	webContents.on('did-finish-load', loadHandler);
	const contentsId = webContents.id;
	webContents.on('close', () => subPages.delete(contentsId));

	webContents.openDevTools();
	webContents.loadURL(loginUrl);
}

function loadHandler(event) {
	invite(event.sender.webContents);
}

function closeAllSubPage() {
	for (let contents of subPages.values()) {
		close(contents);
	}
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

function invite(webContents) {
	response({
		contentsId: webContents.id,
		action: 'invite',
		result: {
			parentId: currentId,
		},
	});
}

function close(webContents) {
	response({
		contentsId: webContents.id,
		action: 'close',
	});
}

function requestHandler(events, request) {
	console.log('request:', arguments);
	const action = request.action;
	const handler = requestHandlers[action];

	if (!handler) {
		console.error(`there no handler for: ${action}`);
		return;
	}

	handler(request);
}

function mapHandlers() {
	return {
		validate,
	};
}

function validate(request) {
	const validateImg = request.data;
	console.log('validate:', validateImg);

	const validateEl = $(`
		<p>
			<img src="${validateImg}">
			<input type="text">
			<button>验证</button>
		</p>
	`);

	$('button', validateEl).click(() => {
		request.result = $('input', validateEl).val();
		response(request);
		validateEl.remove();
	});

	$('#validates').append(validateEl);
}

function response(option) {
	const contents = subPages.get(option.contentsId);
	contents.send('response', option);
}