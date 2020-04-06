import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
   type: Boolean,
   default: false
 }
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(process.env.hashSaltRound, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, function (err, hash) {
      if (err) return next(err);
      this.password = hash;
      this.id = uuidv4()
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (passw, next) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) return cb(err);
    next(null, isMatch);
  });
};

UserSchema.statics.generateToken = function(user) {
  return jwt.sign(user, process.env.secret, {
    expiresIn: process.env.tokenExpiration
  });
};

export default mongoose.model('user', UserSchema);
