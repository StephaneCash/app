const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

const routerUser = require('./routes/users.routes');
app.use('/api/users', routerUser);

const loginUser = require('./routes/loginUser.routes');
app.use('/api/user/authentification', loginUser);

const eleves = require('./routes/eleves.routes');
app.use('/api/eleves', eleves);

const filieres = require('./routes/filieres.routes');
app.use('/api/filieres', filieres);

const manip = require('./routes/manip.routes');
app.use('/api/manip', manip);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Le serveur tourne sur le port ' + PORT);
});