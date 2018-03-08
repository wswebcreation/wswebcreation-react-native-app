import { Animated } from 'react-native';
import {
  ENVIRONMENT,
  IS_AUTOMATION_BUILD,
  IS_IOS,
  TESTING_ENVIRONMENTS
} from './Constants';


export function testProperties(id) { // eslint-disable-line import/prefer-default-export
  if (TESTING_ENVIRONMENTS.includes(ENVIRONMENT)) {
    return IS_IOS ? { testID: `test-${id}` } : { accessibilityLabel: `test-${id}` };
  }
  return null;
}

/**
 * Setup the app for a specific automation build
 */
export function setupAutomation() {
  if (!IS_AUTOMATION_BUILD) {
    return;
  }
  // Disable the yellow box
  console.disableYellowBox = true; // eslint-disable-line no-console
  disableAnimations();
}

/**
 * Disable all animations
 */
function disableAnimations() {
  const stubs = require('stubs');
  const AnimatedTiming = Animated.timing;
  stubs(Animated, 'timing', (...props) => {
    console.log(props);
    props[1].duration = 0; // eslint-disable-line no-param-reassign
    props[1].delay = 0; // eslint-disable-line no-param-reassign
    props[1].stiffness = 10000; // eslint-disable-line no-param-reassign
    props[1].damping = 10000; // eslint-disable-line no-param-reassign
    props[1].mass = 10000; // eslint-disable-line no-param-reassign
    return AnimatedTiming(...props);
  });
}
