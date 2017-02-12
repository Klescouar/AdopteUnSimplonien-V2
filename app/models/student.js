const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const StudentSchema = new Schema({
    verified: Boolean,
    memberId: String,
    prenom: String,
    nom: String,
    age: Number,
    ville: String,
    photo: String,
    tags: Array,
    description: String,
    Sexe: String,
    Domaine: String,
    SpecialiteUn: String,
    SpecialiteDeux: String,
    SpecialiteTrois: String,
    Github: String,
    Linkedin: String,
    Portfolio: String,
    CV: String,
    Twitter: String,
    StackOverFlow: String,
    Mail: String,
    Contrat: Array,
    DatePromo: String,
    ProjetUn: String,
    ProjetDeux: String,
    ProjetTrois: String
});

module.exports = mongoose.model('Student', StudentSchema);
