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
var luno_1 = require("./luno");
var config_1 = require("../classes/config");
var Interface = /** @class */ (function () {
    function Interface() {
        var _this = this;
        this.execute = function () { return __awaiter(_this, void 0, void 0, function () {
            var bot_status, _a, next_step;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bot_status = this.status.get();
                        console.log(JSON.stringify(this.config, null, 2));
                        _a = bot_status;
                        switch (_a) {
                            case "open": return [3 /*break*/, 1];
                            case "bought": return [3 /*break*/, 4];
                            case "on_hold": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1: // Can buy (happens at start, after a sell or freeze).
                    return [4 /*yield*/, this.resetBot()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.trade.buy()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, this.getNextStep()];
                    case 5:
                        next_step = _b.sent();
                        switch (next_step) {
                            case 'buy':
                                this.trade.buy();
                                break;
                            case 'sell':
                                this.trade.sell();
                                break;
                            case 'nothing': break;
                            default: throw new Error("Unknown 'Next Step' found: ".concat(next_step, "."));
                        }
                        return [3 /*break*/, 8];
                    case 6: 
                    // TODO: This will be implemented in later versions.
                    throw "Wait for price to stabilize before trading..";
                    case 7: throw new Error("Unknown 'Status' found: ".concat(bot_status, "."));
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.end = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.config.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.status = {
            get: function () {
                return _this.config.status;
            },
            set: function (status) {
                _this.config.status = status;
                _this.config.save();
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
                return _this.config.sell_at;
            },
            buyAt: function () {
                return _this.config.buy_at;
            },
            buyCount: function () {
                return _this.config.buying_levels;
            },
            maxBuyCount: function () {
                return _this.config.max_buys;
            },
            sellAmount: function () {
                return +_this.config.btc_bid_amount * _this.config.buying_levels;
            },
            buyAmount: function () {
                var buy_amount = +_this.config.btc_bid_amount;
                if (_this.config.buying_levels === 0) {
                    return +(buy_amount * 1.1).toFixed(6);
                }
                return buy_amount;
            }
        };
    }
    Interface.prototype.start = function (restart) {
        if (restart === void 0) { restart = false; }
        return __awaiter(this, void 0, void 0, function () {
            var config, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.trader = new luno_1["default"]();
                        config = new config_1["default"]();
                        return [4 /*yield*/, config.connect()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, config.getConfig()];
                    case 2:
                        _a.config = _b.sent();
                        if (restart) {
                            this.status.set("open");
                        }
                        return [4 /*yield*/, this.execute()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
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
            var btc_price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trader.getBTCPrice()];
                    case 1:
                        btc_price = _a.sent();
                        this.config.buying_levels = 0;
                        this.config.status = "open";
                        this.config.buy_at = +btc_price;
                        this.config.sell_at = +btc_price;
                        this.config.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    Interface.prototype.setNextLimits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sum, btc_price, n, buy_perc, sell_perc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sum = function (s) { return !!s ? Math.pow(buy_perc, -s) + sum(s - 1) : 1; };
                        return [4 /*yield*/, this.trader.getBTCPrice()];
                    case 1:
                        btc_price = +(_a.sent());
                        this.config.buying_levels++;
                        n = this.config.buying_levels + 1;
                        buy_perc = 1 - +this.config.buy_percentage;
                        sell_perc = 1 + +this.config.sell_percentage;
                        this.config.buy_at = btc_price * buy_perc;
                        this.config.sell_at = this.config.buy_at * sell_perc * sum(n) / (n + 1);
                        this.config.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Interface;
}());
exports["default"] = Interface;
