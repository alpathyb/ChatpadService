const express = require('express');
const generalHistoryController = require('../controllers/generalHistoryController');

const router = express.Router();

router
  .route('/')
  .get(generalHistoryController.getAllItems)
  .post(generalHistoryController.createItem);

router
  .route('/:id')
  .get(generalHistoryController.getItem)
  .patch(generalHistoryController.updateItem)
  .delete(generalHistoryController.deleteItem);

module.exports = router;
