const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const {User} = require("../models/user")
const keys = require("../config/keys")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = function(passport){
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await User.findOne({where: {
                    email: payload.email
                    }
                })
                if(user){
                    done(null, {
                        email: user.user_email,
                    })
                }
                else{
                    done(null, false)
                }
            }
            catch(err){
                console.log(err)
            }

        })
    )
}