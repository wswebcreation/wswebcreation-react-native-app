import { defineSupportCode } from 'cucumber';
import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';

defineSupportCode(({ After }) => {
  After(function (scenarioResult) {
    const world = this;
    return (scenarioResult.status === 'failed')
      ? saveFailedScenarioScreenshot(world, scenarioResult)
      : device.closeApp();
  });

  /**
   * Save a screenshot when a scenario failed
   */
  function saveFailedScenarioScreenshot(world, scenarioResult) {
    const screenshotPath = resolve(process.cwd(), '.tmp/screenshots/');
    ensureDirSync(screenshotPath);
    const fileName = `${scenarioResult.scenario.name
      .replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
      .toLowerCase().substr(0, 100)}.png`;
    const filepath = resolve(screenshotPath, fileName);
    const screenshot = device.saveScreenshot(filepath);

    world.attach(screenshot, 'image/png');

    return device.closeApp();
  }
});
