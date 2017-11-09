const remote = require('electron').remote;

const {
	isMessageServerStarted,
	getMessageChannel
} = require('./../server/index.js');

module.exports = {
	createMaster,
	createClient
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
	checkServer();
	console.log('create messager master:', key);
	return {
		destroy: function () {
			console.log('destroy master:', key);
		}
	};
}

function createClient(key) {
	checkServer();
	console.log('create messager client:', key);
}

function checkServer() {
	if (!isMessageServerStarted()) {
		throw new Error('should start message server at first');
	}
}