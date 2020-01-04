//import data from './data.js'
//import nearly from 'nearly'
const data = require('./data.js')
const dict = data.dict
const pluralize = require('pluralize')
const nlp = require('compromise')
const nlpNumbers = require('compromise-numbers')
const nlpSentences = require('compromise-sentences')
const metaphone = require('talisman/phonetics/metaphone')

nlp.extend(nlpNumbers)
nlp.extend(nlpSentences)

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

module.exports.test = function() {
   let doc = nlp('He is cool.')
   doc.sentences().prepend('So i think')
   console.log(doc.text())
}

/**
 * @param {double} bf - BimboFactor, a value between 0 and 1 describing the current level of bimbofication.
 */
module.exports.bimbofy = function (text, bf) {
   if (text == "") return "";
   // Replace curly quotes in text
   text = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
   fqLog = new FrequencyLog()
   enabled = true // Debug tool. Enabled = true makes some transforms not run.

   // NATURAL LANGUAGE PROCESSING LIBRARY
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
         //match.out('debug')
         //match.prepend('soo,')
      })
      doc.match('#TitleCase').forEach((match) => {
         //match.out('debug')
      })
      // EndQuotation doesn't seem to match anything.
      doc.match('#Verb #Noun').forEach((match) => {
         if (Math.random() < 0.3 + 2 * bf && enabled) {
            let rwBefore = pickRandomWeighted([
               {spelling: 'basically', weight: 1},
               {spelling: 'totally', weight: 1},
               {spelling: 'so', weight: 1}
            ]).spelling
            //console.log("1:", match.data()[0])
            match.prepend(rwBefore)
         }
      })
      doc.match('!#EndQuotation [#Conjunction] #Verb').forEach((match) => {
         if (Math.random() < 0.3 * bf && enabled) {
            let rw = pickRandomWeighted([
               {spelling: 'basically', weight: 1},
               {spelling: 'totally', weight: 1},
               {spelling: 'so', weight: 1}
            ]).spelling
            //console.log("2:", match.data()[0])
            match.append(rw)
         }
      })

      // Simulate number confusion by changing large numbers
      doc.numbers().greaterThan(20).forEach((match) => {
         let value = match.numbers().json()[0].number
         let newValue = Math.round(value/2 + value * Math.random())
         if (newValue > 20) {
            newValue = Math.round(newValue/10) * 10
            match.numbers().set(newValue)
         } if (newValue > 100) {
            newValue = Math.round(newValue/100) * 100
            match.numbers().set(newValue)
         } if (newValue > 1000) {
            newValue = Math.round(newValue/1000) * 1000
            match.numbers().set(newValue)
         } if (newValue >= 10000) {
            match.replace("lots")
         }
         //match.numbers().set(newValue)
         //console.log("Number", value, match.text());
      })

      // Spell out numbers
      doc.numbers().forEach((match) => {
         match.numbers().toText()
         //console.log("Number2:", match.text());
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
               {spelling: ', like, ', weight: 0.7},
               {spelling: ', like whatever, ', weight: 0.1}
            ]).spelling
            match.post(rw)
            //match.append(rw)//.insertAfter(rw);
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
      text = manualProcessing(text, bf)
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

      // Remove plural form. Save it for later.
      let isSingular = false;
      let singular = pluralize(word, 1)
      if (singular === word) isSingular = true
      if (word !== "s") word = singular //Ignore lonely 's or they are removed

      // DICTIONARY MISSPELLING
      // If there is a misspelling, misspell it
      let spelling = pickSpelling(word)
      let isSynonym = spelling !== word // Remember if we changed the word.

      // Replace underscores in dict with spaces
      if (spelling !== word) {
         word = spelling.replace('_', ' ')
      }


      // RESTORE
      // Restore capital letter if any
      if (capitalLetter) word = word.charAt(0).toUpperCase() + word.slice(1)
      if (capitalAll) word = word.toUpperCase()
      // Restore pluralization
      if (!isSingular) word = pluralize(word, 2)

      // REGEXP MISSPELLING.
      // Re-pluralization can't handle misspelled words, so this is done after.
      // Also only mispell words that we did not find in dictionary.
      if (!isSynonym && Math.random() < 1 * bf) { // TODO Multiplier to 0.5
         word = misspellByRule(word)
      }

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
   string = string.replace(/\bth(?!i)/, "d") // th -> d, when not followed
   string = string.replace(/ph\B/, "f")
   string = string.replace(/ee/, "ea")
   string = string.replace(/ou/, "u")
   string = string.replace(/([sv])e\b/, "$1")
   string = string.replace(/([b-df-hj-npv-z])r\B/, "$1w") //brains -> bwains
   string = string.replace(/s\b/, "z") //brains -> brainz
   //console.log(string);

   for (let i = 0; i < string.length; i++) {
      let c = string.charAt(i);
      if (c === "." || c === "." || c === "!" || c === "?") {
         // Do nothing
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

function replaceMaybe(string, regex, replacement, probability) {
   if (Math.random() < probability) {
      string = string.replace(regex, replacement)
   }
   return string
}
