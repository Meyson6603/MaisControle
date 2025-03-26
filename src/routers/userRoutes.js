const express = require('express');
const router = express.Router();
const errorHandler = require('../middleware/errorHandler.js');

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    listUsers,
} = require('../controllers/userController.js');

router.get('/', listUsers, errorHandler);
router.get('/:id', getUser, errorHandler);
router.post('/', createUser, errorHandler);
router.put('/:id', updateUser, errorHandler);
router.delete('/:id', deleteUser, errorHandler);

module.exports = router;