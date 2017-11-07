const ipcMain = require('electron').ipcMain;

let messageServerStarted = false;
const messageChannel = 'message';

export const start = () => {
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

	global.messageServerStarted = messageServerStarted = true;
	console.log('messageServer started', messageServerStarted, global.messageServerStarted);
}

export const isMessageServerStarted = () => messageServerStarted;
export const getMessageChannel = () => messageChannel;
