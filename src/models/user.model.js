import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '@config/config';

const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

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

  bcrypt.genSalt(config.hashSaltRound, function (err, salt) {
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
  return jwt.sign(user, config.secret, {
    expiresIn: config.tokenExpiration
  });
};

export default mongoose.model('user', UserSchema);
