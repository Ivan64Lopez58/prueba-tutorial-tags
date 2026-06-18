const prisma = require("../config/prisma");

const getAllTags = async () => {
    return await prisma.tag.findMany();
};

const createTag = async (name) => {
    return await prisma.tag.create({
        data: { name }
    });
};

const updateTag = async (id, name) => {
    return await prisma.tag.update({
        where: {
            id: Number(id)
        },
        data: {
            name
        }
    });
};

const deleteTag = async (id) => {
    return await prisma.tag.delete({
        where: {
            id: Number(id),
        },
    });
};

module.exports = {
    getAllTags,
    createTag,
    updateTag,
    deleteTag
};