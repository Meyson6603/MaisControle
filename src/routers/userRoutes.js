const express = require('express');
const router = express.Router();

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    listUsers,
} = require('../controllers/userController.js');

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;