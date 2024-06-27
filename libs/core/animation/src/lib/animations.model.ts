export interface AnimationOptions {
  triggerName?: string;
  enter?: string | number;
  leave?: string | number;
  enterDelay?: string | number;
  leaveDelay?: string | number;
}

export const AnimationDuration = {
  None: 0,
  Short: 150,
  Medium: 350,
  SemiLong: 500,
  Long: 700,
} as const;

export const AnimationStaggerDuration = {
  None: 0,
  Short: 10,
  Medium: 25,
  Long: 50,
} as const;

export const AngularMaterialAnimationFunction = `cubic-bezier(0.4,0.0,0.2,1)`;

export const getAnimationTimingMs = (duration: string | number) =>
  typeof duration === 'number' ? `${duration}ms` : duration;
