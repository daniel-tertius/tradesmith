"use strict";
/**
 * This file does the directing between available interfaces and
 * some of the heavy lifting to simplify code in index file and
 * only keep api communication function in the interface files.
 */
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
var functions_1 = require("./helpers/functions");
var binance_js_1 = require("./interfaces/binance.js");
var luno_js_1 = require("./interfaces/luno.js");
var config_1 = require("./helpers/config");
//@ts-ignore
var fs_1 = require("fs");
var Interface = /** @class */ (function () {
    function Interface(interface_type) {
        var _this = this;
        this.status = {
            get: function () {
                var object = fetchSavedData();
                return object.status;
            },
            set: function (status) {
                var object = fetchSavedData();
                object.status = status;
                object.save(true /* is_silent */);
            },
            /**
             * The purpose of this function is to determine the status of
             * the bot (i.e. it's next step), without any prior info, so that it can be
             * started out of the blue (after two day of shut down or something) and still
             * get the correct status in case an old bid was sold (or cancelled by user).
             */
            update: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.status.set("bought");
                    return [2 /*return*/];
                });
            }); },
            isBought: function () {
                return _this.status.get() === "bought";
            }
        };
        this.trade = {
            buy: function () { return __awaiter(_this, void 0, void 0, function () {
                var no_of_buys_in_a_row, max_buys, amount_to_buy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            no_of_buys_in_a_row = this.info.buyCount();
                            max_buys = this.info.maxBuyCount();
                            if (!(no_of_buys_in_a_row >= max_buys)) return [3 /*break*/, 1];
                            this.status.set("on_hold");
                            (0, functions_1.print)("Set to 'On Hold' due to buying ".concat(no_of_buys_in_a_row, " times in a row."));
                            return [3 /*break*/, 4];
                        case 1:
                            amount_to_buy = this.info.buyAmount();
                            return [4 /*yield*/, this.trader.buyBTC(amount_to_buy)];
                        case 2:
                            _a.sent();
                            this.status.set("bought");
                            return [4 /*yield*/, this.setNextLimits()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
            sell: function () { return __awaiter(_this, void 0, void 0, function () {
                var amount_to_sell;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            amount_to_sell = this.info.sellAmount();
                            return [4 /*yield*/, this.trader.sellBTC(amount_to_sell)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.resetBot()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        };
        this.info = {
            sellAt: function () {
                var saved_data = fetchSavedData();
                return saved_data.sell_at;
            },
            buyAt: function () {
                var saved_data = fetchSavedData();
                return saved_data.buy_at;
            },
            buyCount: function () {
                var saved_data = fetchSavedData();
                return saved_data.buying_levels;
            },
            maxBuyCount: function () {
                return config_1["default"].max_buys;
            },
            sellAmount: function () {
                var saved_data = fetchSavedData();
                return +config_1["default"].btc_bid_amount * saved_data.buying_levels;
            },
            buyAmount: function () {
                var buy_amount = +config_1["default"].btc_bid_amount;
                var saved_data = fetchSavedData();
                if (saved_data.buying_levels === 0) {
                    return +(buy_amount * 1.1).toFixed(6);
                }
                return buy_amount;
            }
        };
        // For debugging...
        var object = fetchSavedData();
        (0, functions_1.print)("\u2022 Status: ".concat(object.status, "\n\u2022 Buys in a row: ").concat(object.buying_levels, "\n\u2022 Buy At: ").concat(object.buy_at, "\n\u2022 Sell At: ").concat(object.sell_at, "\n"));
        switch (interface_type) {
            case 'binance':
                this.trader = new binance_js_1["default"]();
                break;
            case 'luno':
                this.trader = new luno_js_1["default"]();
                break;
            default: throw new Error("Unknown Interface type ".concat(interface_type));
        }
    }
    /**
     * This function is only applicable for the "bought" status,
     * and checks whether the bot should buy or sell some BTC.
     *
     * If the Bot has bought 5 times before the Bot is put on hold status.
     */
    Interface.prototype.getNextStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price, btc_sell_value, btc_buy_value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.status.isBought()) {
                            return [2 /*return*/, "not_applicable"];
                        }
                        return [4 /*yield*/, this.trader.getBTCPrice()];
                    case 1:
                        btc_price = _a.sent();
                        btc_sell_value = this.info.sellAt();
                        if (+btc_price >= btc_sell_value) {
                            return [2 /*return*/, "sell"];
                        }
                        btc_buy_value = this.info.buyAt();
                        if (+btc_price <= btc_buy_value) {
                            return [2 /*return*/, "buy"];
                        }
                        return [2 /*return*/, "nothing"];
                }
            });
        });
    };
    Interface.prototype.resetBot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var btc_price, saved_data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trader.getBTCPrice()];
                    case 1:
                        btc_price = _a.sent();
                        saved_data = fetchSavedData();
                        saved_data.buying_levels = 0;
                        saved_data.status = "open";
                        saved_data.buy_at = +btc_price;
                        saved_data.sell_at = +btc_price;
                        saved_data.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interface.prototype.setNextLimits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var saved_data, sum, btc_price, n, buy_perc, sell_perc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saved_data = fetchSavedData();
                        sum = function (s) { return !!s ? Math.pow(buy_perc, -s) + sum(s - 1) : 1; };
                        return [4 /*yield*/, this.trader.getBTCPrice()];
                    case 1:
                        btc_price = +(_a.sent());
                        saved_data.buying_levels++;
                        n = saved_data.buying_levels + 1;
                        buy_perc = 1 - +config_1["default"].buy_percentage;
                        sell_perc = 1 + +config_1["default"].sell_percentage;
                        saved_data.buy_at = btc_price * buy_perc;
                        saved_data.sell_at = saved_data.buy_at * sell_perc * sum(n) / (n + 1);
                        saved_data.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Interface;
}());
exports["default"] = Interface;
function fetchSavedData() {
    var file_name = "./helpers/.saved_data.json";
    var raw_data = (0, fs_1.readFileSync)(file_name, 'utf8');
    // Remove unwanted characters from file.
    var data = raw_data.replace(/(\s|\/\*.*\*\/)/g, "");
    var object = JSON.parse(data);
    object.save = function (is_silent) {
        if (is_silent === void 0) { is_silent = false; }
        (0, fs_1.writeFileSync)("./helpers/.saved_data.json", JSON.stringify(this, null, 2), 'utf8');
        if (!is_silent) {
            (0, functions_1.print)("\u2022 Status: ".concat(object.status, "\n\u2022 Buys in a row: ").concat(object.buying_levels, "\n\u2022 Buy At: ").concat(object.buy_at, "\n\u2022 Sell At: ").concat(object.sell_at, "\n"));
        }
    };
    return object;
}
