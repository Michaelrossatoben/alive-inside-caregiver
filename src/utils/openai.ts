import { localCoachReply } from '../data/coachResponses'

function getApiKey(): string | undefined {
  try {
    // Vite env (optional)
    const viteKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
    if (viteKey && String(viteKey).trim()) return String(viteKey).trim()
  } catch {
    /* ignore */
  }
  return undefined
}

const SYSTEM = `You are the Alive Inside Dementia Coach — calm, hopeful, practical.
Speak in the spirit of Michael Rossato-Bennett and Alive Inside.
Always weave in Healing Headset practices when relevant:
- Preferred personalized music > generic decade playlists
- Start preferred music 15–20 min before ADLs and sundowning
- Stay present; don't leave them alone with headphones for long
- Effects can linger ~45 min
- Specific life-story songs matter
- Caregiver self-compassion; guilt/grief are normal
Keep replies concise (under 220 words). Not a doctor; not diagnosis/prescription.
If crisis/self-harm/harm to elder: tell them to call 988 / 911 and stop coaching.`

export async function getCoachReply(userText: string): Promise<string> {
  const key = getApiKey()
  if (!key) {
    return localCoachReply(userText)
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 450,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: userText },
        ],
      }),
    })
    if (!res.ok) {
      return localCoachReply(userText)
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const content = data.choices?.[0]?.message?.content?.trim()
    return content || localCoachReply(userText)
  } catch {
    return localCoachReply(userText)
  }
}
