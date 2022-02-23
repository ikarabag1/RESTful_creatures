const express = require('express')
const router = express.Router()
const fs = require('fs')


// INDEX ROUTE ie list all of dinos!
router.get('/', (req, res) => {
    // need a callback
    // system filev module to read --json pseudo base first import it 
    // pull in dinasours from our db -- pass in realtive path   
        let dinosaurs = fs.readFileSync("./dinosaurs.json")
        let dinoData = JSON.parse(dinosaurs)
        // console.log(req.query)
        // grabbing the queried name from the url
        let nameFilter = req.query.nameFilter
        // filter original dinoData and itireate through
        // if there is a query
        // console.log(dinoData)
        if (nameFilter) {
            dinoData = dinoData.filter(dino => {
            // if we dont pass nything search bar it will filter out all and turns nothing so crete error --to return falsy
            // checking the current dino in the data included --dinodata becomes this filter name --creates new array with the passed element
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }
    // get array index from url parameter
    // let dinoIndex = parseInt(req.params.idx);
        res.render("dinosaurs/index.ejs", {myDinos: dinoData})  
})

//renders new route (renders the new dino form)
router.get('/new', (req, res) => {
res.render('dinosaurs/new.ejs')
})

// PUT ROUTE
router.put('/:idx', (req, res)=> {
    // console.log(`You\'ve hit the put route for edititng dino with id index of ${req.params.idx}`)
    // read in the dinos from db
let dinosaurs = fs.readFileSync("./dinosaurs.json")
let dinoData = JSON.parse(dinosaurs)
// grabbing the specific id pulled and replace dino dields from form
dinoData[req.params.idx].name = req.body.name
dinoData[req.params.idx].type = req.body.type
  // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
//   once the dinosaurs has beed editerd, do a get request to the index route
res.redirect('/dinosaurs')
})

// EDIT ROUTE
router.get('/edit/:idx', (req, res) => {
    console.log('You hitting the route edit')
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let targetDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs', {dino: targetDino, dinoId: dinoIndex})
})

// show ie show all info about a single dino route
router.get('/:idx', (req, res) => {
// console.log('idx:'+req.params.idx)
// read in the dinos from db
let dinosaurs = fs.readFileSync("./dinosaurs.json")
let dinoData = JSON.parse(dinosaurs)
// extract the dino corresponding to the idx param
let dinoIndex = req.params.idx
let targetDino = dinoData[dinoIndex]
res.render('dinosaurs/show.ejs', {dino: targetDino})
})

// post a new dino
router.post('/' ,(req, res) => {
    // console.log('you hit the post route')
    // read in the dinos from db -- pull in array of dinos from json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // push(add) this dino to that dinoData array
    dinoData.push(req.body)
    // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // write that to json.file
    // redirect back to the index route
    // res.redirect takes the url pattern for the get route that 
    // want to run next
    res.redirect('/dinosaurs')
})

// delete dino
router.delete('/:idx', (req, res)=> {
    console.log(`you're trying to delete dino #${req.params.idx}`)
     // read in the dinos from db -- pull in array of dinos from json file
     let dinosaurs = fs.readFileSync("./dinosaurs.json")
     let dinoData = JSON.parse(dinosaurs)
    //  remove the delete dino from dinoData
    dinoData.splice(req.params.idx, 1)
    // rewrite the file sync
     // jsonify --save the dinosaurs to json file -where to write and what to write argu and throw it back into that db
     fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //  get back to index file
    // res.redirect takes the url pattern for the get route that 
    // want to run next
    res.redirect('/dinosaurs')  
})

module.exports = router