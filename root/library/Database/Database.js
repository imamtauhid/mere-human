(function (global) {

    console.log("Database.js :: required")

    var Database = function (sql) {

        var _this = this,
            _db = {}

        var __construct = function (sql) {

            console.log("Database.js :: __construct")

        }

        __construct(sql)

    }

    module.exports = Database

} (global))