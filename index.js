// import our packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const { route } = require('express/lib/application')
const req = require('express/lib/request')
const res = require('express/lib/response')
// because json is is built in system module we need to create fs for index route 
const fs = require('fs')

// cerate an instance of exoresss
const app = express()

// MIDDLEWARES
// tell express to use ejs as the view engine
app.set('view engine', 'ejs')
// tell express that we re using ejs layout
app.use(ejsLayouts)
// body-parser middleware -key of extended and value of false -- 
// how to handle form data told to expreess aprsed and throw under a body --
// allows us t oaccess form data via req.body

app.use(express.urlencoded({extended: false}))

// ROUTES
// HOME
app.get('/', (req, res) =>{
    res.send('HELLO Dinos')
})

// INDEX ROUTE ie list all of dinos!
app.get('/dinosaurs', (req, res) => {
    // need a callback
    // system filev module to read --json oseudo base first import it 
    // pull in dinasours from our db -- pass in realtive path   
        let dinosaurs = fs.readFileSync("./dinosaurs.json")
        let dinoData = JSON.parse(dinosaurs)
        //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);
        res.render("index", {myDinos: dinoData})  
})

// new route (renders the new dino form)
app.get('/dinosaurs/new', (eq, res) => {
    res.render('new.ejs')
})

// step out route
// show ie show all info about a single dino route
app.get('/dinosaurs/:idx', (req, res) => {
console.log('idx:'+req.params.idx)
// read in the dinos from db
let dinosaurs = fs.readFileSync("./dinosaurs.json")
let dinoData = JSON.parse(dinosaurs)
// extract the dino corresponding to the idx param
let dinoIndex = req.params.idx
let targetDino = dinoData[dinoIndex]
res.render('show.ejs', {dino: targetDino})
})

// post a new dino
app.post('/dinosaurs' ,(req, res) => {
    console.log('you hit the post route')
    // read in the dinos from db -- pull in array of dinos from json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // push(add) this dino to that dinoData array
    dinoData.push(req.body)
    // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // write that to json.file
//    redirect back to the index route
// res.redirect takes the url pattern for the get route that 
// want to run next
res.redirect('/dinosaurs')
})

// labwork for prehistoric creatures 
app.get('/prehistoricCreatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoricCreatures.ejs', {creatures: creatureData})
})

app.get('/prehistoricCreatures/new', (req, res) => {
    res.render('newCreature.ejs')
})

app.get('/prehistoricCreatures/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
    res.render('showCreatures.ejs', {creature: targetCreature})
})

// post a neww cereature
app.post('/prehistoricCreatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
})
// res.redirect('/prehistoricCreatures')

// test how it is working
// tell how to lsiten port
app.listen(8000, () => {
    console.log('DINO CRUD TIME')
})