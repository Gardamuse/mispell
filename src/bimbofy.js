import data from './data.js'
const dict = data.dict
//import nearly from 'nearly'
//const data = require('./data.js')
import pluralize from "pluralize"
//const metaphone = require('talisman/phonetics/metaphone')

// .default is needed after running webpack for some reason
// Note that .default can't be used if using this file without webpacking first
import nlp from "compromise"
import nlpNumbers from "compromise-numbers"
import nlpSentences from "compromise-sentences";

nlp.extend(nlpNumbers)

class FrequencyLog {
    constructor() {
        this.lastLike = 2
    }

    allowLike() {
        if (this.lastLike > 1) {
            this.lastLike = 0
            return true
        }
        this.lastLike += 1
        return false
    }
}

function getLeadingWhitespace(text) {
    let noWhiteSpace = text.trimStart()
    return text.substr(0, text.length - noWhiteSpace.length)
}

function getTrailingWhitespace(text) {
    let noWhiteSpace = text.trimEnd()
    return text.substr(noWhiteSpace.length, text.length)
}

/**
 * @param {double} bf - BimboFactor, a value between 0 and 1 describing the current level of bimbofication.
 */
export function bimbofy(inputText, bf) {
    // Remove whitespace
    let text = inputText.trim()

    if (text === "") return inputText;
    // Replace curly quotes in text
    text = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');

    text = nlpProcessing(text, bf)

    text = manualProcessing(text, bf)

    // Restore leading whitespace
    let outputText = `${getLeadingWhitespace(inputText)}${text}${getTrailingWhitespace(inputText)}`
    return outputText
}

