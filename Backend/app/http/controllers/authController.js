const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {

    return {
        
        postLogin(req, res, next) {
       
            const { email, password } = req.body
            if(!email || !password) {
                console.log("All fields are required")
                return res.status(404).json({ message: "All fields are required"});;
            }

            passport.authenticate('local', (err, user, info)=> {
                if(err) {
                    console.log(err);
                    return next(err)
                }
                if(!user) {
                    console.log("Incorrect Credentials");
                    return res.status(404).json({ message: "Incorrect Credentials"});
                }
                req.logIn(user, (err) => {
                    if(err) {
                        console.log(err) 
                        return next(err)
                    }
                    console.log("userfound");
                    return res.status(200).json({ message: "Login successful",user:user});
                })
            })(req, res, next)
        },

        async postRegister(req, res) {
                const { name, email, password } = req.body

                // Validate request 

                if(!name || !email || !password) {
                    console.log("all feilds are required");
                    return res.status(400).json({ message: "All fields are required" });
                }

                // Check if email exists 

                const userExists = await User.exists({ email: email });

                if (userExists) {
                    console.log("Email already taken");
                    return res.status(400).json({ message: "Email already taken" });
                }

                // Hash password 
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a user 
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                user.save()
                .then((user) => {
                    console.log("registered");
                    return res.status(200).json({ message: "Registration successful", name });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(404).json({ message: "Something went wrong", name });;
                });

        },

       
    }
}

module.exports = authController;
