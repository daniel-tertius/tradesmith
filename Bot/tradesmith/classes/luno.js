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
require('dotenv').config();
var axios_1 = require("axios");
var LunoTrader = /** @class */ (function () {
    function LunoTrader() {
        this.queryBalances();
    }
    LunoTrader.prototype.setZAR = function (zar_amount) {
        this.zar_amount = zar_amount;
    };
    LunoTrader.prototype.setBTC = function (btc_amount) {
        this.btc_amount = btc_amount;
    };
    LunoTrader.prototype.getZAR = function () {
        return this.zar_amount;
    };
    LunoTrader.prototype.getBTC = function () {
        return this.btc_amount;
    };
    LunoTrader.prototype.queryBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, response, new_btc_amount, new_zar_amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.luno.com/api/1/balance";
                        options = {
                            headers: {
                                "Accept": 'application/json',
                                "Accept-Charset": 'utf-8',
                                "Authorization": "Basic ".concat(btoa(process.env.LUNO_API_KEY + ':' + process.env.LUNO_API_SECRET)),
                                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                            }
                        };
                        return [4 /*yield*/, axios_1["default"].get(url, options)];
                    case 1:
                        response = _a.sent();
                        new_btc_amount = response.data.balance.find(function (balance) { return balance.asset === "XBT"; }).balance;
                        new_zar_amount = response.data.balance.find(function (balance) { return balance.asset === "ZAR"; }).balance;
                        this.btc_amount = new_btc_amount;
                        this.zar_amount = new_zar_amount;
                        return [2 /*return*/];
                }
            });
        });
    };
    LunoTrader.prototype.getBTCPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.luno.com/api/1/tickers";
                        return [4 /*yield*/, axios_1["default"].get(url)];
                    case 1:
                        response = _a.sent();
                        info = response.data.tickers.find(function (info) { return info.pair === "XBTZAR"; });
                        return [2 /*return*/, info.ask];
                }
            });
        });
    };
    LunoTrader.prototype.getBTCAskPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.luno.com/api/1/tickers";
                        return [4 /*yield*/, axios_1["default"].get(url)];
                    case 1:
                        response = _a.sent();
                        info = response.data.tickers.find(function (info) { return info.pair === "XBTZAR"; });
                        return [2 /*return*/, (+info.ask + 1).toString()];
                }
            });
        });
    };
    LunoTrader.prototype.getBTCBidPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.luno.com/api/1/tickers";
                        return [4 /*yield*/, axios_1["default"].get(url)];
                    case 1:
                        response = _a.sent();
                        info = response.data.tickers.find(function (info) { return info.pair === "XBTZAR"; });
                        return [2 /*return*/, (+info.bid - 1).toString()];
                }
            });
        });
    };
    LunoTrader.prototype.buyBTC = function (btc_buy_amount) {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBTCAskPrice()];
                    case 1:
                        btc_price = +(_a.sent());
                        if (btc_buy_amount * btc_price > this.zar_amount) {
                            throw Error("Not enough ZAR funds.");
                        }
                        console.log("\uD83D\uDCC8 Buying ".concat(btc_buy_amount, " BTC at ").concat(btc_price.toFixed(0), " ZAR/BTC."));
                        return [4 /*yield*/, trade("BID", btc_price, btc_buy_amount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.queryBalances()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LunoTrader.prototype.sellBTC = function (btc_sell_amount) {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBTCBidPrice()];
                    case 1:
                        btc_price = +(_a.sent());
                        if (btc_sell_amount > this.btc_amount) {
                            throw Error("Not enough BTC funds.");
                        }
                        console.log("\uD83D\uDCC8 Selling ".concat(btc_sell_amount, " BTC at ").concat(btc_price.toFixed(0), " ZAR/BTC."));
                        return [4 /*yield*/, trade('ASK', btc_price, btc_sell_amount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.queryBalances()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LunoTrader;
}());
exports["default"] = LunoTrader;
var jsonToURLEncodedForm = function (json) {
    if (json === void 0) { json = {}; }
    return Object.keys(json).map(function (key) { return "".concat(key, "=").concat(json[key]); }).join('&');
};
function trade(type, btc_price, btc_amount) {
    return __awaiter(this, void 0, void 0, function () {
        var response, success;
        return __generator(this, function (_a) {
            response = { status: 200 } /*await axios({
              method: "post",
              url: "https://api.luno.com/api/1/postorder",
              auth: {
                username: process.env.LUNO_API_KEY as string,
                password: process.env.LUNO_API_SECRET as string
              },
              data: jsonToURLEncodedForm({
                "pair": "XBTZAR",
                "type": type,
                "volume": btc_amount.toString(),
                "price": btc_price.toString()
              })
            });*/;
            success = response.status.toString().startsWith("2");
            console.log(success ? "Success :)" : "Failed :(");
            return [2 /*return*/, { success: success }];
        });
    });
}
