(function (global) {

    console.log("inheritance.js :: required")

    function Car (name) {

        console.log("inheritance.js :: __construct Car")

        this.name = name

    }

    Car.prototype.accelerate = function () {

        console.log("inheritance.js :: accelerate")

    }

    Car.prototype.brake = function () {

        console.log("inheritance.js :: brake")

    }

    Car.prototype.turn = function () {

        console.log("inheritance.js :: turn")

        console.log("inheritance.js :: name ", this.name)

    }

    Car.prototype.info = function () {

        console.log("inheritance.js :: info")

        console.log("Name : ", this.name)

    }

    function SuperCar (name) {

        console.log("inheritance.js :: __construct SuperCar")

        console.log("inheritance.js :: this IS ", this)

        Car.call(this, name) // calling Car constructor

    }

    SuperCar.prototype = Object.create(Car.prototype)

    SuperCar.prototype.fly = function () {

        console.log("inheritance.js :: fly")

    }

    var x = new SuperCar('mahago')
    var v = new SuperCar('imam')

    v.info()
    x.info()
    x.turn()
    v.turn()

} (global))