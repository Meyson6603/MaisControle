const userService = require('../services/userService.js');

const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        const newUser = await userService.createUser(user);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

const listUsers = async (req, res, next) => {
    try {
        const users = await userService.listUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const updatedUser = await userService.updateUser(id, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser,
};