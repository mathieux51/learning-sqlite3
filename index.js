const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
    // app.use(express.static('public'))
    // app.use(express.static('node_modules'))
    // app.use(bodyParser.json())

const file = "pets.db"
const sqlite3 = require("sqlite3").verbose();
const sqldb = new sqlite3.Database(file);

// Database layer
// const db = {
//     pets: {
//         read: function(cb) {
//             fs.readFile('server/list.json', 'utf8', (err, data) => {
//                 const json = JSON.parse(data)
//                 cb(err, json.pets)
//             })
//         },
//         save: function(pets, cb) {
//             fs.writeFile('server/list.json', JSON.stringify({ pets }), (err) => {
//                 console.log("It's saved!")
//                 cb(err)
//             })
//         }
//     }
// }

const db = {
    pets: {
        search: function(pet, cb) {
            // search
            sqldb.all("select name from pets where name  match (?)", pet, function(err, result) {
                console.log(`select * from pets where name match ${pet};`)
                const found = (result.length != 0) ? true : false
                cb(err, found)
            })
        },
        create: function(newPet, cb) {
            // insert
            sqldb.run("insert into pets(name)  values (?)", newPet, function(err) {
                console.log(`insert into pets(name) values ${newPet};`)
                db.pets.read((err, pets) => {
                    cb(err, pets)
                })
            })
        },
        read: function(cb) {
            // select
            sqldb.all("select name from pets", function(err, pets) {
                console.log("select name from pets;")
                cb(err, pets)
            })
        },
        update: function(cb) {
            // update n
        },
        delete: function(petToDelete, cb) {
            // delete
            sqldb.run("delete from pets where name = ?", petToDelete, function(err) {
                console.log(`delete from pets where name = ${petToDelete};`)
                db.pets.read((err, pets) => {
                    cb(err, pets)
                })
            })
        }
    }
}




// db.pets.create("Jack", (err, pets) => {
//     console.log(pets)
// })

// db.pets.read((err, pets) => {
//     db.pets.create("Jack", (err, pets) => {
//         console.log(pets)
//     })
// })


// db.pets.read((err, pets) => {
//         console.log(pets)
//     })
// db.pets.delete("Jack", (err) => {})

// db.pets.search("Max", (err, found) => {
//     console.log(found)
// })

// db.pets.search("Michel", (err, found) => {
//     console.log(found)
// })



// Api implementation
app.get('/api', (req, res) => {
    db.pets.read((err, pets) => {
        if (err) return res.status(500).end()
        res.send(pets)
    })
})

app.post('/api', (req, res) => {
    const newPet = req.body
    db.pets.read((err, pets) => {
        if (err) return res.status(500).end()
        db.pets.search(newPet, (err, found) => {
            if (!found) {
                db.pets.create(newPet, (err, pets) => {
                    if (err) return res.status(500).end()
                    res.send(pets)
                })
            } else {
                res.status(403).end()
            }
        })
    })
})

// app.delete('/api', (req, res) => {
//     const petToDelete = req.body.name
//     db.pets.read((err, pets) => {
//         if (err) return res.status(500).end()
//         const newpets = pets.filter(e => e.name !== petToDelete)
//         db.pets.save(newpets, (err) => {
//             if (err) return res.status(500).end()
//             res.send(newpets)
//         })
//     })
// })

app.delete('/api', (req, res) => {
    const petToDelete = req.body.name
    db.pets.read((err, pets) => {
        if (err) return res.status(500).end()
        db.pets.search(petToDelete, (err, found) => {
            if (found) {
                db.pets.delete(petToDelete, (err, pets) => {
                    if (err) return res.status(500).end()
                    res.send(pets)
                })
            } else {
                res.status(403).end()
            }
        })
    })
})





app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
})




// const db = {
//     pets: {
//         read: function(cb) {
//             sqldb.all("select name from pets;", (err, pets) => {
//                 sqldb.close()
//                 cb(err, pets)
//             })
//         },
//         save: function(pets, cb) {
//             fs.writeFile('server/list.json', JSON.stringify({ pets }), (err) => {
//                 console.log("It's saved!")
//                 cb(err)
//             })
//         }
//     }
// }

// db.pets.read((err, pets) => {
//     console.log(pets)
// })