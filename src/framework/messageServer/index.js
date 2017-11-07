const ipcMain = require('electron').ipcMain;

export const start = () => {
	ipcMain.on('message', (event, data) => {
		console.log('xxxxxxxxxx', event, data);
		event.sender.send('message', {
			data: 456
		});
	})
	console.log('messageServer started');
}
