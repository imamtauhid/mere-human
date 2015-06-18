(function (global) {

    console.log("index.js :: required")

    var engine = require(__dirname + '/main/bootstrap.js')

    engine.start()

} (global))