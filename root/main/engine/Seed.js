(function (global) {

    console.log("seed.js :: required")

    var Seed = function (config, inversion) {

        var _this = Seed,
            _config = config,
            _inversion = inversion

            _this.config = config
            _this.inversion = inversion

            console.log("Seed.js :: __construct")

    }

    Seed.prototype.getConfig = function () {

        console.log("Seed.js :: getConfig")

        return _config

    }

    Seed.prototype.setConfig = function (config) {

        console.log("Seed.js :: setConfig")

        _config = config

        return true

    }

    Seed.prototype.start = function () {

        console.log("Seed.js :: start")

        // setup variable
        this._inversion = Seed.inversion
        this._config = Seed.config

        // setup


    }

    Seed.prototype.stop = function () {

        console.log("Seed.js :: stop")

        console.log(Seed.inversion)

    }

    module.exports = Seed

}(global))