const Article = require('../models/apiArticle');

class ArticleAPI {
  static getArticle(req, res){
    Article.find().then((dataArticle) => { res.status(200).json(dataArticle)})
    .catch((err) => { res.status(404).send(err)})
  }

  static create(req, res){
    var newArticle = new Article(req.body)
    newArticle.save().then((dataArticle) => { res.status(200).json({ message: 'Article Succesfully Added!', dataArticle })})
    .catch((err) => { res.status(404).send(err)})
  }

  static getArticlebyId(req, res){
    Article.findById(req.params.id).then((dataArticle) => { res.status(200).json(dataArticle)})
    .catch((err) => { res.status(404).send(err)})
  }

  static update(req, res) {
    Article.findById(req.params.id).then((data) => {
      return Object.assign(data, req.body)
    }).then((data) => { return data.save()}).then((updatedArticle) => {
      res.json({message: 'Succesfully Updated Article', updatedArticle})
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteArticle(req, res){
    Article.remove(req.params.id).then((deletedArticle) => {
      res.status(200).json({message: 'Succesfully deleted Article!', deletedArticle})
    }).catch((err) => { res.send(err)})
  }

}

module.exports = ArticleAPI;
