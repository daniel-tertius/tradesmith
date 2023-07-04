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
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({ path: "../.env" });
var axios_1 = require("axios");
var LunoTrader = /** @class */ (function () {
    function LunoTrader(key, secret) {
        this.keyAndSecret = "".concat(key, ":").concat(secret);
    }
    LunoTrader.prototype.queryZARBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, response, zarBalance, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                Authorization: "Basic ".concat(Buffer.from(this.keyAndSecret).toString('base64'))
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(process.env.LUNO_BALANCE_URL, config)];
                    case 2:
                        response = _a.sent();
                        zarBalance = response.data.balance.find(function (balance) { return balance.asset === 'ZAR'; });
                        return [2 /*return*/, zarBalance ? zarBalance.balance : NaN];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Failed to fetch ZAR balance:', error_1.message);
                        return [2 /*return*/, NaN];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LunoTrader.prototype.queryBTCBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, response, btcBalance, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                                Authorization: "Basic ".concat(Buffer.from(this.keyAndSecret).toString('base64'))
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(process.env.LUNO_BALANCE_URL, config)];
                    case 2:
                        response = _a.sent();
                        btcBalance = response.data.balance.find(function (balance) { return balance.asset === 'XBT'; });
                        return [2 /*return*/, btcBalance ? btcBalance.balance : 0];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Failed to fetch BTC balance:', error_2.message);
                        return [2 /*return*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LunoTrader.prototype.getLastPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var luno_url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        luno_url = process.env.LUNO_GET_PRICE_URL;
                        if (luno_url == null)
                            throw Error("Could not find the LUNO API URL.");
                        return [4 /*yield*/, fetch(luno_url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.last_trade];
                }
            });
        });
    };
    LunoTrader.prototype.getBuyPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var luno_url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        luno_url = process.env.LUNO_GET_PRICE_URL;
                        if (luno_url == null)
                            throw Error("Could not find the LUNO API URL.");
                        return [4 /*yield*/, fetch(luno_url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.ask + 1];
                }
            });
        });
    };
    LunoTrader.prototype.getSellPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var luno_url, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        luno_url = process.env.LUNO_GET_PRICE_URL;
                        if (luno_url == null)
                            throw Error("Could not find the LUNO API URL.");
                        return [4 /*yield*/, fetch(luno_url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.bid - 1];
                }
            });
        });
    };
    LunoTrader.prototype.buyBTC = function (btcBuyAmount, btcPrice) {
        return __awaiter(this, void 0, void 0, function () {
            var zarNeeded, zarBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zarNeeded = btcBuyAmount * btcPrice;
                        return [4 /*yield*/, this.queryZARBalance()];
                    case 1:
                        zarBalance = _a.sent();
                        if (zarNeeded > zarBalance) {
                            throw Error("Your ZAR Balance (".concat(zarBalance, ") is too low to buy ").concat(btcBuyAmount, " at R ").concat(btcPrice.toFixed(0), " per BTC."));
                        }
                        return [4 /*yield*/, trade("BID", btcPrice, btcBuyAmount)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LunoTrader.prototype.sellBTC = function (btcSellAmount, btcPrice) {
        return __awaiter(this, void 0, void 0, function () {
            var btcBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryBTCBalance()];
                    case 1:
                        btcBalance = _a.sent();
                        if (btcSellAmount > btcBalance) {
                            throw Error("Your BTC Balance (".concat(btcBalance, ") is too low to sell ").concat(btcSellAmount, "."));
                        }
                        return [4 /*yield*/, trade('ASK', btcPrice, btcSellAmount)];
                    case 2:
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
function trade(type, btcPrice, btcAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var typeConvert, response, success;
        return __generator(this, function (_a) {
            typeConvert = { ASK: "Selling", BID: "Buying" };
            console.log("\uD83D\uDCC8 ".concat(typeConvert[type], " ").concat(btcAmount, " BTC at R ").concat(btcPrice.toFixed(0), " per BTC."));
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
              "volume": btcAmount.toString(),
              "price": btcPrice.toString()
            })
          });*/;
            success = response.status.toString().startsWith("2");
            console.log(success ? "Success :)" : "Failed :(");
            return [2 /*return*/, { success: success }];
        });
    });
}
