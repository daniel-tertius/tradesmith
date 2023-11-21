"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ws_1 = require("ws");
// import LunoTrader from "./LunoTrader";
var TradeSmith = /** @class */ (function () {
    function TradeSmith(options) {
        this.ws = new ws_1["default"]('wss://ws.luno.com/api/1/stream/XBTZAR');
        this.secret = options.secret;
        this.key = options.key;
    }
    TradeSmith.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keepAliveInterval;
            var _this = this;
            return __generator(this, function (_a) {
                keepAliveInterval = setInterval(function () {
                    _this.ws.send(''); // Sending an empty message as a keep-alive
                }, 3000);
                this.ws.on('open', function () {
                    console.log('Connected to the WebSocket server.');
                    // Send API key credentials as a JSON message
                    var credentials = {
                        api_key_id: _this.key,
                        api_key_secret: _this.secret
                    };
                    _this.ws.send(JSON.stringify(credentials));
                });
                return [2 /*return*/];
            });
        });
    };
    TradeSmith.prototype.stop = function () {
    };
    return TradeSmith;
}());
exports["default"] = TradeSmith;
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
