export type InterviewAnswers = {
  elderName: string
  birthDecade: string
  hometown: string
  artists: string
  songs: string
  dances: string
  hymns: string
  weddingSong: string
  jobs: string
  hobbies: string
  moodGoal: string
}

export type PlaylistTrack = {
  id: string
  title: string
  why: string
  searchQuery: string
}

export type DemoProfile = {
  id: string
  label: string
  blurb: string
  answers: InterviewAnswers
}

export const emptyAnswers = (): InterviewAnswers => ({
  elderName: '',
  birthDecade: '',
  hometown: '',
  artists: '',
  songs: '',
  dances: '',
  hymns: '',
  weddingSong: '',
  jobs: '',
  hobbies: '',
  moodGoal: 'calm & connection',
})

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'dorothy',
    label: 'Dorothy',
    blurb: 'Jazz & swing · Chicago · 1930s',
    answers: {
      elderName: 'Dorothy',
      birthDecade: '1930s',
      hometown: 'Chicago, Illinois',
      artists: 'Ella Fitzgerald, Count Basie, Frank Sinatra, Billie Holiday',
      songs: 'Dream a Little Dream of Me, Take the A Train, Fly Me to the Moon',
      dances: 'Lindy Hop, foxtrot at the Aragon Ballroom',
      hymns: '',
      weddingSong: 'At Last (Etta James) — played at her wedding reception',
      jobs: 'School secretary; loved office Christmas parties',
      hobbies: 'Bridge club, big-band radio on Sunday mornings',
      moodGoal: 'joy & reminiscence',
    },
  },
  {
    id: 'hector',
    label: 'Hector',
    blurb: 'Latin & boleros · San Juan · 1940s',
    answers: {
      elderName: 'Hector',
      birthDecade: '1940s',
      hometown: 'San Juan, Puerto Rico',
      artists: 'Trio Los Panchos, Celia Cruz, Rafael Hernández, Benny Moré',
      songs: 'Obsesión, Guantanamera, El Manisero, Quizás Quizás Quizás',
      dances: 'Salsa, merengue at family parties',
      hymns: 'Quiet church hymns in Spanish on Christmas Eve',
      weddingSong: 'Sabor a Mí',
      jobs: 'Carpenter; sang while working with the radio on',
      hobbies: 'Cooking arroz con gandules, listening to boleros after dinner',
      moodGoal: 'energy & family connection',
    },
  },
  {
    id: 'ruth',
    label: 'Ruth',
    blurb: 'Hymns & Broadway · Boston · 1920s',
    answers: {
      elderName: 'Ruth',
      birthDecade: '1920s',
      hometown: 'Boston, Massachusetts',
      artists: 'Rogers & Hammerstein, Judy Garland, Mahalia Jackson',
      songs: 'Somewhere Over the Rainbow, Oh What a Beautiful Mornin, Climb Ev\'ry Mountain',
      dances: 'Waltz at church socials',
      hymns: 'Amazing Grace, How Great Thou Art, In the Garden, Blessed Assurance',
      weddingSong: 'I Love You Truly',
      jobs: 'Elementary teacher; led school assemblies in song',
      hobbies: 'Church choir, community theater, gardening',
      moodGoal: 'peace & spiritual comfort',
    },
  },
]
