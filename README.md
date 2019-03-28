# README
This application transforms text into something that sounds more like something a "bimbo" might write. This is done by inserting some words with little meaning like "like", "um" and "basically" into reasonable places in sentences using natural language processing. Words are also misspelled using common misspellings, a curated list of misspellings and some rules (like replacing `tt` with `t` in words). The curated list of misspellings is also used to replace words with synonyms that sound more bimbo-ish, or mean something slightly different (ex: then -> than).

The frequency of replacement and misspelling is decided by a "bimbofactor" value, ranging from 0 to 1. This value can be even higher, which will increase the frequency more, but 1 is balanced to be what sounds maximally bimbo-like while maintaining some level of readability.

## Resources
The files `res/aspell.dat`, `res/birkbeck.dat` and `res/wikipedia.dat` contain common misspellings in the following format: Each correct word is preceded by a dollar sign and followed by its misspellings, each on one line, without duplicates. (A misspelling might appear more than once in the corpus, but only as a misspelling of different words.) Where the spelling or misspelling contained a space, this has been replaced by an underscore (a_lot, Christ_mas). While most of the misspellings are non-words, there are also some real-word errors, such as "omitted" for "admitted". For more information, see the [page they were downloaded from](https://www.dcs.bbk.ac.uk/~ROGER/corpora.html).

The file `res/bimbo-dict.json` is a custom-built dictionary using the same format as dictionaries are read into internally. Each key is a correctly spelled word and may point to either a list of misspellings, or a list of objects where each object represents a misspelled word. These objects has a property `spelling` containing the misspelled word and can optionally have a `weight` representing how likely this spelling is to come up relative to other misspellings. If the first of these objects instead has a property `synonym` it will use the same misspellings as another key (listed as the value of the synonym property).

All dictionaries should use lowercase letters only. Capitalization is always preserved from the text being bimbofied.

## Natural Language Processing
Natural language processing is done using the [Compromise](https://github.com/spencermountain/compromise) library. See it's [api documentation](https://observablehq.com/@spencermountain/compromise-api) and [match syntax](https://github.com/spencermountain/compromise/wiki/Match-syntax).
