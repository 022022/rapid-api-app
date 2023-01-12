enum Difficulty {
  beginner,
  intermediate,
  expert
}

enum Muscle {
  abdominals,
  abductors,
  adductors,
  biceps,
  calves,
  chest,
  forearms,
  glutes,
  hamstrings,
  lats,
  lowerback,
  middleback,
  neck,
  quadriceps,
  traps,
  triceps,
}

enum ExerciseType {
  cardio,
  olympic_weightlifting,
  plyometrics,
  powerlifting,
  strength,
  stretching,
  strongman
}

export interface Exercise {
  difficulty: Difficulty,
  equipment: string,
  instructions: string,
  muscle: Muscle,
  name: string,
  type: ExerciseType
}

export interface ExerciseVideo {
  items: videoItem[],
}

export interface videoItem {
  snippet: Snippet,
}

export interface Snippet {
  description: string,
}
