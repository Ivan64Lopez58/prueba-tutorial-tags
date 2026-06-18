const express = require("express");
const router = express.Router();
const {
    getTags,
    createTag,
    updateTag,
    deleteTag
} = require("../controllers/tag.controller");

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: "Obtener todas las etiquetas"
 *     responses:
 *       200:
 *         description: "Lista de etiquetas"
 */
router.get("/", getTags);

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: "Crear etiqueta"
 *     responses:
 *       201:
 *         description: "Etiqueta creada"
 */
router.post("/", createTag);

/**
 * @swagger
 * /api/tags/{id}:
 *  put:
 *      summary: Actualizar etiqueta por ID
 *      responses:
 *          200:
 *              description: Etiqueta actualizada
 */
router.put("/:id", updateTag);

/**
 * @swagger
 * /api/tags/{id}:
 *  delete:
 *      summary: Eliminar etiqueta por ID
 *      responses:
 *          200:
 *              description: Etiqueta eliminada
 */
router.delete("/:id", deleteTag);

module.exports = router;