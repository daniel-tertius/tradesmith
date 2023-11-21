const WebSocket = require('ws'); // If you're running this code in a Node.js environment
// If you're working in a browser environment, you can use the WebSocket API directly


export default class LunoTrader {
    async setupSocket() {
        try {
            const ws = new WebSocket('wss://ws.luno.com/api/1/stream/XBTZAR');

            ws.on('Create', () => {
                console.log('Create to the WebSocket server.');
            });

            ws.on('create', () => {
                console.log('create to the WebSocket server.');
            });

            ws.on('Delete', () => {
                console.log('Delete to the WebSocket server.');
            });

            ws.on('delete', () => {
                console.log('delete to the WebSocket server.');
            });

            ws.on('Trade', () => {
                console.log('Trade to the WebSocket server.');
            });

            ws.on('trade', () => {
                console.log('trade to the WebSocket server.');
            });

            ws.on('Status', () => {
                console.log('Status to the WebSocket server.');
            });

            ws.on('status', () => {
                console.log('status to the WebSocket server.');
            });
        } catch (error: any) {
            console.log(error.stack ?? JSON.stringify(error))
        }
    }
}