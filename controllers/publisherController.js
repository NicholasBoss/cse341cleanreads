publisherController = {}
const mongodb = require('../database/connect')

publisherController.getAllPublishers = async (req, res) => {
    try {
        // const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('publishers');

        const data = await collection.find({}).toArray();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

publisherController.getPublisherById = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        let id = req.params.id;
        console.log(id)
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('publishers');

        const data = await collection.findOne({ _id: new ObjectId(id) });
        if (!data) {
            return res.status(404).json({status: statusbar, message: 'Publisher not found' });
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

publisherController.addPublisher = async (req, res) => {
    try {
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('publishers');

        const data = await collection.insertOne(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

publisherController.updatePublisher = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        let id = req.params.id;
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('publishers');

        const data = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

publisherController.deletePublisher = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        let id = req.params.id;
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('publishers');

        const data = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

module.exports = publisherController;