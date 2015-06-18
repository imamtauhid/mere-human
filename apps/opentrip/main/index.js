(function (global) {

    console.log("index.js :: required")

    var Opentrip = function (config, inversion) {

        var self = this

        var __construct =  function (config, inversion) {

            console.log("index.js :: __construct")

            Opentrip.super_.call(this, config, inversion)

        }

        __construct(config, inversion)

    }

    module.exports = Opentrip

} (global))