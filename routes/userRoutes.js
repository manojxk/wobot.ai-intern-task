const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    getUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', protect, getUsers)
router.get('/:id', protect, getUser)
module.exports = router