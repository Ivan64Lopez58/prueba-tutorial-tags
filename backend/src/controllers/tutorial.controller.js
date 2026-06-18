const tutorialService = require("../services/tutorial.service");

// trae todos los tutoriales
const getTutorials = async (req, res, next) => {
    try {
        const { tag } = req.query;
        const tutorials = await tutorialService.getAllTutorials(tag);
        res.json(tutorials)
    } catch (error) {
        next(error);    
    }
};

// crea un nuevo tutorial
const createTutorial = async (req, res, next) => {
    try {
        const { 
            title,
            description,
            tagIds
        } = req.body;

        if (!title || !description){
            return res.status(400).json({
                message: "El título y la descripción son requeridos"
            });
        }
        const tutorial = await tutorialService.createTutorial({
            title, 
            description, 
            tagIds
        });

        res.status(201).json(tutorial);
    } catch (error) {
        next(error);
    }
};

// actualiza un tutorial
const updateTutorial = async (req, res, next) => {
    // validación básica, gestión de los errores
    try {
        const { id } = req.params;

        const { title, description } = req.body;

        if (!title || !description){
            return res.status(400).json({
                message: "El título y la descripción son requeridos"
            });
        }

        const tutorial = await tutorialService.updateTutorial(
            id, title, description
        );

        res.json(tutorial);
    } catch (error) {
        next(error)
    }
}

// elimina un tutorial
const deleteTutorial = async (req, res, next) => {
    try {
        const { id } = req.params;
        // validación básica
        if (!id){
            return res.status(400).json({
                message: "El Id del tutorial es requerido"
            })
        }

        await tutorialService.deleteTutorial(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getTutorials,
    createTutorial,
    updateTutorial,
    deleteTutorial
};