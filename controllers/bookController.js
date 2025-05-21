bookController = {}
const mongodb = require('../database/connect')

bookController.getAllBooks = async (req, res) => {
    try {
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.find({}).toArray();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

bookController.addBook = async (req, res) => {
    try {
        const database = mongodb.getDb().db('cleanreads');

        const collection = database.collection('books');

        const data = await collection.insertOne(req.body);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = bookController;