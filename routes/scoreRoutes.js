const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let score = await db.collection('scoreBoard').find().toArray();
    res.send(score);
        // 'cities',{
        // 'cities': city
    // })
})

module.exports = router;