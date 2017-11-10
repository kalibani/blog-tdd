let mongoose = require("mongoose");
let Article = require('../models/apiArticle');
var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app')

chai.use(chaiHttp)

describe('Articles', () => {
  beforeEach((done) => {
    Article.remove({}, (err) => {
     done();
    });
  });

  describe('Post article route', () => {
    it('should return the article data, after they\' re saved to the database', (done) => {
      chai.request(app)
      .post('/api/articles')
      .send({
        title: 'Jaenal Jadi Makin Tamvan',
        content: 'INI HOAX',
        author: 'Redha Pake H'
      })
      .end((err, response) => {
        response.status.should.eql(200)
        response.should.be.json;
        response.body.should.be.an('object')
        response.body.should.have.property('message').eql('Article Succesfully Added!')
        response.body.should.have.property('dataArticle')
        response.body.dataArticle.should.have.property('_id')
        response.body.dataArticle.should.have.property('title').eql('Jaenal Jadi Makin Tamvan')
        response.body.dataArticle.should.have.property('content').eql('INI HOAX')
        response.body.dataArticle.should.have.property('author').eql('Redha Pake H')
        done()
      })
    })
  })

  describe('/GET article route', () => {
    it('it should GET all the articles', (done) => {
      chai.request(app)
      .get('/api/articles')
      .end((err, response) => {
        response.status.should.eql(200);
        response.should.be.json;
        response.body.should.be.an('array');
        done();
      });
    });
  });

  describe('/GET article route', () => {
    it('it should GET a single article ', (done) => {
      let article = new Article({ title: "Mas Jainal Paling Tamvan se-Hackticv", content: "Saracen Hoax", author: 'Hary NP'});
      article.save((err, article) => {
        chai.request(app)
        .get('/api/articles/' + article.id)
        .end((err, response) => {
          response.status.should.eql(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('_id').eql(article.id)
          response.body.should.have.property('title')
          response.body.should.have.property('content')
          response.body.should.have.property('author')
          done();
        });
      });
    });
  })

  describe('/PUT article route', () => {
    it('it should UPDATE an article given the id', (done) => {
      let article = new Article({ title: "Mas Jainal Paling Tamvan se-Hackticv", content: "Saracen Hoax", author: 'Hary NP'});
      article.save((err, article) => {
        chai.request(app)
        .put('/api/articles/' + article.id)
        .send({ title: "Mas Jainal Paling Tamvan se-Hackticv Raya", content: "Saracen Hoax", author: 'Hary NP'})
        .end((err, response) => {
          // console.log(response);
          response.status.should.eql(200);
          response.body.should.be.an('object');
          response.body.should.have.property('message').eql('Succesfully Updated Article');
          response.body.should.have.property('updatedArticle')
          response.body.updatedArticle.should.have.property('title').eql('Mas Jainal Paling Tamvan se-Hackticv Raya');
          done();
        });
      });
    });
  });

  describe('/DELETE/:id article', () => {
    it('it should DELETE an article given the id', (done) => {
      let article = new Article({ title: "Mas Jainal Paling Tamvan se-Hackticv", content: "Saracen Hoax", author: 'Hary NP'});
      article.save((err, article) => {
        chai.request(app)
        .delete('/api/articles/' + article.id)
        .end((err, response) => {
          response.status.should.eql(200);
          response.body.should.be.an('object');
          response.body.should.have.property('message').eql('Succesfully deleted Article!');
          response.body.should.have.property('deletedArticle')
          response.body.deletedArticle.should.have.property('ok').eql(1);
          response.body.deletedArticle.should.have.property('n').eql(0);
          done();
        });
      });
    });
  });

});
