import { IS_IOS } from './Constants';

export function testProperties(id) { // eslint-disable-line import/prefer-default-export
  if (process.env.NODE_ENV === 'development') {
    return IS_IOS ? { testID: `test-${id}` } : { accessibilityLabel: `test-${id}` };
  }
  return null;
}
