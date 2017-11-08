const remote = require('electron').remote

const {
	isMessageServerStarted,
	getMessageChannel
} = require('./../server/index.js');

module.exports = {
	createMaster,
};

// export const start = () => {
// 	const ipcRenderer = require('electron').ipcRenderer;
//
// 	ipcRenderer.on('message', (event, data) => {
// 		console.log('xxxxxxxxxx', event, data);
// 		event.sender.send('message', {
// 			data: 456
// 		});
// 	})
// 	console.log('messageServer started');
// }


function createMaster(key) {
	if(!isMessageServerStarted()) {
		console.error('should start message server at first');
	}
	console.log('create messager master:', key);
}
