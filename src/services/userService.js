const UserRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');


const createUser = async (user) => {
	const { name, email, password } = user;
  	if (!name || !email || !password) {
    	throw new AppError('name, email and password are required', 400);
  	}
    user.password = await bcrypt.hash(password, 10);
  	return UserRepository.createUser(user);
}

const listUsers = async () => {
  return UserRepository.listUsers();
}

const getUser = async (id) => {
    if (!id) {
        throw new AppError('Invalid user id', 400);
    }
    const user = await UserRepository.getUser(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
}

const updateUser = async (id, user) => {
    if (!id) {
        throw new AppError('Invalid user id', 400);
    }
	const { name, email, password } = user;
  	if (!name || !email || !password) {
    	throw new AppError('name, email and password are required', 400);
  	}
    user.password = await bcrypt.hash(password, 10);
    return UserRepository.updateUser(id, user);
}

const deleteUser = async (id) => {
    const user = await UserRepository.getUser(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    if (!id) {
        throw new AppError('Invalid user id', 400);
    }
    return UserRepository.deleteUser(id);
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};