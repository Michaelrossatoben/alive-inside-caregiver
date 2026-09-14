export const CRISIS_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'want to die',
  'self-harm',
  'self harm',
  'hurt myself',
  'harm myself',
  'kill them',
  'hurt them',
  'harm the elder',
  'hurt my mom',
  'hurt my dad',
  'hurt my parent',
  'hurt my wife',
  'hurt my husband',
  'kill her',
  'kill him',
  'homicidal',
  'suicidal',
]

export function detectCrisis(text: string): boolean {
  const lower = text.toLowerCase()
  return CRISIS_KEYWORDS.some((k) => lower.includes(k))
}

export const CRISIS_MESSAGE = `I'm really glad you told me. Please stop and get help right now.

Call or text **988** (Suicide & Crisis Lifeline) — available 24/7 in the US.

If you or someone else is in immediate danger, call **911**.

I can't continue coaching when someone may be in crisis. Please reach out to a human who can help.`

type Rule = {
  match: RegExp
  response: string
}

const RULES: Rule[] = [
  {
    match: /exhaust|burn.?out|tired|worn.?out|no energy|overwhelmed|can't keep/i,
    response: `You're exhausted — and that makes complete sense. Caregiving for someone with dementia is one of the hardest things a person can do. You're not failing. You're human.

**Try this today:**
1. Give yourself permission for one small rest (even 10 minutes with preferred music of *your* own).
2. Use music as a bridge before the hard moments — start *their* preferred songs 15–20 minutes before bathing, eating, or transitions. Effects often linger ~45 minutes.
3. Ask one person for one concrete help: "Can you sit with Mom Tuesday 2–4?"

You deserve support. Guilt about needing rest is common — and unhelpful. Rest is part of the care.`,
  },
  {
    match: /sundown|evening.?agitat|late.?afternoon|night.?worr|wandering.?at.?night/i,
    response: `Sundowning is so common — and so draining. Many elders get more confused, restless, or fearful as light fades.

**Alive Inside / Healing Headset practice:**
- Start their *preferred, personalized* music 15–20 minutes *before* the usual sundown window.
- Stay present with them (engagement tool — don't leave them alone with headphones for long stretches).
- Dim harsh lights; keep a calm routine; avoid arguing about "what time it is."
- Effects of preferred music can linger ~45 minutes — use that window for dinner, toileting, or settling.

Specific life-story songs matter more than a generic "1940s playlist." If you haven't yet, try Music Detective here to find *their* songs.`,
  },
  {
    match: /bath|shower|wash|refus.*clean|hygiene|won't.?get.?in/i,
    response: `Bathing refusal is one of the most common — and stressful — caregiving battles. Often it's fear, cold, loss of privacy, or confusion — not stubbornness.

**Music-first approach (Healing Headset practice):**
1. Start preferred personalized music 15–20 minutes *before* you even mention the bath.
2. Stay with them while music plays — it's an engagement tool, not a babysitter.
3. Keep the room warm, go slowly, offer choices ("washcloth or sponge?"), and stop if distress spikes.
4. Some days a partial wash is enough. That still counts.

Preferred music can awaken identity and soften resistance. Specific songs from their life beat decade playlists every time.`,
  },
  {
    match: /guilt|selfish|bad.?caregiver|not.?enough|shouldn't.?feel|ashamed/i,
    response: `Guilt and grief are normal for dementia caregivers. Loving someone who is changing — and needing breaks — can feel like betrayal. It isn't.

Michael Rossato-Bennett and Alive Inside remind us: caregivers deserve support. Music can wake the person you love *and* give you moments of connection that refill your cup.

**Self-compassion practice:**
- Name the feeling: "This is hard, and I'm doing my best."
- One tip worth saving: preferred music before hard ADLs; stay present; effects linger ~45 min.
- You are allowed to need help. Asking for it is strength.

You're here seeking ideas — that already shows care.`,
  },
  {
    match: /music.?before|use.?music|when.?to.?play|playlist|headphones|headset|healing.?headset/i,
    response: `Here's the Alive Inside / Healing Headset approach in plain language:

1. **Preferred personalized music > generic decade playlists.** Specific life-story songs (wedding song, church hymn, dance from their twenties) matter.
2. **Start music 15–20 minutes before hard moments** — bathing, eating, appointments, sundowning.
3. **Stay present.** Headphones are an engagement tool; don't leave them alone for long.
4. **Effects can linger ~45 minutes** — use that window for care tasks.
5. Load songs onto a Memory Player / Healing Headset (see Load Headset) or use the AIF app: https://www.aifapp.com/

Music Detective can help you find those specific songs. You're not alone in this.`,
  },
  {
    match: /eat|meal|refus.*food|won't.?eat|appetite|feeding/i,
    response: `Mealtime struggles are exhausting. Confusion, sensory changes, and loss of appetite are common with dementia.

**Try music as a bridge:**
- Start preferred songs 15–20 minutes before the meal.
- Sit with them; keep the table calm and uncluttered.
- Offer familiar favorites; smaller portions; finger foods if utensils confuse them.
- Effects of preferred music often linger ~45 minutes — a good window for eating.

Specific songs tied to family meals, holidays, or their culture can open appetite and mood more than random oldies.`,
  },
  {
    match: /aggress|hit|yell|lashing|violent|angry.?outburst/i,
    response: `Aggression often comes from fear, pain, overstimulation, or unmet needs — not from "who they are." Still, your safety matters.

**Immediate:** Step back if unsafe. Call 911 if anyone is in danger.

**Prevention with music:**
- Preferred music 15–20 min before known trigger times.
- Stay present; soft voice; don't argue facts.
- Check for pain, hunger, toileting need, loud TV, too many people.

If aggression is new or escalating, contact their clinician. This app is not medical advice — I'm here for practical, hopeful support.`,
  },
  {
    match: /sleep|insomni|up.?all.?night|won't.?sleep|night.?waking/i,
    response: `Night waking wears caregivers down fast. Daytime naps, sundowning, pain, and medication timing all play a role.

**Gentle supports:**
- Preferred calming music in the evening (not always stimulating dance hits — match the mood goal).
- Start music 15–20 min before bedtime routine; stay present.
- Daylight exposure; limit caffeine; consistent wind-down.
- Talk to their doctor about sleep — I can't prescribe or diagnose.

You need sleep too. If you can arrange even one overnight respite, take it without guilt.`,
  },
  {
    match: /repeat|same.?question|loop|ask.?over/i,
    response: `Repetition is the disease talking — not them trying to annoy you. Answering with patience every time is almost impossible; be kind to yourself when you snap.

**Helpful redirects:**
- Preferred music can interrupt the loop and reconnect identity.
- A written answer on a card ("Lunch is at noon") for some people.
- Validate the feeling behind the question ("You're worried about the kids — they're safe.").

Save this tip: start preferred music before known looping times of day. Stay engaged; effects linger ~45 min.`,
  },
  {
    match: /lonely|isolat|alone|no.?one.?helps|abandoned/i,
    response: `Caregiving can be profoundly lonely. Friends may fade; the person you love may not be able to companion you the same way.

You're not alone in this community of caregivers — and Alive Inside exists because music and connection restore dignity.

**One next step:**
- Reach out to one person with a specific ask.
- Explore Companion Connect: https://www.mymemoryworx.org/companion-connect
- Use Music Detective to rebuild shared listening moments — connection through song.

Caregivers deserve support. That includes you.`,
  },
]

