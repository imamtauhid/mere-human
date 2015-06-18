var stream = require('JSONStream')
var es = require('event-stream')
var request = require('request')

request({

    url: 'http://isaacs.couchone.com/registry/_all_docs'

}).pipe(stream.parse('rows.*.value'))

.pipe(es.mapSync(function (data) {

    console.log(data)

    return data

}))