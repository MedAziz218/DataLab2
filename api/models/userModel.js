const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value set to false
  },
});

// static signup method
userSchema.statics.signup = async function (username, email, password,isAdmin=false) {
  if (!email || !password) {
    throw Error(
      "Veuillez entrer votre matricule et mot de passe pour vous connecter."
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Registration Number already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash,isAdmin:isAdmin });

  return user;
};
// static login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Veuillez fournir les informations requises : Matricule et Mot de passe.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Erreur: Matricule ou Mot de passe incorrect.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Erreur: Matricule ou Mot de passe incorrect.");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
