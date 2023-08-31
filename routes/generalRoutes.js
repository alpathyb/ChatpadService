const express = require('express');
const generalController = require('../controllers/generalController');

const router = express.Router();

router
  .route('/')
  .get(generalController.getAllItems)
  .post(generalController.createItem);

router.route('/start').get(generalController.start);
router.route('/process').get(generalController.process);
router.route('/insert-many').post(generalController.insertManyGenerals);

router
  .route('/:id')
  .get(generalController.getItem)
  .patch(generalController.updateItem)
  .delete(generalController.deleteItem);

module.exports = router;
