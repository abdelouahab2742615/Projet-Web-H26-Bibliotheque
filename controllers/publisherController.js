const Publisher = require("../modèles/Publisher");

exports.createPublisher = async (req, res) => {
    try {
        const publisher = await Publisher.create(req.body);
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
        if (publisher) {
            res.status(200).json(publisher);
        } else {
            res.status(404).json({ error: "Publisher not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePublisher = async (req, res) => {
    try {
        const [updated] = await Publisher.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPublisher = await Publisher.findByPk(req.params.id);
            res.status(200).json(updatedPublisher);
        } else {
            res.status(404).json({ error: "Publisher not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePublisher = async (req, res) => {
    try {
        const deleted = await Publisher.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Publisher not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
