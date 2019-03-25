//import data from './data.js'
//import nearly from 'nearly'
const data = require('./data.js')
const dict = data.dict

//console.log(dict)

/**
 * @param {double} bf - BimboFactor, a value between 0 and 1 describing the current level of bimbofication.
 */
function bimbofy(text, bf) {
   // Split text on word boundaries
   let words = data.text.split(/\b/g)

   // Iterate over all words
   for (let i = 0; i < words.length; i++){
      // Prepare word
      let word = words[i]
      let capitalLetter = false
      if (word[0] === word[0].toUpperCase()) capitalLetter = true
      word = word.toLowerCase()

      // If there is a misspelling, maybe misspell it
      if (word in dict && Math.random() < 0.4 * bf) {
         // DICTIONARY MISSPELLING
         let entry = dict[word]
         // Pick a word where the spellings are weighted
         if (entry[0].constructor == Object) {
            word = pickRandomWeighted(entry).spelling
         } else { // Or not weighted, if word.constructor == String
            let index = Math.floor(Math.random() * dict[word].length)
            word = entry[index]
         }
         // Replace underscores in dict with spaces
         word = word.replace('_', ' ')

      } else if (Math.random() < 0.4 * bf) {
         // REGEXP MISSPELLING
         word = removeDuplicateChars(word)
      }

      // Rebuild capital letter if any
      if (capitalLetter) word = word.charAt(0).toUpperCase() + word.slice(1)
      // Write back
      words[i] = word
   }
   console.log(removeDuplicateChars("summation"));

   return words.join('')
}

console.log(bimbofy(data.text, 1));

function pickRandomWeighted(weightedList) {
   let totalWeight = 0;
   for (let i = 0; i < weightedList.length; i++) {
      totalWeight += weightedList[i].weight
   }
   let rand = Math.random() * totalWeight
   for (let i = 0; i < weightedList.length; i++) {
      rand -= weightedList[i].weight
      if (rand < 0) return weightedList[i]
   }
   throw("Error picking a random weighted element.")
}

function removeDuplicateChars(string) {
   lastChar = ""
   output = ""
   for (let i = 0; i < string.length; i++) {
      if (lastChar !== string.charAt(i)) {
         output += string.charAt(i)
         lastChar = string.charAt(i)
      }
   }
   //console.log(string, "->", output);
   return output
}
