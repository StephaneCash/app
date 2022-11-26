module.exports = (sequelize, DataTypes) => {
    const Manip = sequelize.define("manipulations", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom manip' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom manip est un champ obligatoire !" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'description' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Description est un champ obligatoire !" }
            }
        },
        cote: {
            type: DataTypes.INTEGER,
        },
    })

    return Manip
}