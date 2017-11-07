import {
	isMessageServerStarted,
	getMessageChannel
} from './../server/index.js';

import remote from 'electron';

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


export function createMaster(key) {
	console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', remote.setGlobal('messageServerStarted', true));
	if(!isMessageServerStarted()) {
		console.error('should start message server at first');
	}
	console.log('create messager master:', key);
}
