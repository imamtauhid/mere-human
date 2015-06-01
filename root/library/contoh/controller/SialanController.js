(function (global) {

    console.log("SialanController.js :: required")

    var SialanController = function (fs) {

        var _this = this,
            _dependencies = {},
            _config = {

            dependencies : "fs"

        }

        var __construct = function (fs) {

            console.log("SialanController.js :: __construct", fs)

        }

        _this.setConfig = function (config) {

            console.log("SialanController.js :: setConfig")

            _config = config

        }

        __construct(fs)

    }

    module.exports = SialanController

} (global))