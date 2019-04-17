//import data from './data.js'
//import nearly from 'nearly'
const data = require('./data.js')
const dict = data.dict
const pluralize = require('pluralize')
const nlp = require('compromise')

//console.log(dict)

class FrequencyLog {
   constructor() {
      this.lastLike = 0
   }

   allowLike() {
      if (this.lastLike > 2) {
         this.lastLike = 0
         return true
      }
      this.lastLike += 1
      return false
   }
}

/**
 * @param {double} bf - BimboFactor, a value between 0 and 1 describing the current level of bimbofication.
 */
module.exports.bimbofy = function (text, bf) {
   // Replace curly quotes in text
   text = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
   fqLog = new FrequencyLog()
   enabled = true

   // NATURAL LANGUAGE PROCESSING LIBRARY
   // Spell out numbers
   let doc = nlp(text)
   if (bf > 0.5) {
      //doc.values().toText()
   }
   if (bf > 0.5) {
      doc.contractions().contract()
   }
   {
      let rand = Math.random()
      // Begin some sentences with "Sooo"
      // End some sentences with ", like, you know"
      //doc.out('debug')
      doc.sentences().forEach((match) => {
         //let sentence = nlp(match.data()[0].text)
         //sentence.sentences().prepend('sooo,');
         //console.log("Sentence:", match);
         match.out('debug')
      })
      doc.match('!#EndQuotation #Verb #Noun').forEach((match) => {
         if (Math.random() < 0.3 * bf && enabled) {
            let rw = pickRandomWeighted([
               {spelling: 'basically', weight: 1},
               {spelling: 'totally', weight: 1},
            ]).spelling
            //console.log("2:", match.data()[0])
            match.insertAfter(rw)
         }
      })
      doc.match('!#EndQuotation [#Conjunction] #Verb').forEach((match) => {
         if (Math.random() < 0.3 * bf && enabled) {
            let rw = pickRandomWeighted([
               {spelling: 'basically', weight: 1},
               {spelling: 'totally', weight: 1}
            ]).spelling
            //console.log("2:", match.data()[0])
            match.insertAfter(rw)
         }
      })
      doc.match('#Value').values().toNumber().forEach((match) => {
         let w = match.data()[0].nice
         //match.replace()
         //w.replace('0', '?')
         //console.log(w);
         //match.out('debug')
      })
      // Country girl speech: giving -> givin'
      doc.not('#Verb$').match('#Verb').match('_ing').forEach((match) => {
         if (Math.random() < 1 && enabled) {
            let w = match.data()[0].normal
            match.replaceWith(w.replace('ing', 'in\''))
            //console.log(match.data()[0]);
         }
      })
      //doc.match('(are|were|was)').insertAfter('sooo');
      // Of everything that is not a verb at end of sentence, pick all verbs
      doc.not('#Verb$').match('#Verb').forEach((match) => {
         if (fqLog.allowLike() && Math.random() < 0.4 * bf && enabled) {
            let rw = pickRandomWeighted([
               //{spelling: ' like', weight: 0.7},
               {spelling: ', like,', weight: 0.7},
               {spelling: ', like whatever,', weight: 0.1}
            ]).spelling
            match.setPunctuation(rw)//.insertAfter(rw);
         }
      })
      doc.not('^#Adjective').match('#Adjective').forEach((match) => {
         // Don't insert before words beginning with quotation marks
         // Words might start with a space, so checking for any quotations
         if (!match.data()[0].text.includes('"')) {
            //console.log("Adj:", match.data()[0].text);
            let rw = pickRandomWeighted([
               {spelling: 'literally', weight: 0.5},
               //{spelling: 'totally', weight: 1},
               {spelling: 'actually', weight: 0.5},
               {spelling: 'basically', weight: 1},
               {spelling: 'absolutely', weight: 1},
               {spelling: 'you know,', weight: 1}
            ]).spelling
            let rw2 = pickRandomWeighted([
               {spelling: 'um', weight: 0.4},
               {spelling: 'uh,', weight: 1}
            ]).spelling
            let rw3 = pickRandomWeighted([
               {spelling: 'kinda', weight: 1},
               {spelling: 'sorta', weight: 1},
            ]).spelling

            if (Math.random() < 0.2 * bf && enabled) {
               match.insertBefore(rw2);
            }
            if (Math.random() < 0.3 * bf && enabled) {
               match.insertBefore(rw3);
            }
            if (Math.random() < 0.6 * bf && enabled) {
               match.insertBefore(rw);
            }

         }
      })
      /*doc.adjectives().filter(() => {
         return Math.random() < 0.25 * bf}).insertBefore('literally')*/
      //console.log(doc.verbs().data());
   }
   text = doc.out('text')

   if (enabled) {
      //text = manualProcessing(text, bf)
   }
   return text
}

