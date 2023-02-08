export enum Difficulty {
  beginner,
  intermediate,
  expert
}

export enum Muscle {
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

export enum ExerciseType {
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

export interface ExerciseVideos {
  items: VideoItem[],
}

export interface VideoItem {
  snippet: Snippet,
  id: VideoItemID
}

interface VideoItemID {
  videoId: string;
}

interface Snippet {
  title: string,
  thumbnails: Thumbnails;
  description: string,
}

interface Thumbnails {
  high: {url: string},
}

export interface SavedExercise extends Exercise{
  images: string[] | null,
}
