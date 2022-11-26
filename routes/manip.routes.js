const manipController = require('../controllers/manipController');
const router = require('express').Router();

router.post("/", manipController.addManip);
router.get('/', manipController.getAllManip);
router.get('/:id', manipController.getOneManip);
router.put("/:id", manipController.updateManip);
router.delete('/:id', manipController.deleteManip);

module.exports = router;