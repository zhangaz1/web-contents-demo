const ipcRenderer = require('electron').ipcRenderer;

export const start = () => {
	ipcRenderer.on('message', (event, data) => {
		console.log('xxxxxxxxxx', event, data);
		event.sender.send('message', {
			data: 456
		});
	})
	console.log('messageServer started');
}
