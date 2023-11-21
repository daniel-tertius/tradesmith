import WebSocket from 'ws';
// import LunoTrader from "./LunoTrader";

export default class TradeSmith {
    readonly ws = new WebSocket('wss://ws.luno.com/api/1/stream/XBTZAR');
    readonly key: string;
    readonly secret: string;

    constructor(options: { secret: string, key: string }) {
        console.log("options", JSON.stringify(options, null, 2))
        this.secret = options.secret;
        this.key = options.key;
    }

    async start() {
        const keepAliveInterval = setInterval(() => {
            this.ws.send(''); // Sending an empty message as a keep-alive
        }, 30000);

        this.ws.on('open', () => {
            console.log('Connected to the WebSocket server.');

            // Send API key credentials as a JSON message
            const credentials = {
                api_key_id: this.key,
                api_key_secret: this.secret,
            };
            console.log("credentials", JSON.stringify(credentials, null, 2))
            try {
                this.ws.send(JSON.stringify(credentials));
            } catch (error: any) {
                console.error("ERROR:", error.message ?? JSON.stringify(error, null, 2))
            }
        });

        // Event handler for incoming WebSocket messages
        this.ws.on('message', (data) => {
            console.log('Received message: ' + data);
            // Process the received data, including handling keep-alive messages if necessary.
        });

        // Event handler when the WebSocket connection is closed
        this.ws.on('close', (code, reason) => {
            console.log(`Connection closed with code ${code} and reason: ${reason}`);
            clearInterval(keepAliveInterval); // Clear the keep-alive interval when the connection is closed.
        });

        // Event handler for WebSocket errors
        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    stop() {

    }
}


// // If you're working in a browser environment, you can use the WebSocket API directly

// const keepAliveInterval = setInterval(() => {
//     ws.send(''); // Sending an empty message as a keep-alive
// }, 3000); // Send every 30 seconds (adjust the interval as needed)

// ws.on('open', () => {
//     console.log('Connected to the WebSocket server.');

//     // Send API key credentials as a JSON message
//     const credentials = {
//         api_key_id: LUNO_API_KEY,
//         api_key_secret: LUNO_API_SECRET,
//     };
//     ws.send(JSON.stringify(credentials));
// });

// ws.on('Create', () => {
//     console.log('Create to the WebSocket server.');
// });

// ws.on('create', () => {
//     console.log('create to the WebSocket server.');
// });

// ws.on('Delete', () => {
//     console.log('Delete to the WebSocket server.');
// });

// ws.on('delete', () => {
//     console.log('delete to the WebSocket server.');
// });

// ws.on('Trade', () => {
//     console.log('Trade to the WebSocket server.');
// });

// ws.on('trade', () => {
//     console.log('trade to the WebSocket server.');
// });

// ws.on('Status', () => {
//     console.log('Status to the WebSocket server.');
// });

// ws.on('status', () => {
//     console.log('status to the WebSocket server.');
// });
