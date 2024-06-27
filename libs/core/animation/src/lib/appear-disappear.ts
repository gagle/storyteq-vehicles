import { animate, style, transition, trigger } from '@angular/animations';
import {
  AngularMaterialAnimationFunction,
  AnimationDuration,
  AnimationOptions,
  getAnimationTimingMs,
} from './animations.model';

export const AppearDisappearAnimationFunction = AngularMaterialAnimationFunction;

/**
 * Will animate the element in and out using just opacity.
 * Apply to an HTML element with an *ngIf on it
 */
export const getAnimationAppearDisappear = (opt?: AnimationOptions) => {
  const {
    triggerName = 'appearDisappear',
    enter = AnimationDuration.SemiLong,
    leave = AnimationDuration.Short,
    enterDelay = AnimationDuration.None,
    leaveDelay = AnimationDuration.None,
  } = opt || {};

  return trigger(triggerName, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(
        `${getAnimationTimingMs(enter)} ${getAnimationTimingMs(enterDelay)} ${AppearDisappearAnimationFunction}`,
        style({ opacity: '*' }),
      ),
    ]),
    transition(':leave', [
      style({ opacity: '*' }),
      animate(
        `${getAnimationTimingMs(leave)} ${getAnimationTimingMs(leaveDelay)} ${AppearDisappearAnimationFunction}`,
        style({ opacity: 0 }),
      ),
    ]),
  ]);
};
