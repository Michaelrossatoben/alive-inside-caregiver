export type ChecklistItem = {
  id: string
  title: string
  detail: string
}

export const HEADSET_STEPS: ChecklistItem[] = [
  {
    id: 'charge',
    title: 'Charge via USB',
    detail:
      'Connect the Alive Inside Memory Player / Healing Headset to USB power and charge fully before first use.',
  },
  {
    id: 'playlist',
    title: 'Build a personalized playlist',
    detail:
      'Use Music Detective or the AIF app. Prefer specific life-story songs over generic decade playlists.',
  },
  {
    id: 'legal',
    title: 'Get legal DRM-free MP3/WAV files',
    detail:
      'Download or rip music you have the right to use as DRM-free MP3 or WAV. Protected/streaming files usually will not load onto the player.',
  },
  {
    id: 'microsd',
    title: 'Load the microSD card',
    detail:
      'Insert microSD and connect via USB with the headset power ON, or use a card reader on your computer.',
  },
  {
    id: 'drag',
    title: 'Drag MP3s onto the card',
    detail:
      'Copy files onto the microSD. Play order follows file order — name files 01_, 02_, etc. if you want a specific sequence.',
  },
  {
    id: 'listen',
    title: 'Listen together',
    detail:
      'Stay present. The headset is an engagement tool — don’t leave them alone with headphones for long. Start music 15–20 min before hard moments; effects can linger ~45 min.',
  },
  {
    id: 'troubleshoot',
    title: 'Know the quick fixes',
    detail:
      'Hold play for power. Volume buttons often skip tracks. Feel for bump dots. Trial with hearing aids. Try another USB cable or card reader if the computer doesn’t see the card.',
  },
]

export type ResourceLink = {
  label: string
  href: string
  desc: string
}

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    label: 'Watch the Film',
    href: 'https://aliveinside.org/posts/108208/watch-the-movie',
    desc: 'Alive Inside documentary',
  },
  {
    label: 'Shop Headsets',
    href: 'https://bealiveinside.myshopify.com/',
    desc: 'bealiveinside.myshopify.com',
  },
  {
    label: 'Alive Inside',
    href: 'https://aliveinside.org',
    desc: 'aliveinside.org',
  },
  {
    label: 'AIF App',
    href: 'https://www.aifapp.com/',
    desc: 'Personalized music for dementia',
  },
  {
    label: 'Healing Headsets',
    href: 'https://www.mymemoryworx.org/',
    desc: 'My Memory Worx',
  },
  {
    label: 'Healing Headset FAQ',
    href: 'https://www.mymemoryworx.org/faq',
    desc: 'Setup & troubleshooting',
  },
  {
    label: 'Companion Connect',
    href: 'https://www.mymemoryworx.org/companion-connect',
    desc: 'Connection & support',
  },
]

export const TROUBLESHOOT_FAQ = [
  {
    q: 'Won’t turn on?',
    a: 'Hold the play button to power on. Charge via USB first — a low battery is the most common issue.',
  },
  {
    q: 'Volume buttons skip songs?',
    a: 'On some Memory Players, the side controls skip tracks. Learn the bump dots by feel so you can find play/pause without looking.',
  },
  {
    q: 'They wear hearing aids?',
    a: 'Trial carefully. Some people prefer over-ear headphones at moderate volume with aids in or out — every elder is different. Watch for comfort.',
  },
  {
    q: 'Computer doesn’t see the microSD?',
    a: 'Try another USB cable/port, keep headset power ON while connected, or use a dedicated microSD card reader.',
  },
]
