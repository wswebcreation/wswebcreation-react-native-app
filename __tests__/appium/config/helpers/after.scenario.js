import { After, Status } from 'cucumber';
import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';
import { switchToContext } from '../../screen-objects/webview';
import { CONTEXT_REF, SCREENSHOTS_FOLDERS } from '../../support/constants';

After(function (scenarioResult) {
  const world = this;
  // Always set it to false
  device.options.firstAppStart = false;
  return (scenarioResult.status === Status.FAILED)
    ? saveFailedScenarioScreenshot(world, scenarioResult)
    : scenarioResult.status;
});

/**
 * Always turn back the context to native when we are testing with the webview
 */
After('@webview', () => {
  try {
    switchToContext(CONTEXT_REF.NATIVE);
  } catch (error) {
    // Do nothing
  }
});

/**
 * Save a screenshot when a scenario failed
 */
function saveFailedScenarioScreenshot(world, scenarioResult) {
  const screenshotPath = resolve(process.cwd(), SCREENSHOTS_FOLDERS.TMP);
  ensureDirSync(screenshotPath);
  const fileName = `${scenarioResult.scenario.name
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s/g, '-')
    .toLowerCase()
    .substr(0, 100)}.png`;
  const filepath = resolve(screenshotPath, fileName);
  const screenshot = device.saveScreenshot(filepath);

  world.attach(screenshot, 'image/png');

  // Restart the app the next time
  device.options.restartApp = true;

  return scenarioResult.status;
}