function nlpProcessing(inputText, bf) {
    let fqLog = new FrequencyLog()

    let text = inputText

    // NATURAL LANGUAGE PROCESSING LIBRARY
    let doc = nlp(text)

    if (bf > 0.5) {
        doc.contractions().contract()
    }
    {
        let rand = Math.random()
        // Begin and end sentences
        // BUG: Disabled because sentences that start with a quotation mark has an extra quotation mark inserted
        doc.sentences().forEach((match) => {
            match.replace('"', '')
            let likelihood = 0.5
            if (match.wordCount() <= 3) likelihood *= 0
            else if (match.wordCount() <= 5) likelihood *= 0.5

            if (Math.random() < likelihood * bf) {
                //console.log("Match:", match.data()[0].text)
                let end = pickRandomWeighted([
                    {spelling: 'and stuff', weight: 1},
                    {spelling: 'or whatever', weight: 1},
                    {spelling: 'you know', weight: 1},
                ]).spelling
                match.append(end)
            }
        })
        doc.match('#TitleCase').forEach((match) => {
            //match.out('debug')
        })
        // EndQuotation doesn't seem to match anything.
        doc.match('#Verb #Noun').forEach((match) => {
            if (Math.random() < 0.3 * bf) {
                let rwBefore = pickRandomWeighted([
                    {spelling: 'basically', weight: 1},
                    {spelling: 'totally', weight: 1},
                    {spelling: 'so', weight: 1}
                ]).spelling
                let matchText = match.data()[0].text
                if (startsWithUppercase(matchText)) {
                    rwBefore = capitalizeFirstLetter(rwBefore)
                }
                //console.log("1:", match.data()[0])
                match.prepend(rwBefore)
            }
        })
        doc.match('!#EndQuotation [#Conjunction] #Verb').forEach((match) => {
            if (Math.random() < 0.3 * bf) {
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
            let newValue = Math.round(value - ((value / 2) * bf) + value * Math.random() * bf)
            //console.log(value);
            if (newValue >= 10000) {
                if (bf > 0.8) {
                    match.replace("lots")
                } else if (bf > 0.6) {
                    simplify(match, newValue, 1000)
                } else if (bf > 0.5) {
                    simplify(match, newValue, 100)
                }
            } else if (newValue > 1000) {
                if (bf > 0.7) {
                    simplify(match, newValue, 1000)
                } else if (bf > 0.5) {
                    simplify(match, newValue, 100)
                }
            } else if (newValue > 100) {
                if (bf > 0.7) {
                    simplify(match, newValue, 100)
                }
            } else if (newValue > 20) {
                if (bf > 0.8) {
                    simplify(match, newValue, 10)
                }
            }

        })

        // Spell out numbers
        doc.numbers().forEach((match) => {
            //console.log(match.text());
            if (bf > 0.5) {
                match.numbers().toText()
            }
        })

        // Country girl speech: giving -> givin'
        doc.not('#Verb$').match('#Verb').match('_ing').forEach((match) => {
            if (Math.random() < 1) {
                let w = match.data()[0].normal
                match.replaceWith(w.replace('ing', 'in\''))
                //console.log(match.data()[0]);
            }
        })
        //doc.match('(are|were|was)').insertAfter('sooo');
        // Match verbs not followed by "it"
        // Make sure the web is not at end of sentence
        // Match on the verb itself
        doc.not('#Verb$').match('[#Verb] !(it|you|like|#Conjunction)').forEach((match) => {
            //console.log(match.text(), fqLog.lastLike);
            if (fqLog.allowLike() && Math.random() < 0.5 * bf) {
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

                if (Math.random() < 0.2 * bf) {
                    match.insertBefore(rw2);
                }
                if (Math.random() < 0.3 * bf) {
                    match.insertBefore(rw3);
                }
                if (Math.random() < 0.6 * bf) {
                    match.insertBefore(rw);
                }

            }
        })
        // Replace "I am" as long as it is not at the start of a sentence.
        doc.sentences().not("^(I am|I'm)").match("(I am|I'm)").forEach((match) => {
            if (Math.random() < 2 * bf - 1) {
                match.replaceWith("me is")
            }
        })
    }
    text = doc.out('text')
    return text
}

function manualProcessing(inputText, bf) {
    // MANUAL PROCESSING

    // Remove whitespace
    let text = inputText.trim()
    // Split text on word boundaries
    let words = text.split(/\b/g)

    // Iterate over all words
    for (let i = 0; i < words.length; i++){
        // PREPARATION
        let word = words[i]
        if (word.length === 0) continue

        // Remove capitalization. Save it for later.
        let capitalLetter = false
        let capitalAll = false
        if (startsWithUppercase(word)) capitalLetter = true
        if (word.slice(-1) === word.slice(-1).toUpperCase() && word.length > 1) capitalAll = true
        word = word.toLowerCase()

        // Remove plural form. Save it for later.
        let isSingular = false;
        let singular = pluralize(word, 1)
        if (singular === word) isSingular = true
        if (word !== "s") word = singular //Ignore lonely 's or they are removed

        // DICTIONARY MISSPELLING
        // If there is a misspelling, misspell it
        let spelling = word;
        if (Math.random() < bf * 0.5) {
            spelling = pickSpelling(word)
        }
        let isSynonym = spelling !== word // Remember if we changed the word.

        // Replace underscores in dict with spaces
        if (spelling !== word) {
            word = spelling.replace('_', ' ')
        }

        // RESTORE
        // Restore capital letter if any
        if (capitalLetter) word = capitalizeFirstLetter(word)
        if (capitalAll) word = word.toUpperCase()
        // Restore pluralization
        if (!isSingular) word = pluralize(word, 2)

        // REGEXP MISSPELLING.
        // Re-pluralization can't handle misspelled words, so this is done after.
        // Also only misspell words that we did not find in dictionary.
        if (!isSynonym && Math.random() < bf * 0.5) {
            word = misspellByRule(word)
        }

        // Write back
        words[i] = word
    }
    //console.log(misspellByRule("summation"));

    // Join words and restore leading whitespace
    let outputText = `${getLeadingWhitespace(inputText)}${words.join('')}`

    return outputText
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

function simplify(match, value, factor) {
    let newValue = Math.floor(value/factor) * factor
    //console.log(value, newValue, factor);
    match.numbers().set(newValue)
}

function startsWithUppercase(word) {
    return word[0] === word[0].toUpperCase()
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}