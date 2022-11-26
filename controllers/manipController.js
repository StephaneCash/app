const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Manip = db.manipulations;

const addManip = async (req, res) => {
    try {
        let manip = await Manip.create(req.body);
        let message = 'Manip ajoutée avec succès';
        if (manip) {
            res.status(201).json({ message, data: manip })
        } else {
            return res.status(400).json({ message: "Manip non ajouté" })
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err
            });
        };

        if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err
            });
        };
    }
}

const getAllManip = async (req, res) => {

    try {
        let manip = await Manip.findAll({
            include: [
                {
                    model: db.eleves,
                    as: "eleves"
                }]
        });
        let taille = manip.length;
        let message = "La liste des manip a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: manip, taille });
        } else {
            return res.status(400).json({ message: "Aucune manip trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneManip = async (req, res) => {
    let id = req.params.id;
    try {
        let manip = await Manip.findOne({ where: { id: id } });

        if (manip) {
            let message = "La manip a été trouvée avec succès";
            res.status(200).json({ message, data: manip })
        } else {
            let message = "Aucune manip n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message, data: manip })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateManip = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findManipById = await Manip.findOne({ where: { id: id } });

        if (findManipById) {
            let message = "La manip a été modifiée avec succès";

            let manipUpdated = await Manip.update({
                nom: data.nom, desciption: data.desciption, cote: data.cote
            }, { where: { id: id } });

            if (manipUpdated) {
                let manip = await Manip.findOne({ where: { id: id } });
                res.status(200).json({ message, data: manip });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucune manip n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteManip = async (req, res) => {
    let id = req.params.id;

    try {
        let findManipById = await Manip.findOne({ where: { id: id } });

        if (findManipById) {
            let manipDeleted = await Manip.destroy({ where: { id: id } });

            if (manipDeleted) {
                let message = "Manip a été supprimée avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Manip n'a pa été supprimée ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucune manip n'a été trouvée avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addManip, getAllManip, getOneManip, updateManip, deleteManip
}