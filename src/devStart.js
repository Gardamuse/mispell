//const mispell = require('./main.js')
const mispell = require('../dist/mispell.node.js').mispell

//import mispell from '../dist/mispell.node.js'

let text1 = `"Fine, fine, I'll do it," she groaned, giving in.

"Great, it means a lot," said Tim, her boyfriend. He beamed a smile at her before handing over the small bottle. "It may not even work anyway, where you're sitting."

Sophie, twenty years old, had been sitting on their couch watching TV when he came in waving a bag around. "Hun, you wouldn't believe what I've bought for 13 dollars," he had said before producing a bottle of purple fluid. He went on to say that he had bought a potion from a stall on the way home from work. Apparently it was supposed to make her more attractive. Like she wasn't attractive enough! What was he trying to say? She thought she looked good enough, with her slim body, long brunette hair and deep green eyes. Sure, she wasn't the curviest of women, but she didn't mind that about herself. She thought Tim shared her view until he came home with the bottle.
`
let text2 = `Over the past hour there had been argument after argument. Finally, she caved after Tim's repeated stutterings of "I do love you the way you are, but why not just give this a try?" After the initial outrage, she had come around to his point of view. If this potion was supposed to make her more attractive, then what did she have to lose?

Sophie brought the vial to her soft lips and drank, downing it all in one go. When she finished and set it down on the table beside the couch, she saw Tim looking at her with wide eyes. "You weren't supposed to take it all in one go…" he said, biting his lip anxiously.

"You could have told me th-" she started, before she felt funny. A mild tingling spread from her stomach to all around her body. She felt a little warmer than usual as well. "I think it's working," she said, astonished.

She stood there, looking herself over in her tee shirt and jeans, waiting for something to happen. Then she saw it. Her top shifted slightly and she felt it moving across her chest. "What the?" She questioned, still watching. She was unsure, but it looked and felt like her little A cups were growing.

She could feel them now, swelling up. She watched as they expanded out into her bra, and felt more skin come into contact with the cups. They filled them up slowly and gradually until there was no space left within. They didn't stop there though, and her breasts kept on growing, reaching a B cup now.

Then she felt a tightness further down as well, in her jeans. She moved her hands to her hips, and then felt them slowly pushing out wider. She also felt her ass beginning to get bigger, and let her hands linger there for a moment. Her hands were getting filled out by her inflating rump and couldn't help but like the feeling.
`

let text3 = `Mispell allows you to easily read or write like a bimbo by translating it to sound dumber. I run very fast and I'm climbing it very well and fucking it very hard.

In addition, numbers like sixty-three or 15003 are able to be scrambled and rounded.

5, 55, 555, 5555, 55555`

let text4 = `"Good bye he said."`

let text5 = `Support Blushing Defeat on Patreon!`

let text6 = `Red shoes in the blue ocean.`

let spaces = "     I am good. That I am.        "

//console.log(mispell)
//mispell.test();
//console.log(mispell.bimbofy(text4, 1));
let text = text5
console.log(`Text: "${text}"\n\n Replaced by: "${mispell.scramble(text, 1.0)}"`)