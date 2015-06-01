(function (global) {

    console.log("UserModel.js :: required")

    var UserModel = function (fs) {

        var _this = this,
            _dependencies = {},
            _config = {

            dependencies : "fs"

        }

        var __construct = function (fs) {

            console.log("UserModel.js :: __construct", fs)


        }

        _this.masuk = function (config) {

            console.log("UserModel.js :: setConfig")

            _config = config

        }

        __construct(fs)

    }

    module.exports = UserModel

} (global))