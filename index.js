'use strict';
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
var config_1 = require("./helpers/config");
var interface_1 = require("./interface");
var functions_1 = require("./helpers/functions");
(0, functions_1.setFileName)("Output/Output_".concat(new Date().toLocaleString('fr-CA')).replace(/ /g, "_"));
// Define the class we will use to trade with.
var trader = new interface_1["default"](config_1["default"].trader_type);
// Set the loop to do the trading after each interval.
var loop = setInterval(run, config_1["default"].minutes_interval_loop * 60 * 1000);
// Initialise other variables
var PRINT_PRICE = false;
// @ts-ignore
var PROCESS = process;
// Handling Arguments
if (PROCESS.argv[2] != null && PROCESS.argv[2] === "reset") {
    (0, functions_1.print)("Resetting...");
    trader.status.set("open");
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, main()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("\u274C ".concat(error_1.stack || JSON.stringify(error_1, null, 2)));
                    clearInterval(loop);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Run the first instance.
run();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var bot_status, usd_to_btc_price, time, _a, next_step;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bot_status = trader.status.get();
                    return [4 /*yield*/, trader.trader.getBTCPrice()];
                case 1:
                    usd_to_btc_price = _b.sent();
                    if (PRINT_PRICE) {
                        time = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
                        PROCESS.stdout.write(new TextEncoder().encode("[".concat(time, "] BTC Price: ").concat(usd_to_btc_price, "\r")));
                    }
                    PRINT_PRICE = false;
                    _a = bot_status;
                    switch (_a) {
                        case "open": return [3 /*break*/, 2];
                        case "bought": return [3 /*break*/, 5];
                        case "on_hold": return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 2: // Can buy (happens at start, after a sell or after a freeze).
                return [4 /*yield*/, trader.resetBot()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, trader.trade.buy()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, trader.getNextStep()];
                case 6:
                    next_step = _b.sent();
                    switch (next_step) {
                        case 'buy':
                            trader.trade.buy();
                            break;
                        case 'sell':
                            trader.trade.sell();
                            break;
                        case 'nothing':
                            PRINT_PRICE = true;
                            break;
                        default: throw new Error("Unknown 'Next Step' found: ".concat(next_step, "."));
                    }
                    return [3 /*break*/, 9];
                case 7:
                    // TODO: This will be implemented in later versions.
                    clearInterval(loop);
                    return [3 /*break*/, 9];
                case 8: throw new Error("Unknown 'Status' found: ".concat(bot_status, "."));
                case 9: return [2 /*return*/];
            }
        });
    });
}
