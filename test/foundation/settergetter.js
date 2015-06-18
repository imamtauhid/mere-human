
console.log("settergetter.js :: required")

function Library (name) {

    this.name = name

    this.books = []

}

Library.prototype = {

    set name (v) {

        console.log("settergetter.js :: set name")

        console.log(this)

        this._name = v

    },

    get name () {

        console.log("settergetter.js :: get name", this._name)

        return this._name

    },

    set books (v) {

        console.log("settergetter.js :: set books ", this._books)

        this._books = v

    },

    get books () {

        console.log("settergetter.js :: get books ", this._books)

        return this._books

    }

}

var alexandria = new Library('alexandria')

alexandria.name = 'imam'

alexandria.books.push('4c778232-95bd-49bf-bc9c-8dd20f93ccfd')
alexandria.books.push('19896b3a-e943-413b-87e2-928950f4609a')
alexandria.books.push('db7989fb-df2a-4f43-8c40-40cf94bdd6f1')
alexandria.books.push('c01efd68-4534-40a5-961c-531d725f0b6c')
alexandria.books.push('93a38eaf-3e80-41e3-832e-5e5a57fbef54')
alexandria.books.push('78dfd50e-b592-48c1-b9c8-0bf5238d747b')

console.log(alexandria)