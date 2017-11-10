const express = require('express');
const router = express.Router();
const articles = require('../controllers/apiArticle');

router.get('/articles', articles.getArticle)
router.get('/articles/:id', articles.getArticlebyId)
router.post('/articles', articles.create)
router.put('/articles/:id', articles.update)
router.delete('/articles/:id', articles.deleteArticle)

module.exports = router;
