# README
This application transforms text into something that sounds more like something a "bimbo" might write. This is done by inserting some words with little meaning like "like", "um" and "basically" into reasonable places in sentences using natural language processing. Words are also misspelled using a curated list of misspellings and some rules (like replacing `tt` with `t` in words). The curated list of misspellings is also used to replace words with synonyms that sound more bimbo-ish, or mean something slightly different (ex: then -> than). In addition, numbers like sixty-three, or 1238, or 15003 are able to be scrambled and rounded.

The frequency of replacement and misspelling is decided by a "bimbofactor" value, ranging from 0 to 1. This value can be even higher, which will increase the frequency more, but 1 is balanced to be what sounds maximally bimbo-like while maintaining some level of readability.

Example:
> Thiz aplication transformz text into something dat sundz more like something a "bimbo" might wite. Thiz are done by inserting some wordz with litle meaning like "like", "um" and "baesicly" into uh, reasonable placiez in sentenciez using, like, natural language pwocesing. Wordz are also mispeled using a curated list of mispelingz and some rulez (like replacing `t` with `t` in wordz). De curated list of mispelingz iz also used to basicaly replace wordz with synonymz dat sund more sooo bimbo-ish, or yah nkow, mean something slightly absolutely uh, diferent (ex: than -> dan). In adition, numberz like fifty, or one dusand, or nine dusand are able to be scwambled and runded.

Some odd sentences will always arise, but this should improve over time.

## Installation
There are two versions of the library. One for use with node `mispell.node.js`, and one for easy inclusion in html `mispell.js`. If you don't want to build them yourself you can download the [latest release](https://github.com/Gardamuse/mispell/releases/latest) or install using npm. (Remember to spell it with only one S or you'll get a different package!)
```
npm i mispell --save
```


## Usage
The library exposes one function `bimbofy(String, Float)` that takes the text you want to transform as the first argument and a number between 0 and 1 to determine how much the text is transformed.

__Node__:
```js
// const mispell = require('./mispell.node.js') // if using the file directly
const mispell = require('mispell') // if installed via npm
mispell.bimbofy("Hello", 0.75)
```

__Html + JS__, just add a script tag in the html file to load the library before any JS is going to use it:
```html
<script src="/scripts/mispell.js"></script>
```
Then use it in your JS:
```js
mispell.bimbofy("Hello", 0.75)
```

# Development
Build the project using `npm run build`. When developing it is usually necessary to try things out for yourself, this is done in the devStart.js file. Run this file with `npm run devStart`.

## Resources
The files `res/aspell.dat`, `res/birkbeck.dat` and `res/wikipedia.dat` contain common misspellings in the following format: Each correct word is preceded by a dollar sign and followed by its misspellings, each on one line, without duplicates. (A misspelling might appear more than once in the corpus, but only as a misspelling of different words.) Where the spelling or misspelling contained a space, this has been replaced by an underscore (a_lot, Christ_mas). While most of the misspellings are non-words, there are also some real-word errors, such as "omitted" for "admitted". For more information, see the [page they were downloaded from](https://www.dcs.bbk.ac.uk/~ROGER/corpora.html).

The file `res/bimbo-dict.json` is a custom-built dictionary using the same format as dictionaries are read into internally. Each key is a correctly spelled word and may point to either a list of misspellings, or a list of objects where each object represents a misspelled word. These objects has a property `spelling` containing the misspelled word and can optionally have a `weight` representing how likely this spelling is to come up relative to other misspellings. If the first of these objects instead has a property `synonym` it will use the same misspellings as another key (listed as the value of the synonym property).

All dictionaries should use lowercase letters only. Capitalization is always preserved from the text being bimbofied.

## Natural Language Processing
Natural language processing is done using the [Compromise](https://github.com/spencermountain/compromise) library. See it's [api documentation](https://observablehq.com/@spencermountain/compromise-api) and [match syntax](https://github.com/spencermountain/compromise/wiki/Match-syntax).
