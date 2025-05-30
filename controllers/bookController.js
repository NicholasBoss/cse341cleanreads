bookController = {}
const mongodb = require('../database/connect')

bookController.getAllBooks = async (req, res) => {
    try {
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.find({}).toArray();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({status: statusbar, error: error.message })
    }
}

bookController.getBookById = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        let id = req.params.id;
        console.log(id)
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.findOne({ _id: new ObjectId(id) });
        if (!data) {
            return res.status(404).json({status: statusbar, message: 'Book not found' });
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ status: statusbar, error: error.message })
    }
}

bookController.addBook = async (req, res) => {
    try {
        // transform the string from publisher to objectId
        const { ObjectId } = require('mongodb');
        if (req.body.publisher) {
            req.body.publisher = new ObjectId(req.body.publisher);
        }
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.insertOne(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({status: statusbar, error: error.message })
    }
}

bookController.updateBook = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        if (req.body.publisher) {
            req.body.publisher = new ObjectId(req.body.publisher);
        }
        let id = req.params.id;
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({status: statusbar, error: error.message })
    }
}

bookController.deleteBook = async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        let id = req.params.id;
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({status: statusbar, error: error.message })
    }
}

module.exports = bookController;