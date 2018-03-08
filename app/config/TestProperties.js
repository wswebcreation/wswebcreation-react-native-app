import {
  ENVIRONMENT,
  IS_IOS,
  TESTING_ENVIRONMENTS
} from './Constants';

export function testProperties(id) { // eslint-disable-line import/prefer-default-export
  if (TESTING_ENVIRONMENTS.includes(ENVIRONMENT)) {
    // Detox checks if an element is accessible, so that's why `accessible: true,` needs to be added
    const accessible = {
      accessible: true
    };

    if (IS_IOS) {
      return { ...accessible, testID: `test-${id}` };
    }

    return { ...accessible, accessibilityLabel: `test-${id}` };
  }
  return null;
}
