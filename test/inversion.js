console.log("inversion.js :: test inversion")

var Inversion = require(__dirname + '/../root/library/Inversion/Inversion.js')

var ioc = new Inversion()

ioc.wire("/root/library/contoh/controller/SialanController.js", function (err, data) {

    console.log(data)

})