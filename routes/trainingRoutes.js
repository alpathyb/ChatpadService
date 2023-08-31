const express = require('express');
const trainingController = require('../controllers/trainingController');

const router = express.Router();

router
  .route('/')
  .get(trainingController.getAllItems)
  .post(trainingController.createItem);

router.route('/welcome').get(trainingController.welcome);
router.route('/start').get(trainingController.start);
router.route('/process').get(trainingController.process);
router.route('/diagnose').post(trainingController.diagnose);
router.route('/insert-many').post(trainingController.insertManyTrainings);

router
  .route('/:id')
  .get(trainingController.getItem)
  .patch(trainingController.updateItem)
  .delete(trainingController.deleteItem);

module.exports = router;
