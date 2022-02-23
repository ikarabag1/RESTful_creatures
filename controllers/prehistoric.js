const express = require('express')
const router = express.Router()
const fs = require('fs')


// LABWORK PREHISTORIC CREATURES 
// INDEX ROUTE --list all prehistoric creatures!
router.get('/', (req, res) => {
    // need a callback 
    // system file module to read --json presudo base first import it
    // pull in prehistoric creature from our db -- pass in relative path
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
        // console.log(req.query)
        // grabbing the queried name from the url
        let nameFilter = req.query.nameFilter
        // filter original creatureData and itireate through
        // if there is a query
        // console.log(creatureData)
        if (nameFilter) {
            creatureData = creatureData.filter(creature => {
            // if we dont pass nything search bar it will filter out all and turns nothing so crete error --to return falsy
            // checking the current dino in the data included --dinodata becomes this filter name --creates new array with the passed element
            return creature.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }
    // 
    res.render('prehistoric/index.ejs', {creatures: creatureData})
})

// RENDERS NEW PREHISTORIC CREATURES FORM
router.get('/new', (req, res) => {
    res.render('prehistoric/new.ejs')
})

// PUT ROUTE FOR PREHISTORIC CREATURES
router.put('/:idx', (req, res)=> {
    // console.log(`You\'ve hit the put route for edititng prehistoric creatures with id index of ${req.params.idx}`)
    // read in the preshistoric creatures from db json
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
// grabbing the specific id pulled and replace prehistoric creature fields from form
        creatureData[req.params.idx].name = req.body.name
        creatureData[req.params.idx].type = req.body.type
  // jsonify --save the creature to json file -where to write and what to write argu and throw it back into that json file
  fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
//   once the creatures has beed editerd, do a get request to the index route
res.redirect('/prehistoricCreatures')
})

// EDIT ROUTE
router.get('/edit/:idx', (req, res) => {
   // console.log(`You\'ve hit the put route for edititng prehistoric creatures with id index of ${req.params.idx}`)
    // read in the preshistoric creatures from db json
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
    res.render('prehistoric/edit.ejs', {creature: targetCreature, creatureId: creatureIndex})
})

// SHOW all info about a single prehistoric creature route
router.get('/:idx', (req, res) => {
    // console.log('idx:'+req.params.idx)
    // read in the prehistoric creatures from db
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    // extract the creature corresponding to the idx param
    let creatureIndex = req.params.idx
    let targetCreature = creatureData[creatureIndex]
    res.render('prehistoric/show.ejs', {creature: targetCreature})
    })
    
// POST a new prehistoric creature
router.post('/', (req, res) => {
    // console.log('you hit the post route')
    // read in the pre creatures from db -- pull in array of prehistoric creatures from json file
    let creatures = fs.readFileSync('./prehistoric.json')
    let creatureData = JSON.parse(creatures)
    // push(add) this dino to that creaturesData array
    creatureData.push(req.body)
    // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
    fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
    // write that to json.file
    // redirect back to the index route
    // res.redirect takes the url pattern for the get route that 
    // want to run next
    res.redirect('/prehistoricCreatures')
    })

// DELETE new prehistoric creature
    router.delete('/:idx', (req, res)=> {
        console.log(`you're trying to delete prehistoric creature #${req.params.idx}`)
         // read in the dinos from db -- pull in array of prehistoric creatures from json file
         let creatures = fs.readFileSync('./prehistoric.json')
         let creatureData = JSON.parse(creatures)
        //  remove the delete prehistoric creature from creatureData
        creatureData.splice(req.params.idx, 1)
        // rewrite the file sync
         // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
         fs.writeFileSync('./prehistoric.json', JSON.stringify(creatureData))
        //  get back to index file
        // res.redirect takes the url pattern for the get route that 
        // want to run next
        res.redirect('/prehistoricCreatures')  
    })


module.exports = router