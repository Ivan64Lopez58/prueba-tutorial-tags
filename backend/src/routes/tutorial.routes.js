const express = require("express");
const router = express.Router();
const {
    getTutorials,
    createTutorial,
    updateTutorial,
    deleteTutorial
} = require("../controllers/tutorial.controller");

/**
 * @swagger
 * /api/tutorials:
 *   get:
 *     summary: "Obtener todos los tutoriales"
 *     responses:
 *       200:
 *         description: "Lista de tutoriales"
 */
router.get("/", getTutorials);

/**
 * @swagger
 * /api/tutorials:
 *   post:
 *     summary: "Crear tutorial"
 *     responses:
 *       201:
 *         description: "Tutorial creado"
 */
router.post("/", createTutorial);

/**
 * @swagger
 * /api/tutorials/{id}:
 *   put:
 *     summary: Actualizar tutorial por ID
 *     responses:
 *       200:
 *         description: Tutorial actualizado
 */
router.put("/:id", updateTutorial);

router.put("/:id", updateTutorial);

/**
 * @swagger
 * /api/tutorials/{id}:
 *  delete:
 *      summary: Eliminar tutorial por ID
 *      responses:
 *          200:
 *              description: Tutorial eliminado
 */
router.delete("/:id", deleteTutorial);

module.exports = router;