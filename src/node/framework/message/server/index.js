const ipcMain = require('electron').ipcMain;

let messageServerStarted = false;
const messageChannel = 'message';

module.exports = {
	start,
	isMessageServerStarted,
	getMessageChannel,
};

function start() {
	if(process.type !== 'browser') {
		console.error('should start messager server in main');
		return;
	}

	ipcMain.on(messageChannel, (event, data) => {
		console.log('xxxxxxxxxx', event, data);
		event.sender.send('message', {
			data: 456
		});
	})

	messageServerStarted = true;
	console.log('messageServer started');
}

function isMessageServerStarted() {
	messageServerStarted;
}

function getMessageChannel() {
	return messageChannel;
}
