const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
  title:{
    type: String
  },
  content:{
    type: String
  },
  author:{
    type: String
  }
})

module.exports = mongoose.model('Article', articleSchema);
