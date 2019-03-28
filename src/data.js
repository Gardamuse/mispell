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
parseDollarDict(['res/wikipedia.dat', 'res/aspell.dat'])

// Later dicts will override the values of earlier ones for mutual keys
function buildDict(paths) {
   let dict = {}
   for (let j = 0; j < paths.length; j++) {
      Object.assign(dict, JSON.parse(fs.readFileSync(paths[j])))
   }
   return dict
}

module.exports.text = `The heavy silence in the old room was finally broken by a tiny 'clink' sound as a crystal clear ice cube shifted in a short, heavy glass. Massive velvet curtains blocked all outside light to the room. A huge mahogany desk lived in an oasis of soft yellow light that emanated from dark green lamps. The world beyond was darkness and the pale, overweight man sitting behind the desk looked as if he had lived his entire life in that tiny realm. `

module.exports.text2 = `
<div bf="0">
“You are such a BITCH!”

This was a part of her job that Denise hated: having to deal with angry students.  In this case it was Jenna, a student that the young high school history teacher had had problems with before.

“Young lady, just because the rest of the class has already left for lunch gives you no right to speak to me in such a way!” Denise’s tone was quiet but firm.  “The grade you got is the grade you deserve.”

“If I was a cheerleader or a jock you wouldn’t say that, you’d at least let me do it over! God this is so unfair! Why are you even a teacher anyway, you are so not good at it!”

“Maybe if you spent more time on your schoolwork Jenna, and less time worrying about what you’re going to wear, we wouldn’t have this problem.”

“What do you know? You wear the same boring shit every single day.  You are just jealous; you wish you could get away with wearing something like this!”  And Jenna did a slow spin in front of her teacher, showing off her low-cut sequined top, short red skirt, and matching high heels, her beautiful, long blonde hair cascading over her shoulders.  It was a stark contrast to Denise’s attire: a drab brown skirt suit, the skirt cut to her knee, short heels, and her short brown hair.

“You don’t get it, Jenna.  People in the real world judge you on your appearance.  I dress this way so that I come across as smart and well-educated.  You, well, you obviously don’t.  If I didn’t know you and saw you dressed like that, I’d probably have a low opinion of your intellectual capabilities.”

“God you are such an arrogant, condescending bitch!  You think I’d get better grades if I dressed like you? I’m smarter than you, you know I am, and from what you just said, if the roles were reversed and you were dressed like me, people would know you were a STUPID BIMBO BITCH!”  And with that, the eighteen-year-old senior turned and stormed out towards the lunchroom.

Denise sighed and looked back down at her desk, thinking that the school year couldn’t end soon enough; Jenna and the other problem students of hers would graduate and she’d never have to deal with them again.
</div>

<div bf="0.3">
2.

“What’s this?” Denise asked out loud as she returned to her classroom after finishing her lunch in the teachers’ lounge.  There was a small wrapped package on her desk, with a pink ribbon tied around it, and a pink bow on top.  “Teacher Appreciation Day was last week!  Maybe it’s from one of the cheerleaders, thanking me for letting them do the retest…”

She ripped it open.  It was a box of candy; she opened it to discover soft, pink, heart-shaped candies inside.  Denise picked up one of the dozen or so candies and took a bite: it was bubblegum-flavored, and incredibly delicious!

“Mmmm,” Denise blissfully moaned, closing her eyes and savoring the taste.  She lifted a second one out of the box, and brought it to her lips.  “Mmmm…”

Ten minutes later, the bell rang for the next class to start, interrupting her reverie.  As she opened her eyes, Denise was shocked to discover that the box was empty!  “Those were sooo yummy,” she mumbled as she quickly dropped the box and wrapping into the trash.

Her next class started to file in, and a few minutes later, the bell rang for the class to begin.  As Denise stood up to walk over to the blackboard, she felt a sudden dizziness.  ‘I must have eaten that candy too fast,’ she thought to herself as she sat back down.  She looked out over the class; none of them seemed to have noticed anything.

“Okay, today I just want you all to sit and read chapter 24.  I’ll go over it on the board tomorrow.”  As her students started reading, Denise put her head in her hands, trying to let the dizziness pass; but instead of her head clearing, it only seemed to get more and more foggy.  In addition, she started to feel warm and tingly sensations coursing through her body – in addition to her head, they seemed to be concentrated in her chest, waist, and hips.

‘I hope I’m not getting sick,’ Denise thought, as the sensations got more and more intense.  She glanced up every so often to make sure her class was still reading, and behaving themselves; the fifty-minute class seemed to be never ending.  When the bell finally rang, and the students began to leave, she got up again, this time more slowly, and made her way to the girls’ bathroom.
</div>

<div bf="0.6">
3.

Denise ran the warm water over her face, trying to refresh herself and snap herself out of whatever fog she suddenly seemed to be in.  She had five minutes before her final class of the day began; if she could just manage to get through that, she could go home and go straight to bed and stay there all weekend of need be.

She looked up at her reflection in the mirror, and blinked in disbelief.  It looked to Denise as if her hair was getting lighter!  ‘It must be the lighting in here, or my mind is playing tricks on me,’ she assured herself.  The other thing she noticed was that her jacket, and the blouse underneath it, felt a bit tight.  Even her skirt felt a bit snug on her hips; she realized that the places where her outfit felt tightest were the same places that the warm and tingly sensations were the strongest.

She reached down and undid a couple of buttons on the jacket, leaving only one at the bottom; that gave her a bit of relief.  She looked at her reflection again.  ‘I do have a great body under all these clothes,’ she smiled.  ‘Maybe Jenna had a point – perhaps I am a teeny tiny bit jealous of how she and the other girls are allowed to dress.  I’m only a few years older than them, why do I have to look all frumpy?’

She ran some more warm water over her face, but it didn’t really seem to be helping; the more she tried to think about what was happening to her, the more dizzy she felt.  She took a deep breath, and tried not to think of anything at all; for a moment, her head started to clear.  Then the bell rang, and she realized she had to get back to her classroom quickly.  As she turned to leave, the dizziness returned, and it was all she could do to navigate the turns out of the bathroom and down the hall to her classroom door.
</div>

<div bf="0.8">
4.

The noise level in her classroom dropped to a whisper the moment she stumbled through the door.  There were a couple of whispers, one or two students asking “Miss Denise are you OK?” as she made her way to her chair, almost tripping over a large box that she didn’t remember being there when she left.

“Umm,” she started.  “I want you to,” she added, trying to think of what their lesson was supposed to be.  “Can anyone remember…where we left off…yesterday?”  Every time she tried to think of something class-related, it felt like a bubble was growing inside her head.

“We were about to start on World War I, Miss Denise,” a voice reminded her.

“Uh huh…umm…what chapter…”

There were a few chuckles.  “24,” the same student answered.

“Okay, umm, so, like just, you know, read that,” Denise muttered.  She took a deep breath, like she had before, not thinking of anything at all, and the bubble in her head shrank a bit.  As her students started reading quietly, her mind started to wander.  She started thinking of how her life was before she graduated college and started teaching.

‘Things were so much fun then; it wasn’t like all this hard stuff, all this…work.  I could, you know, like go to parties, and wear anything I wanted, and act an way I wanted, and nobody cared, nobody looked at me and was like you have to be like all mature and responsible and stuff…I was popular and fun and all the boys liked me and all the boys wanted me and…teaching is so stupid!’

Denise let out a soft giggle as she ran her hand through her hair, not noticing it had gotten longer, not noticing it wasn’t so straight any more.  She wasn’t even thinking about her class, she didn’t care if her students were reading or not.  She absently opened the last button on her jacket with the hand that wasn’t teasing her hair.  Her breasts weren’t small, but over the last hour they felt like they had gotten even bigger somehow – why else was her blouse feeling so tight?

She slipped her hand out of her hair and pulled her blouse out of her skirt, then reached up the back and unhooked her bra, skillfully sliding it down and out and letting it fall to the floor under her desk, out of sight.  ‘That feels so much better.’  She sighed and took another deep breath, letting one of her shoes dangle off her foot.  After a couple of minutes of this, it slipped completely off, and she uncrossed her legs; crossing them back the other way, she repeated it with the other shoe until it, too, ended up on the floor.

The bell rang, and since it was the last class of the day, as well as the week, the excited students rushed out without paying the least bit of notice to their suddenly different teacher.
</div>

<div bf="1.0">
5.

As the last student left, Denise’s attention returned to the box that she had almost tripped over a bit earlier.  “A prezzie!” she giggled, as she ripped it open.  Her eyes widened as she saw what was inside: an extremely tiny, bright red bra and panty set; a pair of hot pink strappy 6” heels; and a transparent, very short and low-cut dress.

“Omigod,” she gushed, “I gotta try these on now!”  She ripped her white blouse open, as buttons shot across the room; pulling it off her body, she was now completely topless.  She giggled as her hands went to her now DD-sized breasts, enjoying how firm and sensitive and perfect they seemed to be.  She slid the ‘bra’ over her chest, the fabric covering her nipples and not much else, but it fit her perfectly, as if it was made just for her.

It only took her a few more seconds to be out of her skirt, and her panties as well.  She slipped the tiny thong up her legs, marveling at how amazingly well it fit, and then she added the dress, pulling it over her head.  The heels were the last thing to go on; as she stood up, all of the dizziness in her head seemed to disappear.

“I gotta see what this looks like!” she exclaimed to no one in particular, as she teetered out the door and down the empty hall, back to the bathroom.  She looked at her reflection, and giggled as she realized she wasn’t the same person she was just two hours ago. Her hair was long and blonde and beautiful; her body, no longer hidden by her unflattering outfit, was perfect. Even her makeup looked different: her lips were a shade of hot pink and seemed somehow fuller, and her eyes had a sultry and sexy, if vacant, look to them.

Denise gasped as she felt a wave of excitement rush through her.  “I am so hot, I am so fucking hot, I am like wayyyy too fucking hot to be a teacher, I’m like a...like a…like a…”

“Bimbo,” a voice finished her sentence.  Denise giggled as she saw Jenna in the mirror, coming up behind her.  “I gave you a package of my mom’s special bimbo candy.  I see you ate it all!  Wow, you are definitely not a teacher anymore.  Hell, you aren’t a Denise anymore, for that matter.  You look more like a Dee Dee.”

“Dee Dee,” Denise giggled.  “I like!”

“Let’s get you out of here, okay Dee Dee?  I think there’s a party or two or twenty that we have to get to.  The boys are gonna be all over you, they love bimbos like you!  What do ya say, Dee Dee?”

Dee Dee giggled.  “Awesome!”

THE END
</div>
`

module.exports.dict = buildDict(['res/dict.json', 'res/bimbo-names.json', 'res/bimbo-dict.json'])
