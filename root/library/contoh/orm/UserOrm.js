(function (global) {

    console.log("UserOrm.js :: required")

    var UserOrm = function () {

        var _this = this,
            _dependencies = {},
            _config = {

            dependencies : "fs"

        }

        var __construct = function () {

            console.log("UserOrm.js :: __construct", arguments)

        }

        _this.masuk = function (config) {

            console.log("UserOrm.js :: setConfig")

            _config = config

        }

        __construct(arguments)

    }

    module.exports = UserOrm

} (global))