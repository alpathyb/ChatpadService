const express = require('express');
const historyController = require('../controllers/historyController');

const router = express.Router();

router
  .route('/')
  .get(historyController.getAllItems)
  .post(historyController.createItem);

router
  .route('/:id')
  .get(historyController.getItem)
  .patch(historyController.updateItem)
  .delete(historyController.deleteItem);

module.exports = router;
