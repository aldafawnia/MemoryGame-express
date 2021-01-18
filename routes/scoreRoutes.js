const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil')
const ObjectId = require('mongodb').ObjectId;

let db = MongoUtil.getDB();

router.get('/', async (req,res)=>{
        let db = MongoUtil.getDB();
    let score = await db.collection('scoreBoard').find().toArray();
    res.send(score);
        // 'cities',{
        // 'cities': city
    // })
})

router.get('/:username', async(req,res)=>{
    let db = MongoUtil.getDB();
    let score = await db.collection('scoreBoard').findOne({
        'username': req.params.username
    });
    res.send(score);
})

router.post('/', async (req, res) => {
    let db = MongoUtil.getDB();

    // extract out all the fields
    let {
        username, time
    } = req.body;

    let results = await db.collection('scoreBoard').insertOne({
        username, time
    })

    // if I use res.send and it sends back an array or an object,
    // express will auto convert it to be JSON
    res.send({
        'inserterdid': results.insertedId
    })
})

router.patch('/username', async (req, res) => {
    let db = MongoUtil.getDB();
    let username = req.params.username;

    let {
        username, time
    } = req.body;

    let results = await db.collection('scoreBoard').updateOne({
        'username': username
    },
    {
        '$set': {
            username, time
        }

    });

    res.send({
        // 'message': 'Update done',
        // 'status': 'OK'
        'Status': 'Updated'
    })

})

router.delete('/:id', async (req, res)=>{
    let db = MongoUtil.getDB();
    await db.collection('faults').deleteOne({
        _id:ObjectId(req.params.id)
    })

    res.send({
        'status':'OK'
    })
})

module.exports = router;