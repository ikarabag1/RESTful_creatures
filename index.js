// import our packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const { route } = require('express/lib/application')
const req = require('express/lib/request')
const res = require('express/lib/response')
const methodOverride = require('method-override')
// because json is is built in system module we need to create fs for index route 
const fs = require('fs')

// cerate an instance of exoresss
const app = express()

// MIDDLEWARES
// tell express to use ejs as the view engine
app.set('view engine', 'ejs')
// tell express that we re using ejs layout
app.use(ejsLayouts)
// method over-ride
app.use(methodOverride('_method'))
// body-parser middleware -key of extended and value of false -- 
// how to handle form data told to expreess aprsed and throw under a body --
// allows us t oaccess form data via req.body

app.use(express.urlencoded({extended: false}))

// CONTROLLERS
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoricCreatures', require('./controllers/prehistoric.js'))

// ROUTES
// HOME
app.get('/', (req, res) =>{
    res.send('HELLO Dinos')
})

// // INDEX ROUTE ie list all of dinos!
// app.get('/dinosaurs', (req, res) => {
//     // need a callback
//     // system filev module to read --json pseudo base first import it 
//     // pull in dinasours from our db -- pass in realtive path   
//         let dinosaurs = fs.readFileSync("./dinosaurs.json")
//         let dinoData = JSON.parse(dinosaurs)
//         // console.log(req.query)
//         // grabbing the queried name from the url
//         let nameFilter = req.query.nameFilter
//         // filter original dinoData and itireate through
//         // if there is a query
//         // console.log(dinoData)
//         if (nameFilter) {
//             dinoData = dinoData.filter(dino => {
//             // if we dont pass nything search bar it will filter out all and turns nothing so crete error --to return falsy
//             // checking the current dino in the data included --dinodata becomes this filter name --creates new array with the passed element
//             return dino.name.toLowerCase() === nameFilter.toLowerCase();
//         });
//     }
//     //     //get array index from url parameter
//     // let dinoIndex = parseInt(req.params.idx);
//         res.render("dinosaurs/index.ejs", {myDinos: dinoData})  
// })

// //renders new route (renders the new dino form)
// app.get('/dinosaurs/new', (req, res) => {
//     res.render('dinosaurs/new.ejs')
// })

// // PUT ROUTE
// app.put('/dinosaurs/:idx', (req, res)=> {
//     // console.log(`You\'ve hit the put route for edititng dino with id index of ${req.params.idx}`)
//     // read in the dinos from db
// let dinosaurs = fs.readFileSync("./dinosaurs.json")
// let dinoData = JSON.parse(dinosaurs)
// // grabbing the specific id pulled and replace dino dields from form
// dinoData[req.params.idx].name = req.body.name
// dinoData[req.params.idx].type = req.body.type
//   // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that json file
//   fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
// //   once the dinosaurs has beed editerd, do a get request to the index route
// res.redirect('/dinosaurs')
// })

// // EDIT ROUTE
// app.get('/dinosaurs/edit/:idx', (req, res) => {
//     console.log('You hitting the route edit')
//     let dinosaurs = fs.readFileSync('./dinosaurs.json')
//     let dinoData = JSON.parse(dinosaurs)
//     let dinoIndex = req.params.idx
//     let targetDino = dinoData[dinoIndex]
//     res.render('dinosaurs/edit.ejs', {dino: targetDino, dinoId: dinoIndex})
// })

// // show ie show all info about a single dino route
// app.get('/dinosaurs/:idx', (req, res) => {
// // console.log('idx:'+req.params.idx)
// // read in the dinos from db
// let dinosaurs = fs.readFileSync("./dinosaurs.json")
// let dinoData = JSON.parse(dinosaurs)
// // extract the dino corresponding to the idx param
// let dinoIndex = req.params.idx
// let targetDino = dinoData[dinoIndex]
// res.render('dinosaurs/show.ejs', {dino: targetDino})
// })

// // post a new dino
// app.post('/dinosaurs' ,(req, res) => {
//     // console.log('you hit the post route')
//     // read in the dinos from db -- pull in array of dinos from json file
//     let dinosaurs = fs.readFileSync("./dinosaurs.json")
//     let dinoData = JSON.parse(dinosaurs)
//     // push(add) this dino to that dinoData array
//     dinoData.push(req.body)
//     // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
//     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//     // write that to json.file
//     // redirect back to the index route
//     // res.redirect takes the url pattern for the get route that 
//     // want to run next
//     res.redirect('/dinosaurs')
// })

