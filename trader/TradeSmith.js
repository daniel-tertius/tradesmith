"use strict";
exports.__esModule = true;
exports.TradeSmith = void 0;
// This is the trader itself.
var TradeSmith = /** @class */ (function () {
    function TradeSmith(options) {
        this.status = options.status;
        this.minutesTimeout = options.minutesTimeout;
    }
    TradeSmith.prototype.start = function () {
        try {
        }
        catch (error) {
        }
    };
    TradeSmith.prototype.stop = function () {
        this.status = "dead";
    };
    TradeSmith.prototype.executeNextAction = function () {
        // const current_btc_price = getBTCPrice(); // TODO
    };
    return TradeSmith;
}());
exports.TradeSmith = TradeSmith;
