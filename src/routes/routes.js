const express = require('express');
const router = express.Router();

const newBook = require('../models/nuevoLibro');

router.get('/', async (req,res) =>{
    const search = await newBook.find().lean()    
    res.render('index', {search}) 
});

router.get('/search', (req,res)=>{
    res.render('partials/search');
});
router.post('/search', async (req,res)=>{
    let{param,key} = req.body;
    let search = await newBook.find();
    if(param== 'ID'){
        search = await newBook.find({_id: key}).lean();
    }
    if(param== 'Autor'){
        search = await newBook.find({author: key}).lean();
    }
    if(param== 'Titulo'){
        search = await newBook.find({title: key}).lean();
    }
    if(param== 'Editorial'){
        search = await newBook.find({editorial: key}).lean();
    }
    if(param== 'Genero'){
        search = await newBook.find({general: key}).lean();
    }
    if(param== 'Resumen'){
        search = await newBook.find({resume: key}).lean();
    }
    if(param== 'Numero de Paginas'){
        search = await newBook.find({pagesNumber: key}).lean();
    }
    if(param== 'Año de Creacion'){
        search = await newBook.find({yearCreation: key}).lean();
    }
    if(param== 'Precio'){
        search = await newBook.find({price: key}).lean();
    }
    if(param== 'Disponibles'){
        search = await newBook.find({quantity: {$eq: key}}).lean();
    }
    res.render('index',{search});
    
});

router.get('/add', (req,res)=>{
    res.render('partials/add');
});

router.get('/delete/:id', async (req,res) => {
    const remove = await newBook.findByIdAndDelete(req.params.id);
    req.flash('correct', 'Libro borrado satisfactoriamente');
    res.redirect('/');
});

router.get('/modify/:id', async (req,res) =>{
    const viewOne = await newBook.findById(req.params.id)
    .then(data =>{
        return {
            id: data.id,
            title: data.title,
            author: data.author,
            editorial: data.editorial,
            general: data.general,
            resume: data.resume,
            pagesNumber: data.pagesNumber,
            yearCreation: data.yearCreation,
            price: data.price,
            quantity: data.quantity
        }
    })
    res.render('partials/modify', {viewOne});
});



router.get('/comprar/:id', async (req,res) =>{
    const buy = await newBook.findById(req.params.id)
    .then(data =>{
        return {
            id: data.id,
            title: data.title,
            author: data.author,
            editorial: data.editorial,
            general: data.general,
            resume: data.resume,
            pagesNumber: data.pagesNumber,
            yearCreation: data.yearCreation,
            price: data.price,
            quantity: data.quantity
        }
    })
    console.log(buy)
    if(buy.quantity > 0){
        console.log('Hay existencias',buy.quantity);
        const quantityMod = buy.quantity-1;
        if(quantityMod== 0){
            console.log('Ultima existencia');
            const newQuantity = await newBook.findByIdAndDelete(buy.id);
            req.flash('correct', 'Ultimo libro disponible');
        }else{
            console.log(quantityMod);
            buy.quantity = quantityMod;
            console.log(buy);
            const newQuantity = await newBook.findByIdAndUpdate(buy.id,{$set: buy});
            
        }
        req.flash('correct', ' Libro comprado satisfactoriamente');
    }else{
        console.log('No hay existencias');
        req.flash('incorrect', ' No hay unidades');
        
    }
    res.redirect('/');

});


router.post('/modify/:id', async (req,res) =>{
    const {title, author, editorial, general, resume, pagesNumber, yearCreation, price, quantity} = req.body;
    const modify = await newBook.findByIdAndUpdate(req.params.id,{title, author, editorial, general, resume, pagesNumber, yearCreation, price, quantity});
    req.flash('correct', 'Libro modificado satisfactoriamente');
    res.redirect('/');
});


router.post('/add', async (req, res) =>{
    const {title, author, editorial, general, price, quantity, resume, pagesNumber, yearCreation, examen} = req.body;
    const uploadBook = new newBook({title, author, editorial, general, price, quantity, resume, pagesNumber, yearCreation, examen});

    const upload = await uploadBook.save(function(err,doc){
        if(err){
            console.log(err);
            req.flash('incorrect','Error al añadir un libro');
            res.redirect('/');
        }else{
            req.flash('correct', 'Libro añadido satisfactoriamente');
            res.redirect('/');
        }

    });
     
});



module.exports = router;