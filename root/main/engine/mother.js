(function (global) {

    console.log("mother.js :: required")

    var mother = {},
        Seed = require(__dirname + '/seed.js')
        manifestSeed = {}

    mother.wakeUp = function (inversion, callback) {

        console.log("mother.js :: wakeUp")

        this.inversion = inversion

    }

    mother.createSeed = function () {

        console.log("mother.js :: createSeed")

        return new Seed()

    }

    module.exports = mother

} (global))