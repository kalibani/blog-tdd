const Article = require('../models/apiArticle');

class ArticleAPI {
  static getArticle(req, res){
    Article.find().then((dataArticle) => { res.status(200).json(dataArticle)})
    .catch((err) => { res.status(404).send(err)})
  }

  static create(req, res){
    req.body.image = req.file.cloudStoragePublicUrl
    var newArticle = new Article(req.body)
    newArticle.save()
    .then((dataArticle) => {
      res.status(200).json({ message: 'Article Succesfully Added!', dataArticle })
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static getArticlebyId(req, res){
    Article.findById(req.params.id).then((dataArticle) => { res.status(200).json(dataArticle)})
    .catch((err) => { res.status(404).send(err)})
  }

  static update(req, res) {
    if(req.file){
      req.body.image = req.file.cloudStoragePublicUrl
    }
    Article.findById(req.params.id).then((data) => {
      return Object.assign(data, req.body)
    }).then((data) => {
      return data.save()
    }).then((updatedArticle) => {
      res.json({message: 'Succesfully Updated Article', updatedArticle})
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteArticle(req, res){
    Article.remove({_id : req.params.id})
      .then((result) => {
      res.json({ message: "User successfully deleted!", result });
    })
    .catch((err) => {
      res.send(err)
    })
  }

}

module.exports = ArticleAPI;
