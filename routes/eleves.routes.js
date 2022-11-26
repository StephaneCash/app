const eleveController = require('../controllers/eleveController');
const router = require('express').Router();

router.post("/", eleveController.addEleve);
router.get('/', eleveController.getAllEleves);
router.get('/:id', eleveController.getOneEleve);
router.put("/:id", eleveController.updateEleve);
router.delete('/:id', eleveController.deleteEleve);

module.exports = router;