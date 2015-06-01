(function (global) {

    console.log("seed.js :: required")

    var Seed = function () {

        var _this = this,
            _config = {}

        var __construct = function () {

            console.log("seed.js :: __construct")

        }

        _this.setConfig = function (config) {

            console.log("seed.js :: setConfig")

            _config = config

        }

        _this.start = function () {

            console.log("seed.js :: start")

        }

        _this.stop = function () {

            console.log("seed.js :: stop")

        }

        __construct()

    }

    module.exports = Seed

}(global))