const FALLBACK = `Thank you for sharing that. Dementia caregiving is a long road — and showing up here means you care deeply.

**Alive Inside reminder (Michael Rossato-Bennett's work):** Music can wake identity. Preferred, personalized songs — not generic decade lists — matter most. Start them 15–20 minutes before hard moments (bathing, eating, sundowning). Stay present; headphones are an engagement tool. Effects often linger about 45 minutes.

**Caregiver truth:** Guilt and grief are normal. You deserve support.

What feels hardest right now — exhaustion, a care task, sundowning, or finding the right music? I can go deeper on any of those.

*I'm not a doctor. This isn't diagnosis or a prescription.*`

export function localCoachReply(userText: string): string {
  for (const rule of RULES) {
    if (rule.match.test(userText)) {
      return rule.response
    }
  }
  return FALLBACK
}

export const STARTER_CHIPS = [
  "I'm exhausted",
  'Sundowning every evening',
  'They refuse bathing',
  'I feel guilty',
  'How do I use music before hard moments?',
]

export const WELCOME_MESSAGE = `Welcome. I'm your Alive Inside Dementia Coach — calm, practical, and hopeful.

I speak in the spirit of Alive Inside and Michael Rossato-Bennett's work: music can wake the person you love, and *you* deserve support too.

Tap a starter below, or tell me what's hard today.

*Not a doctor. Not a diagnosis or prescription. For medical concerns, contact a clinician.*`
