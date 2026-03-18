const Publisher = require('../models/Publisher');

exports.createPublisher = async (req, res) => {
    try {
        const { name, country, phone } = req.body;
        const publisher = await Publisher.create({ name, country, phone });
        res.status(201).json(publisher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.findAll();
        res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPublisherById = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }
        const { name, country, phone } = req.body;
        await publisher.update({ name, country, phone });
        res.status(200).json(publisher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        if (!publisher) {
            return res.status(404).json({ error: 'Publisher not found' });
        }
        await publisher.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
