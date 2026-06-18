const tutorialService = require("../services/tutorial.service");

const getTutorials = async (req, res, next) => {
    try {
        const { tag } = req.query;
        const tutorials = await tutorialService.getAllTutorials(tag);
        res.json(tutorials)
    } catch (error) {
        next(error);    
    }
};

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


const updateTutorial = async (req, res, next) => {
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


const deleteTutorial = async (req, res, next) => {
    try {
        const { id } = req.params;
        
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