// // delete dino
// app.delete('/dinosaurs/:idx', (req, res)=> {
//     console.log(`you're trying to delete dino #${req.params.idx}`)
//      // read in the dinos from db -- pull in array of dinos from json file
//      let dinosaurs = fs.readFileSync("./dinosaurs.json")
//      let dinoData = JSON.parse(dinosaurs)
//     //  remove the delete dino from dinoData
//     dinoData.splice(req.params.idx, 1)
//     // rewrite the file sync
//      // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
//      fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//     //  get back to index file
//     // res.redirect takes the url pattern for the get route that 
//     // want to run next
//     res.redirect('/dinosaurs')  
// })



// // LABWORK PREHISTORIC CREATURES 
// // INDEX ROUTE --list all prehistoric creatures!
// app.get('/prehistoricCreatures', (req, res) => {
//     // need a callback 
//     // system file module to read --json presudo base first import it
//     // pull in prehistoric creature from our db -- pass in relative path
//     let creatures = fs.readFileSync('./prehistoric.json')
//     let creatureData = JSON.parse(creatures)

//     // 
//     res.render('prehistoric/prehistoricCreatures.ejs', {creatures: creatureData})
// })

// // RENDERS NEW PREHISTORIC CREATURES FORM
// app.get('/prehistoricCreatures/new', (req, res) => {
//     res.render('prehistoric/new.ejs')
// })

// // PUT ROUTE FOR PREHISTORIC CREATURES
// app.put('/prehistoricCreatures/:idx', (req, res)=> {
//     // console.log(`You\'ve hit the put route for edititng prehistoric creatures with id index of ${req.params.idx}`)
//     // read in the preshistoric creatures from db json
//     let creatures = fs.readFileSync('./prehistoric.json')
//     let creatureData = JSON.parse(creatures)
// // grabbing the specific id pulled and replace prehistoric creature fields from form
//         creatureData[req.params.idx].name = req.body.name
//         creatureData[req.params.idx].type = req.body.type
//   // jsonify --save the creature to json file -where to write and what to write argu and throw it back into that json file
//   fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
// //   once the creatures has beed editerd, do a get request to the index route
// res.redirect('/prehistoricCreatures')
// })

// // EDIT ROUTE
// app.get('/prehistoricCreatures/edit/:idx', (req, res) => {
//    // console.log(`You\'ve hit the put route for edititng prehistoric creatures with id index of ${req.params.idx}`)
//     // read in the preshistoric creatures from db json
//     let creatures = fs.readFileSync('./prehistoric.json')
//     let creatureData = JSON.parse(creatures)
//     let creatureIndex = req.params.idx
//     let targetCreature = creatureData[creatureIndex]
//     res.render('prehistoric/edit.ejs', {creature: targetCreature, creatureId: creatureIndex})
// })

// // SHOW all info about a single prehistoric creature route
// app.get('/prehistoricCreatures/:idx', (req, res) => {
//     // console.log('idx:'+req.params.idx)
//     // read in the prehistoric creatures from db
//     let creatures = fs.readFileSync('./prehistoric.json')
//     let creatureData = JSON.parse(creatures)
//     // extract the creature corresponding to the idx param
//     let creatureIndex = req.params.idx
//     let targetCreature = creatureData[creatureIndex]
//     res.render('prehistoric/show.ejs', {creature: targetCreature})
//     })
    
// // POST a new prehistoric creature
// app.post('/prehistoricCreatures', (req, res) => {
//     // console.log('you hit the post route')
//     // read in the pre creatures from db -- pull in array of prehistoric creatures from json file
//     let creatures = fs.readFileSync('./prehistoric.json')
//     let creatureData = JSON.parse(creatures)
//     // push(add) this dino to that creaturesData array
//     creatureData.push(req.body)
//     // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
//     fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
//     // write that to json.file
//     // redirect back to the index route
//     // res.redirect takes the url pattern for the get route that 
//     // want to run next
//     res.redirect('/prehistoricCreatures')
//     })

// // DELETE new prehistoric creature
//     app.delete('/prehistoricCreatures/:idx', (req, res)=> {
//         console.log(`you're trying to delete prehistoric creature #${req.params.idx}`)
//          // read in the dinos from db -- pull in array of prehistoric creatures from json file
//          let creatures = fs.readFileSync('./prehistoric.json')
//          let creatureData = JSON.parse(creatures)
//         //  remove the delete prehistoric creature from creatureData
//         creatureData.splice(req.params.idx, 1)
//         // rewrite the file sync
//          // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
//          fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
//         //  get back to index file
//         // res.redirect takes the url pattern for the get route that 
//         // want to run next
//         res.redirect('/prehistoricCreatures')  
//     })



// test how it is working
// tell how to lsiten port
app.listen(8000, () => {
    console.log('DINO CRUD TIME')
})