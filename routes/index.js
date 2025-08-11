const express = require("express");
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello world at week05');
});

router.use('/users', require('./users'));
router.use('/devices', require('./devices'));

module.exports = router;

