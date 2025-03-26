const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

const login = async (email, password) => {
    const user = await userRepository.findByQuery({ 'email': email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    return generateToken({ 
        id: user.id,
        email: user.email,
        name: user.name
    });

    return user;
}