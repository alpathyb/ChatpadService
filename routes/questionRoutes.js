const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router
  .route('/')
  .get(questionController.getAllItems)
  .post(questionController.createItem);

router.route('/insert-many').post(questionController.insertManyQuestions);

router
  .route('/:id')
  .get(questionController.getItem)
  .patch(questionController.updateItem)
  .delete(questionController.deleteItem);

module.exports = router;
