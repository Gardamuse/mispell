const data = require('./data.js')
const common_words = data.common_words // 20k most common words in english, all lower-case

module.exports.test = function() {
   let doc = nlp('He is cool.')
   doc.sentences().prepend('So i think')
   console.log(doc.text())
}

module.exports.bimbofy = require('./bimbofy.js').bimbofy

module.exports.word_complexity = function(word) {
   let nr_of_words = common_words.size
   let word_index = common_words.indexOf(word)
   let commonality = 0
   if (word_index == -1) {
      commonality = 2
   } else {
      commonality = word_index / 10000
   }
   return commonality * word.length
}
