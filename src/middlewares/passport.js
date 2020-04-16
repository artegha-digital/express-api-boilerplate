import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '@models/user';

class passportManager {
    initialize(){
        var opts = {
            jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            secretOrKey : process.env.jwt_secret
        }
        passport.use('user', new Strategy(opts, function(jwt_payload, done) {
            User.findOne({id: jwt_payload.id}, function(err, user) {
                if (err) done(err, false);
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
        return passport.initialize();
    }

    authenticate(req, res, next){
        passport.authenticate('user', { session: false}, (err, user, info) => {
            if (err) next(err);
            if (!user) {
                if (info.name === "TokenExpiredError") {
                    res.status(401).json({ message: "Your token has expired." });
                } else {
                    res.status(401).json({ message: info.message });
                    // res.json({success: false, msg: message.NOT_CONNECTED})
                }
            }
            req.user = user;
            next();
        })(req, res, next);
    };
}
export default new passportManager();
