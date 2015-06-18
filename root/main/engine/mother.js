(function (global) {

    console.log("mother.js :: required")

    var __ = require('lodash')

    var as = require('async')

    var fs = require('fs')

    var util = require('util')

    var mother = {},
        Seed = require(__dirname + '/Seed.js'),
        config = require(__dirname + '/../../config/main/engine/mother.json'),
        manifestSeed = {}

    mother.wakeUp = function (inversion, callback) {

        console.log("mother.js :: wakeUp")

        this.inversion = inversion

        mother.collectSeed(config.seeds, function (err, data) {

            if(err) console.error(err)

            console.log(data)

        })

    }

    mother.collectSeed = function (seeds, callback) {

        console.log("mother.js :: collectSeed")

        as.mapSeries(seeds, function (v, callback) {

            mother.createSeed(v, function (err, data) {

                callback(err, data)

            })

        }, function (err, data) {

            callback(err, data)

        })

    }

    mother.extendSeed = function (Main, callback) {

        console.log("mother.js :: extendSeed")

        util.inherits(Main, Seed) // extend main with seedjs

        callback(null, Main)

    }

    mother.getSeed = function (name, callback) {

        console.log("mother.js :: getSeed")

        var path = __dirname + config.root + '/'

        var complete = path + name + '/'

        mother.getConfigSeed(complete, function (err, data) {

            if(err) {

                console.log(err)

                callback(err)

                return

            }

            var main = require (complete + data.main)

            mother.extendSeed(main, function (err, extendedMain) {

                if(err) {

                    console.error(err)

                    callback(err)

                    return

                }

                var main = new extendedMain(data, mother.inversion)

                main.start() // seed start

            })

            // mother.getMainSeed(path, function (err, data) {

            //     if (err) console.error(err)

            //     console.log(data)

            // })

        })

    }

    mother.getConfigSeed = function (path, callback) {

        console.log("mother.js :: getConfigSeed")

        fs.realpath(path, null, function (err, data) {

            if(err) {

                callback(err)
                return

            }

            var path = data

            try {

                var config = require(path + '/manifest.json')

                callback(null, config)

            } catch (err) {

                callback(err)

            }

        })

    }

    mother.createSeed = function (v, callback) {

        console.log("mother.js :: createSeed")

        mother.getSeed(v.name, function (err, data) {

            callback(err, data)

        })

        console.log(v)

    }

    module.exports = mother

} (global))