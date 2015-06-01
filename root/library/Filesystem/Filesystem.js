(function (global) {

    console.log("Filesystem.js :: required")

    var Filesystem = function () {

        var _this = this,
            _dependencies = {},
            _config = {

            dependencies : "fs"

        }

        var __construct = function () {

            console.log("Filesystem.js :: __construct", arguments)

        }

        _this.setConfig = function (config) {

            console.log("Filesystem.js :: setConfig")

            _config = config

        }

        __construct(arguments)

    }

    module.exports = Filesystem

} (global))