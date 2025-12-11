const express = require("express")
const bookController = require('../Controllers/bookController')
const router = express.Router();
const {authenticate} = require('../middleware/auth')
const {authorize} = require('../middleware/role')

router.get('/getBooks',authenticate,bookController.getAll)


router.post('/book/reg',authenticate, authorize('ADMIN'),bookController.create)
router.delete('/del/:id',authenticate, authorize('ADMIN'),bookController.deleteBook)
router.put('/update/:id',authenticate, authorize('ADMIN'),bookController.updateBook)
router.put('/status/:id',authenticate,authorize('ADMIN'),bookController.updateStatus)


module.exports = router;

