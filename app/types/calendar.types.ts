export interface CalendarInterface {
  name: string
  id: string
  calendar: TrainingDayInterface[]
}

export interface TrainingDayInterface {
  date: string
  type: string
  training: DayTraining[]
  docId?: string
}

export interface DayTraining {
  exercise: string
  sets: SetsExercise[]
}

export interface SetsExercise {
  repeats: number
  weight: number
}
