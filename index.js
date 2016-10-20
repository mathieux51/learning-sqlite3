const fs = require("fs")
const file = "pets.db"
const sqlite3 = require("sqlite3").verbose();
const sqldb = new sqlite3.Database(file);

// db.serialize(() => {
//     console.log("Inside db.serialize")
//     db.each("select * from pets;", (err, row) => {
//         console.log(row)
//     })
// })

// sqlite3_db.each("select * from pets;", (err, data) => {
//     console.log(data)
//     db.close()
// })


// Database layer
const db = {
    pets: {
        read: function(cb) {
            sqldb.all("select name from pets;", (err, pets) => {
                sqldb.close()
                cb(err, pets)
            })
        },
        save: function(pets, cb) {
            fs.writeFile('server/list.json', JSON.stringify({ pets }), (err) => {
                console.log("It's saved!")
                cb(err)
            })
        }
    }
}

db.pets.read((err, pets) => {
    console.log(pets)
})