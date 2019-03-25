import fs from 'fs'

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
   fs.writeFileSync('dict.json', JSON.stringify(dict, null, 3), 'utf8')
}
parseDollarDict(['wikipedia.dat'])

// Later dicts will override the values of earlier ones for mutual keys
function buildDict(paths) {
   let dict = {}
   for (let j = 0; j < paths.length; j++) {
      Object.assign(dict, JSON.parse(fs.readFileSync(paths[j])))
   }
   return dict
}

module.exports.text = `"So, that's about the summation of it. I know it's probably a lot to take in all at once, but, hopefully it makes sense for you?" The short, black-haired woman stood next to her partner as they addressed two pretty young females. The other two women stayed silent, trying to process all the information they'd been given. It was the pink-haired, flat-chested ninja who spoke up first after rubbing her chin for some time.`

module.exports.dict = buildDict(['dict.json', 'bimbo-dict.json'])
