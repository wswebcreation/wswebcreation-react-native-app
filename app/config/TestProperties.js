import { Animated } from 'react-native';
import getTransitionConfig from 'react-navigation/src/views/CardStack/TransitionConfigs';
import {
  ENVIRONMENT,
  IS_AUTOMATION_BUILD,
  IS_IOS,
  TESTING_ENVIRONMENTS
} from './Constants';

export function testProperties(id) {
  if (TESTING_ENVIRONMENTS.includes(ENVIRONMENT)) {
    // Detox checks if an element is accessible, so that's why `accessible: true,` needs to be added,
    // this will only be done with on the DEV build
    const accessible = {
      accessible: !IS_AUTOMATION_BUILD
    };

    if (IS_IOS) {
      return { ...accessible, testID: `test-${id}` };
    }

    return { ...accessible, accessibilityLabel: `test-${id}` };
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
    props[1].duration = 0; // eslint-disable-line no-param-reassign
    props[1].delay = 0; // eslint-disable-line no-param-reassign
    return AnimatedTiming(...props);
  });
  // @todo: Dirty hack for now to stub the card duration, need to find a better way
  stubs(getTransitionConfig, 'getTransitionConfig', () => ({}));
}
