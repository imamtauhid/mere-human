(function (global) {

    console.log("UserController.js :: required")

    var UserController = function (fs) {

        var _this = this,
            _dependencies = {},
            _config = {

            dependencies : "fs"

        }

        var __construct = function (fs) {

            console.log("UserController.js :: __construct", fs)

        }

        _this.setConfig = function (config) {

            console.log("UserController.js :: setConfig")

            _config = config

        }

        __construct(fs)

    }

    module.exports = UserController

} (global))