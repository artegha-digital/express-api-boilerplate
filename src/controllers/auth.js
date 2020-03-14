// files
import User from '@models/user.model'

const Auth = {
  register: (req, res, next) => {
    if (!req.body && !req.body.email && !req.body.password) {
      res.json({error: ''})
    }
    const { email, password } = req.body
    email = email.trim().toLowerCase();
    password = password.trim();

    User.findOne({ email: email }, (err, user) => {
      if (err) return next(err);

      if (user) {
        return res.status(400).send({
          error: 'Registration failed. Email already in use'
        });
      }
      let newUser = new User({
        email: email,
        password: password
      });
      newUser.save((err, user) => {
        if (err) return next(err);

        let sanitizedUserInfos = User.sanitizeUserInfos(user);

        res.status(201).json({
          message: 'Registration succeed',
          token: User.generateToken(sanitizedUserInfos),
          user: sanitizedUserInfos
        });
      });
    });
  },

  login: (req, res, next) => {
    if (!req.body && !req.body.email && !req.body.password) {
      res.json({error: ''})
    }
    const { email, password } = req.body
    email = email.trim().toLowerCase();
    password = password.trim();

    User.findOne({ email: email }, (err, user) => {
      if (err) return next(err);

      if (!user) {
        return res.status(400).send({
          error: 'Authentication failed. User not found'
        });
      }

      user.comparePassword(password, (err, isMatching) => {
        if (err) return next(err);

        if (!isMatching) {
          return res.status(400).send({
            error: 'Authentication failed. Invalid password'
          });
        }

        let sanitizedUserInfos = User.sanitizeUserInfos(user);

        res.status(200).json({
          message: 'Authentication succeed',
          token: User.generateToken(sanitizedUserInfos),
          user: sanitizedUserInfos
        })
        });
      });
  }
}
export default Auth;
