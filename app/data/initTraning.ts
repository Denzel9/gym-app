export interface InitExerciseType {
  type: string
  exercise: InitExercise[]
}

export interface InitExercise {
  exercise: string
  sets: []
}

export const initTraning = {
  Бицепс: [],
  Трицепс: [],
  'Подьем на плечи прямо': [],
  'Подьем на плечи в бок': [],
}

export const trainingType = (type: number) => {
  if (type === 1) return 'Верхнеплечевой'
  if (type === 2) return 'Спина'
  if (type === 3) return 'Ноги'
  if (type === 4) return 'Кардио'
}

export const initExerciseType: InitExerciseType[] = [
  {
    type: 'Верхнеплечевой',
    exercise: [
      { exercise: 'Бицепс', sets: [] },
      { exercise: 'Трицепс', sets: [] },
      { exercise: 'Жим гантелей вверх', sets: [] },
      { exercise: 'Жим гантелей в бок', sets: [] },
    ],
  },
  {
    type: 'Спина',
    exercise: [
      { exercise: 'Трапеция', sets: [] },
      { exercise: 'Широчайшие', sets: [] },
    ],
  },
  {
    type: 'Ноги',
    exercise: [
      { exercise: 'Присед', sets: [] },
      { exercise: 'Сибание ног в тренажере', sets: [] },
      { exercise: 'Разгибание ног в тренажере', sets: [] },
    ],
  },
  {
    type: 'Кардио',
    exercise: [
      { exercise: 'Велотренажер', sets: [] },
      { exercise: 'Беговая дорожка', sets: [] },
    ],
  },
]

// Верхнеплечевой
export const typeTraining = {
  upperBody: [
    {
      exercise: 'Бицепс',
      sets: [
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
      ],
    },
    {
      exercise: 'Трицепс',
      sets: [
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
      ],
    },

    {
      exercise: 'Жим гантелей вверх',
      sets: [
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
      ],
    },
    {
      exercise: 'Жим гантелей в бок',
      sets: [
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
        { repeat: 0, weight: 0 },
      ],
    },
  ],
}

export const initExercise = (exercise: string) => ({
  exercise: exercise,
  sets: [],
})
