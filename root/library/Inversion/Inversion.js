(function (global) {

    var debug = false

    if(debug) console.log("Inversion.js :: required")

    var Inversion = function () {

        var __ = require('lodash'),
            async = require('async'),
            fs = require('fs'),
            aforeach = require('async-foreach').forEach

        var __config = require(__dirname + "/../../config/library/Inversion/index.json")

        var DIR = fs.realpathSync(__dirname + __config.root)

        var _this = this,
            _config = {},
            _manifest = {}

        var _dependencies = {}

        /**
         * constructor
         *
         */
        var __construct = function () {

            if(debug) console.log("Inversion.js :: __construct")

            _this.setup()

        }

        /**
         * setup rule and self register config
         *
         */
        _this.setup = function () {

            if(debug) console.log("Inversion.js :: setup")

            var Rule = require(__dirname + __config.Rule)

            _dependencies.rule = new Rule()

            _config["/root/library/Inversion/Inversion.js"] = ["/root/library/Inversion/Rule.js"]

            _config["/root/library/Inversion/Rule.js"] = []

            _manifest["/root/library/Inversion/Inversion.js"] = _this

            _manifest["/root/library/Inversion/Rule.js"] = _dependencies.rule

            if(debug) console.log("Inversion.js :: success self registry")

        }

        /**
         * wire object to get the manifest
         * @param  {string}   path     location class file
         * @param  {Function} callback return object manifest
         *
         */
        _this.wire = function (path, callback) {

            if(debug) console.log("Inversion.js :: wire")

            // get dependencies.json of path
            _this.seekConfig(path, function (err, data) {

                if(debug) console.log("Inversion.js :: _this.seekConfig")

                if (!data[path]) {

                    console.error('no dependencies declared')

                    return false

                }

                var k = path
                var v = data[k]

                // get file manifest
                _this.analyze(k, v, function (err, manifest) {

                    callback(err, manifest)

                })

            })

        }

        /**
         * analyze config to get manifest
         * @param  {string}   key      location class file
         * @param  {array}    value    dependencies of class
         * @param  {Function} callback return manifest
         *
         */
        _this.analyze = function (key, value, callback) {

            if(debug) console.log("Inversion.js :: analyze ", key)

            // get file manifest
            var manifest = _this.getManifest(key)

            // check if manifest exists
            if(!manifest){

                // add config
                _config[key] = value

                // seek config dependencies.json
                _this.seekConfigDependencies(value, function (err, data) {

                    if(debug) console.log("Inversion.js :: _this.seekConfigDependencies callback ", key)

                    // create manifest
                    _this.createManifest(key, function (_err, manifest) {

                        if(debug) console.log("Inversion.js :: analyze :: _this.createManifest")

                        if (_err) console.error(_err)

                        // set manifest object
                        _this.setManifest(key, manifest)

                        // return manifest
                        callback(null, manifest)

                    })

                })

            } else {

                // return manifest
                callback(null, manifest)

            }

        }

        /**
         * inject dependencies to Class
         * @param  {string}   key      location of Class
         * @param  {function} manifest Function to inject with dependencies
         * @param  {Function} callback return object manifest
         *
         */
        _this.inject = function (key, manifest, callback) {

            if(debug) console.log("Inversion.js :: inject ", key)

            if(debug) console.log(manifest)

            var dep = _config[key]

            var temp = []

            // class to inject class with dependencies
            var construct = function (Class, Dependencies) {

                console.log("Inversion.js :: construct")

                function C () {

                    return Class.apply(this, Dependencies)

                }

                C.prototype = Class.prototype

                return new C()

            }

            if(!dep) {

                callback(null, manifest)
                return

            }

            // loop dependencies
            async.map(dep, function (v, callback) {

                if(debug)console.log("Inversion.js :: inject :: async.map  loop" , v)

                // get manifest
                var manifest = _this.getManifest(v)

                // check if manifest exist
                if (manifest) {

                    // collect manifest
                    temp.push(manifest)

                    // next step
                    callback()

                } else {

                    // seek config dependencies.json
                    _this.seekConfig(v, function (err, data) {

                        if(debug)console.log("Inversion.js :: inject :: _this.seekConfig " , data)

                        // check if config exist
                        if(!data || !data[v]) {

                            if(debug) console.log('// dead end no dependencies')

                            // create manifest
                            _this.createManifest(v, function (_err, manifest) {

                                // set manifest
                                _this.setManifest(v, manifest)

                                // collect manifest
                                temp.push(manifest)

                                // next step
                                callback()

                            })

                        } else {

                            // still have dependencies

                            if(debug)console.log('// still have dependencies', data[v])

                            // seek config dependencies
                            _this.seekConfigDependenciesChain(v, data[v], function (err, manifest) {

                                if(debug) console.log("Inversion.js :: _this.seekConfigDependenciesChain callback ", data)

                                // collect manifest
                                temp.push(manifest)

                                // next step
                                callback(err, manifest)

                            })

                        }

                    })

                }

            }, function (err, complete) {

                if(err) console.error(err)

                // return manifest
                callback(null, construct(manifest, temp))

            })


        }

        _this.prepareManifest = function (key) {

            if(debug) console.log("Inversion.js :: prepareManifest")

            var manifest = {}

            try {

                if(debug) console.log("Inversion.js :: prepareManifest :: method 1 try ", key)

                manifest = require(key)

                if(debug) console.log("Inversion.js :: prepareManifest :: method 1 success ", typeof manifest)

                return manifest

            } catch (err) {

                if(debug) console.log("Inversion.js :: prepareManifest :: method 1 error ", err)

                try {

                    if(debug) console.log("Inversion.js :: prepareManifest :: method 2 try ", key)

                    var manifest = require(DIR + key)

                    if(debug) console.log("Inversion.js :: prepareManifest :: method 2 success ", typeof manifest)

                    return manifest

                } catch (err) {

                    if(debug) console.log("Inversion.js :: prepareManifest :: method 2 error ", err)

                    return false

                }

            }

        }

        _this.createManifest = function (key, callback) {

            if(debug) console.log("Inversion.js :: createManifest ", key)

            var manifest = {}

            manifest = _this.prepareManifest(key)

            if(debug) console.log(typeof manifest)

            if (typeof manifest == 'object') {

                callback(null, manifest)

                return

            } else if (typeof manifest == 'function') {

                _this.inject(key, manifest, function (err, data) {

                    callback(err, data)

                })

            }

            return false

        }

        _this.seekConfigDependenciesChain = function (key, collection, callback) {

            if(debug) console.log("Inversion.js :: seekConfigDependenciesChain ", collection)

            _this.analyze(key, collection, function (err, manifest) {

                callback(err, manifest)

            })

        }

        _this.seekConfigDependencies = function (collection, callback) {

            if(debug) console.log("Inversion.js :: seekConfigDepencies ", collection)

            async.map(collection, function (v, _callback) {

                if(debug) console.log("Inversion.js :: seekConfigDependencies :: async.map loop", v)

                _this.seekConfig(v, function (err, data){

                     if(debug)console.log('_this.seekConfig callback ', data)

                    if(!data || !data[v]) {

                        // dead end

                        if(debug) console.log('// dead end no dependencies')

                        // var manifest = _this.createManifest(v) // create manifest

                        _this.createManifest(v, function (_err, manifest) {

                            _this.setManifest(v, manifest)

                            _callback(null, manifest)

                        })


                    } else {

                        // still have dependencies

                        if(debug)console.log('// still have dependencies', data[v])

                        _this.seekConfigDependenciesChain(v, data[v], function (err, done) {

                            if(debug) console.log("Inversion.js :: _this.seekConfigDependenciesChain callback ", data)

                            _callback(err, done)

                        })

                    }

                })

            }, function (err, complete) {

                callback(err, complete)

            })

        }

        _this.seekConfig = function (path, callback) {

            if(debug) console.log("Inversion.js :: seekConfig")

            _dependencies.rule.seek(path, function (err, data) {

                if(debug) console.log("Inversion.js :: _dependencies.rule.seek callback ", data)

                callback(err, data)

            })

        }

        _this.setConfig = function (config) {

            if(debug) console.log("Inversion.js :: setConfig")

            _config = config

        }

        _this.getConfig = function () {

            if(debug) console.log("Inversion.js :: getConfig")

            return _config

        }

        _this.setManifest = function (key, manifest) {

            if(debug) console.log("Inversion.js :: setManifest ", key)

            _manifest[key] = manifest

        }

        _this.getManifest = function (key) {

            if(debug) console.log("Inversion.js :: getManifest")

            return _manifest[key]

        }

        __construct()

    }

    module.exports = Inversion

} (global))