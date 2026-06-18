const prisma = require("../config/prisma");

// trae todas las etiquetas
const getAllTags = async () => {
    return await prisma.tag.findMany();
};

// crea una etiqueta
const createTag = async (name) => {
    return await prisma.tag.create({
        data: { name }
    });
};

// actualiza una etiqueta
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

// elimina una etiqueta
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