function manualProcessing(text, bf) {
   // MANUAL PROCESSING
   // Split text on word boundaries
   let words = text.split(/\b/g)

   // Iterate over all words
   for (let i = 0; i < words.length; i++){
      // PREPARATION
      let word = words[i]

      /*if (word === "'" && words[i+1] == "s") {
         words[i] = " "
         words[i+1] = "is"
         continue
      }*/

      // Remove capitalization. Save it for later.
      let capitalLetter = false
      let capitalAll = false
      if (word[0] === word[0].toUpperCase()) capitalLetter = true
      if (word.slice(-1) === word.slice(-1).toUpperCase()) capitalAll = true
      word = word.toLowerCase()

      // Remove plural form
      let isSingular = false;
      let singular = pluralize(word, 1)
      if (singular === word) isSingular = true
      if (word !== "s") word = singular //Ignore lonely 's or they are removed

      // If there is a misspelling, maybe misspell it
      if (Math.random() < 0.5 * bf) {
         // DICTIONARY MISSPELLING
         let spelling = pickSpelling(word)

         // Replace underscores in dict with spaces
         if (spelling !== word) {
            word = spelling.replace('_', ' ')
         }
      }
      if (Math.random() < 0.5 * bf) {
         // REGEXP MISSPELLING
         word = misspellByRule(word)
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

function pickSpelling(word) {
   if (!(word in dict)) return word
   let entry = dict[word]

   if (entry[0].constructor == Object) {
      let picked = pickRandomWeighted(entry)
      if ('synonym' in picked) {
         return pickSpelling(picked.synonym)
      }
      return picked.spelling
   } else { // Or not weighted, if word.constructor == String
      let index = Math.floor(Math.random() * dict[word].length)
      return entry[index]
   }
}

function pickRandomWeighted(weightedList) {
   let totalWeight = 0;
   for (let i = 0; i < weightedList.length; i++) {
      if (!("weight" in weightedList[i])) weightedList[i].weight = 1
      totalWeight += weightedList[i].weight
   }
   let rand = Math.random() * totalWeight
   for (let i = 0; i < weightedList.length; i++) {
      rand -= weightedList[i].weight
      if (rand < 0) return weightedList[i]
   }
   throw("Error picking a random weighted element.")
}

function pickRandom(list) {
   return list[Math.floor(Math.random()*list.length)];
}

function misspellByRule(string) {
   let lastChar = ""
   let output = ""
   //console.log(string);
   string = string.replace(/bility\b/, "ilty")
   string = string.replace(/tible\b/, "tidle")
   string = string.replace(/tes\b/, "ties")
   string = string.replace(/ces\b/, "cies")
   string = string.replace(/ges\b/, "gies")
   string = string.replace(/uter\b/, "tuer")
   //console.log(string);
   for (let i = 0; i < string.length; i++) {
      let c = string.charAt(i);
      if (c === "." || c === "." || c === "!" || c === "?") {
         // Do nothing
      } else if (lastChar === "t" && c === "h") { // th
         output = output.slice(0, -1) + "d"
         lastChar = "d"
         continue
      } else if (lastChar === "e" && c === "e") { // ee
         output = output.slice(0, -1) + "i"
         lastChar = "i"
         continue
      } if (lastChar === "o" && c === "u") { // ou
         output = output.slice(0, -1) + "u"
         lastChar = "u"
         continue
      } else if (c === lastChar) { // Repeated character
         lastChar = c
         continue
      }
      lastChar = c
      output += c
   }
   //console.log(string, "->", output);
   return output
}
