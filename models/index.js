const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connexion réussie à la base de données');
    }).catch((err) => {
        console.log("Erreur : ", err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.eleves = require('./eleveModel')(sequelize, DataTypes);
db.filieres = require('./filiereModel')(sequelize, DataTypes);
db.manipulations = require("./manipModel")(sequelize, DataTypes);

db.filieres.hasMany(db.eleves, {
    as: "eleves"
});

db.eleves.belongsTo(db.filieres, {
    foreignKey: "filiereId",
    as: "filieres"
});

db.manipulations.hasMany(db.eleves, {
    as: "eleves"
});

db.eleves.belongsTo(db.manipulations, {
    foreignKey: "manipulationId",
    as: "manipulations"
});

db.sequelize.sync({ force: false }).then(() => {
    console.log('Mdels synchronisés ')
});

module.exports = db;