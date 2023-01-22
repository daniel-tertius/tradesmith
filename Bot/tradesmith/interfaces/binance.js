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
var connector_1 = require("@binance/connector");
var config_js_1 = require("../helpers/config.js");
/* USD to BTC */
var running_data = {
    buy_price: null,
    sell_price: null
};
var DEBUG = true;
var BinanceTrader = /** @class */ (function () {
    function BinanceTrader() {
        try {
            this.client = new connector_1.Spot(config_js_1["default"].api.binance.key, config_js_1["default"].api.binance.secret);
        }
        catch (error) {
            throw new Error("Could not create a Spot class. Please check your internet connection or your API key & API Secret.");
        }
    }
    BinanceTrader.prototype.queryBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     */
    BinanceTrader.prototype.getBTCPrice = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (DEBUG)
                            return [2 /*return*/, "100000"];
                        return [4 /*yield*/, this.client.avgPrice("BTCUSDT")];
                    case 1:
                        response = _b.sent();
                        price = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.price;
                        if (price == null) {
                            throw new Error("Could not fetch price. Received:" + JSON.stringify({ status: response.status, data: JSON.stringify(response.data) }, null, 2));
                        }
                        return [2 /*return*/, price];
                }
            });
        });
    };
    BinanceTrader.prototype.buyBTC = function (usd_buy_amount) {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBTCPrice()];
                    case 1:
                        btc_price = _a.sent();
                        if (!!DEBUG) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.newOrder('BTCUSDT', 'BUY', 'LIMIT', {
                                price: btc_price,
                                quantity: usd_buy_amount,
                                timeInForce: 'GTC'
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        response = { status: 200 };
                        _a.label = 4;
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    BinanceTrader.prototype.sellBTC = function (usd_sell_amount) {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBTCPrice()];
                    case 1:
                        btc_price = _a.sent();
                        if (!!DEBUG) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.client.newOrder('BTCUSDT', 'SELL', 'LIMIT', {
                                price: btc_price,
                                quantity: usd_sell_amount,
                                timeInForce: 'GTC'
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        response = { status: 200 };
                        _a.label = 4;
                    case 4: return [2 /*return*/, response];
                }
            });
        });
    };
    return BinanceTrader;
}());
exports["default"] = BinanceTrader;
