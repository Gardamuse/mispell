const data = require('./data.js')
const common_words = data.common_words // 20k most common words in english, all lower-case
const pluralize = require('pluralize')

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
      commonality = 1
   } else {
      commonality = word_index / 20000
   }
   return commonality * word.length
}

function scramble(word, midOnly = true) {
   if (word.length < 4) return word

   let prefix = word.substr(0, 1)
   let mid = word.substr(0, word.length - 1).substr(1)
   let suffix = word.substr(word.length - 1, 1)

   if (midOnly) {
      let shuffledMid = mid.split('').sort(function(){return 0.5-Math.random()}).join('');
      console.log("|" + prefix + shuffledMid + suffix + "|")
      return prefix + shuffledMid + suffix
   } else {
      let shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
      console.log("|" + shuffled + "|")
      return shuffled
   }
}

module.exports.complexity_block = function(text, complexity) {
   // MANUAL PROCESSING
   // Split text on word boundaries
   let words = text.split(/\b/g)

   // Iterate over all words
   for (let i = 0; i < words.length; i++){
      // PREPARATION
      let word = words[i]

      // Remove capitalization. Save it for later.
      let capitalLetter = false
      let capitalAll = false
      if (word[0] === word[0].toUpperCase()) capitalLetter = true
      if (word.slice(-1) === word.slice(-1).toUpperCase()) capitalAll = true
      word = word.toLowerCase()

      // Remove plural form. Save it for later.
      let isSingular = false;
      let singular = pluralize(word, 1)
      if (singular === word) isSingular = true
      if (word !== "s") word = singular //Ignore lonely 's or they are removed

      // SCRAMBLE WORD
      if (module.exports.word_complexity(word) > complexity * 2) {
         word = scramble(word, false)
      } else if (module.exports.word_complexity(word) > complexity) {
         word = scramble(word, true)
      }

      // RESTORE
      // Restore capital letter if any
      if (capitalLetter) word = word.charAt(0).toUpperCase() + word.slice(1)
      if (capitalAll) word = word.toUpperCase()
      // Restore pluralization
      if (!isSingular) word = pluralize(word, 2)

      // Write back
      words[i] = word
   }
   //console.log(misspellByRule("summation"));

   return words.join('')
}