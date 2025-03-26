const authService = require('../services/authService.js');


const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const token = await authRepository.login(email, password);
        res.cookie('token', token, { 
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 15)
         });
        res.status(200).json(token);
    }catch(error){      
        next(error);
    }
}

module.exports = {
    login
};