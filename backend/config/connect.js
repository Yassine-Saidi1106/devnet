const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grh100';

console.log('Tentative de connexion à MongoDB avec URI:', mongoURI);

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Connecté à MongoDB avec succès');
    })
    .catch((err) => {
        console.log('❌ Erreur de connexion MongoDB:', err);
    });