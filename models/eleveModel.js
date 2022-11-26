module.exports = (sequelize, DataTypes) => {
    const Eleve = sequelize.define("eleves", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom élève' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom élève est un champ obligatoire !" }
            }
        },
        postnom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Postnom élève' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Postnom élève est un champ obligatoire !" }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'prenom élève' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Prenom élève est un champ obligatoire !" }
            }
        },
        sexe: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Sexe élève' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Sexe élève est un champ obligatoire !" }
            }
        }
    })

    return Eleve
}