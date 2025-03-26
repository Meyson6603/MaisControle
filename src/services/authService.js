const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const login = async (email, password) => {
    const user = await userRepository.findByQuery({ email }, 1);
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
        throw new AppError('Invalid email or password', 401);
    }

    return generateToken({ 
        id: user.id,
        email: user.email,
        name: user.name
    });

    return user;
}

module.exports = {
    login
};