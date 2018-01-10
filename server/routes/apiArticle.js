const express = require('express');
const router = express.Router();
const articles = require('../controllers/apiArticle');
const authentication = require('../middlewares/Authentication')
const authorization = require('../middlewares/Authorization')
const imageHelper = require('../helpers/imageHelper')

router.get('/articles', articles.getArticle)
router.get('/articles/:id', articles.getArticlebyId)
router.post('/articles',
  authentication.authentication,
  authorization.isAdmin,
  imageHelper.multer.single('image'),
  imageHelper.sendUploadToGCS,
  articles.create
)
router.put('/articles/:id',
  authentication.authentication,
  authorization.isAdmin,
  imageHelper.multer.single('image'),
  imageHelper.sendUploadToGCS,
  articles.update
)
router.delete('/articles/:id',
  authentication.authentication,
  authorization.isAdmin,
  imageHelper.multer.single('image'),
  imageHelper.sendUploadToGCS,
  articles.deleteArticle
)

module.exports = router;
