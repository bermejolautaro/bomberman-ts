export type PlayerActions =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'bomb'

export type ControlMapping = { [ action in PlayerActions]: string[] };

export const CONTROLS: ControlMapping[] = [
  {
    'up': ['w', 'W'],
    'down': ['s', 'S'],
    'left': ['a', 'A'],
    'right': ['d', 'D'],
    'bomb': ['c', 'C']
  },
  {
    'up': ['ArrowUp'],
    'down': ['ArrowDown'],
    'left': ['ArrowLeft'],
    'right': ['ArrowRight'],
    'bomb': ['Enter']
  },
]
