(function (global) {

    console.log("bootstrap.js :: required")

    var __config = require(__dirname + "/../config/main/bootstrap.json")

    var __ = require('lodash')
    var as = require('async')

    var boot = {},

        Inversion = require(__dirname + '/../library/Inversion/Inversion.js'),

        mother = require(__dirname + '/engine/mother.js'),

        ioc = {}

    boot.buildObject = function (initial, callback) {

        console.log("bootstrap.js :: buildObject")

        as.map(initial, function (v, callback) {

            console.log("bootstrap.js :: buildObject || as.map iteration")

            ioc.wire(v, function (err, data) {

                console.log("bootstrap.js :: buildObject || ioc.wire callback ")

                if (data) {console.log("bootstrap.js :: buildObject || loaded", v)}
                else{console.log("bootstrap.js :: buildObject || notloaded", v)}

                callback(err, data)

            })

        }, function (err, data) {

            console.log("bootstrap.js :: buildObject || as.map result")

            callback(err, data)

        })

    }

    boot.wakingUpMother = function (callback) {

        console.log("bootstrap.js :: wakingUpMother")

        mother.wakeUp(ioc, function (err, data) {

            console.log("bootstrap.js :: wakingUpMother || wakeUp")

            if(err) console.error(err)

            callback(err, data)

        })

    }

    boot.load = function (callback) {

        console.log("bootstrap.js :: load")

        var tasks = []

        tasks.push(function (scallback) {

            console.log("bootstrap.js :: load || tasks.push prepare initialize load")

            boot.buildObject(__config.initial, function (err, data) {

                scallback(err, __config.initial)

            })

        })

        tasks.push(function (scallback) {

            boot.wakingUpMother(function (err, data) {

                scallback(err, data)

            })

        })

        as.series(tasks, function (err, data) {

            console.log("bootstrap.js :: load || as.series result")

            callback(err, data)

        })

    }

    boot.start = function () {

        console.log("bootstrap.js :: start")

        ioc = new Inversion()

        boot.load(function (err, data) {

            console.log("bootstrap.js :: start || boot.load callback")

            if(err) {

                console.log("bootstrap.js :: start || boot.load failed")

                console.error(err)

                return false

            }

            console.log("bootstrap.js :: start || boot.load success")

        })

    }

    module.exports = boot

}(global))