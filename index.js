const fs = require("fs")
const file = "pets.db"
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(file);

db.serialize(() => {
    console.log("Inside db.serialize")
    db.each("select * from pets;", (err, row) => {
        console.log(row)
    })
})

db.close()