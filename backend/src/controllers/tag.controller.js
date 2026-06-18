const tagService = require("../services/tag.service");

const getTags = async (req, res) => {
    const tags = await tagService.getAllTags();

    res.json(tags);
};

const createTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name){
            return res.status(400).json({
                message: "El nombre de Tag es requerido"
            });
        };
        const tag = await tagService.createTag(name);
        res.status(201).json(tag);
    } catch (error) {
        next(error);
    }
};

const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || name.trim() === ""){
            return res.status(400).json({
                message: "El nombre de Tag es requerido"
            });
        }
        const tag = await tagService.updateTag(id, name);
        res.json(tag);
    } catch (error) {
        next(error);
    }
};


const deleteTag = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "El id del Tag es requerido"
        })
    }

    await tagService.deleteTag(id);

    res.status(204).send();
};

module.exports = {
    getTags,
    createTag,
    updateTag,
    deleteTag
};