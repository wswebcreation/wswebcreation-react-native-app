/**
 * Wait for a given element to be|not visible|exist
 * REMARK: if falseState = true it instead waits for the selector to not match any elements
 * @param {Object} data
 * @example
 * <pre>
 *   const data = {
 *     selector: '~test-Ja',
 *     milliseconds: 3000,
 *     falseState: false,
 *     state: 'visible|exist'
 *   }
 * </pre>
 */
export function waitFor(data) {
  Object.assign({
    state: 'exist',
    falseState: false,
    milliseconds: 11000,
  }, data);
  device[`waitFor${upperFirst(data.state)}`](
    data.selector,
    data.milliseconds,
    data.falseState,
  );
}

/**
 * Tap on a button
 * @param {string} element
 */
export function tapOnButton(element) {
  device.touchAction(element, 'tap');
}

/**
 * Converts the first character of string to upper case
 * @param {string} string
 * @returns Returns the converted string
 */
export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
