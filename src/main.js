const data = require('./data.js')
const common_words = data.common_words // 20k most common words in english, all lower-case
const pluralize = require('pluralize')
const nlp = require('compromise').default
const seedrandom = require('seedrandom')

module.exports.test = function() {
   let doc = nlp('He is cool.')
   doc.sentences().prepend('So i think')
   console.log(doc.text())
}

module.exports.bimbofy = require('./bimbofy.js').bimbofy

module.exports.word_complexity = function(word) {
   let nr_of_words = common_words.size

   let doc = nlp(word.toLowerCase())
   doc.normalize({possessives: true, plurals: true, verbs: true})
   word = doc.out('text')

   //console.log(word)

   let word_index = common_words.indexOf(word)
   let commonality = 0
   if (word_index == -1) {
      commonality = 10
   } else {
      commonality = word_index / 1000
   }
   return Math.log(1 + commonality * Math.max(1, word.length - 3))
}

function scramble(word, midOnly = true) {
   if (word.length < 4) return word

   let prefix = word.substr(0, 1)
   let mid = word.substr(0, word.length - 1).substr(1)
   let suffix = word.substr(word.length - 1, 1)

   let rng = seedrandom(word)

   if (midOnly) {
      let shuffledMid = mid.split('').sort(function(){return 0.5-rng()}).join('');
      //console.log("|" + prefix + shuffledMid + suffix + "|")
      return prefix + shuffledMid + suffix
   } else {
      let shuffled = word.split('').sort(function(){return 0.5-rng()}).join('');
      //console.log("|" + shuffled + "|")
      return shuffled
   }
}

function randomLetters(length, seed = Math.random()) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvw';
   var charactersLength = characters.length;

   let rng = seedrandom(seed)
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(rng() * charactersLength));
   }
   return result;
}

function bimbofactorToComplexity(bf) {
   return Math.max(0, 0.2 + (1 - bf) * 5)
}

function getLeadingWhitespace(text) {
   let noWhiteSpace = text.trimStart()
   return text.substr(0, text.length - noWhiteSpace.length)
}

function getTrailingWhitespace(text) {
   let noWhiteSpace = text.trimEnd()
   return text.substr(noWhiteSpace.length, text.length)
}

module.exports.scramble_complexity = function(inputText, bf) {
   max_complexity = bimbofactorToComplexity(bf)
   // MANUAL PROCESSING

   // Remove whitespace
   let text = inputText.trim()
   // Split text on word boundaries
   let words = text.split(/\b/g)

   // Iterate over all words
   for (let i = 0; i < words.length; i++){
      // PREPARATION
      let word = words[i]
      if (word.length < 4 || word.charAt(0) === ".") {
         continue
      }

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
      let complexity = module.exports.word_complexity(word)
      console.log(("|" + word + "|").padEnd(20), complexity.toFixed(3))
      if (complexity > max_complexity * 4) {
         word = randomLetters(word.length, word)
      } else if (complexity > max_complexity * 2) {
         word = scramble(word, false)
      } else if (complexity > max_complexity) {
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

   // Join words and restore leading whitespace
   let outputText = `${getLeadingWhitespace(inputText)}${words.join('')}`

   return outputText
}