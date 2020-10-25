const express = require('express');
const author = require('../modals/author');
const router = express.Router();
const Author = require('../modals/author');
// All Authors route
 router.get('/', async(req,res) =>{
    try{
        let searchOptions ={};
        if(req.query.name != null && req.query.name !== ''){
            searchOptions.name = new RegExp(req.query.name,'i');
        }
        const authors = await Author.find(searchOptions);
        res.render('authors/index',{
            authors:authors,
            searchOptions:req.query
        })
    }catch{
        res.redirect('/');
    }
    
 })

 router.get('/new',(req,res) =>{
     res.render('authors/new',{author:new Author()})
 })

//  Create Author
 router.post('/', async(req,res) =>{
    try{
        const author = new Author({
            name:req.body.name 
         })
         
         const newAuthor = await author.save();
         console.log(newAuthor);
        //  res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`);
     }catch(e){
        res.render('authors/new',{
            author:author,
            errorMessage:'Error Creating Author'
        })
     }
    
 })
// New Author Route
 module.exports = router;