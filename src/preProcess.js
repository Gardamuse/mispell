const fs = require('fs')

function parseDollarDict(paths) {
   let dict = {}

   for (let j = 0; j < paths.length; j++) {
      let data = fs.readFileSync(paths[j], 'utf8')
      let lines = data.toString().split('\n')
      let word = ""
      for (let i = 0; i < lines.length; i++){
         let line = lines[i]
         if (line.charAt(0) == '$') {
            word = line.substr(1, line.length - 1).toLowerCase()
            if (!(word in dict)) {
               dict[word] = []
            }
         } else {
            dict[word].push(line.substr(0, line.length - 1).toLowerCase())
         }
      }
   }
   //console.log(dict.American);
   fs.writeFileSync('res/dict.json', JSON.stringify(dict, null, 3), 'utf8')
}

// Later dicts will override the values of earlier ones for mutual keys
function buildDict(paths) {
   let dict = {}
   for (let j = 0; j < paths.length; j++) {
      Object.assign(dict, JSON.parse(fs.readFileSync(paths[j])))
   }
   return dict
}

function preProcess() {
   // Parse dollar formatted dictionaries into res/dict.json
   parseDollarDict(['res/wikipedia.dat', 'res/aspell.dat'])
   // Compose final dictionary
   let finalDict = buildDict([/*'res/dict.json', */'res/bimbo-names.json', 'res/bimbo-dict.json'])
   fs.writeFileSync('res/finalDict.json', JSON.stringify(finalDict, null, 3), 'utf8')
}

function parseCommonWords() {
   let data = fs.readFileSync('res/20k-common-words.txt', 'utf8')
   let lines = data.toString().split('\n')
   let list = []
   for (let i = 0; i < lines.length; i++) {
      list.push(lines[i])
   }
   fs.writeFileSync('res/20k-common-words.json',
       JSON.stringify({list: list}, null, 3), 'utf8'
   )
}

preProcess()
parseCommonWords()
