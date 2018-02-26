import {
  ENVIRONMENT,
  IS_IOS,
  TESTING_ENVIRONMENTS
} from './Constants';

export function testProperties(id) { // eslint-disable-line import/prefer-default-export
  if (TESTING_ENVIRONMENTS.includes(ENVIRONMENT)) {
    return IS_IOS ? { testID: `test-${id}` } : { accessibilityLabel: `test-${id}` };
  }
  return null;
}
