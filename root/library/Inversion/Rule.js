(function (global) {

    var debug = false

    if(debug) console.log("Rule.js :: required")

    var Rule = function () {

        var __config = require(__dirname + "/../../config/library/Inversion/rule.json")

        var _this = this,
            _config = {

                target: "dependencies.json",
                mode: "otonom" // otonom/centralize

            }

        var __construct = function () {

            if(debug) console.log("Rule.js :: __construct")

        }

        _this.getFolder = function (path) {

            if(debug) console.log("Rule.js :: getFolder")

            var pattern = /[^\/]*$/

            try {

                var result = path.replace(pattern, "")

                return result

            } catch (err) {

                console.error(err)

                return false

            }

        }

        _this.seek = function (path, callback) {

            if(debug) console.log("Rule.js :: seek")

            switch (__config.mode) {

                case "otonom":

                    _this.seekOtonom(path, function (err, data) {

                        callback(err, data)

                    })

                break;

                case "centralize":

                    _this.seekCentralize(path, callback)

                break;

                default:

                    _this.seekOtonom(path, callback)


            }

        }

        _this.seekCentralize = function (path, callback) {

            if(debug) console.log("Rule.js :: seekCentralize")

        }

        _this.seekOtonom = function (path, callback) {

            if(debug) console.log("Rule.js :: seekOtonom")

            var folder = _this.getFolder(path)

            if(!folder) {

                callback(null, false)

                return false

            }

            var locale = require(__config.root + folder + __config.target)

            callback(null, locale)

        }

        __construct()

    }

    module.exports = Rule

} (global))