const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
    let city = await db.collection('cities').find().toArray();
    res.send(city);
        // 'cities',{
        // 'cities': city
    // })
})

module.exports = router;