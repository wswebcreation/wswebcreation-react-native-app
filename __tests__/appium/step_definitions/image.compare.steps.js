import { Then } from 'cucumber';
import * as labels from '../../../app/config/labels.json';
import { TEST_PREFIX } from '../support/constants';

const logo = `${TEST_PREFIX}wswebcreation`;

Then(
  /I'd like to make an element screenshot of the logo/,
  () => {
    device.saveElement($(logo), 'logo');
  },
);

Then(
  /I'd like to make screenshot of the home screen/,
  () => {
    device.saveScreen('home-screen');
  },
);

Then(
  /I'd like to compare an element screenshot of the logo/,
  () => {
    expect(device.compareElement($(logo), 'compare-logo')).to.equal(0);
  },
);

Then(
  /I'd like to compare a screenshot of the home screen$/,
  () => {
    expect(device.compareScreen('compare-home-screen')).to.equal(0);
  },
);

Then(
  /I'd like to compare a screenshot of the home screen with multiple blockouts/,
  () => {
    expect(device.compareScreen(
      'compare-home-screen-blockouts',
      {
        blockOuts: [
          // block out area 1
          {
            height: 100,
            width: 100,
            x: 50,
            y: 150,
          },
          // block out area 2
          {
            height: 25,
            width: 75,
            x: 200,
            y: 250,
          },
        ],
      },
    )).to.equal(0);
  },
);

Then(
  /I'd like to compare a screenshot of the home screen with multiple element blockouts/,
  () => {
    expect(device.compareScreen(
      'compare-home-screen-element-blockouts',
      {
        elementBlockOuts: [
          { element: $(logo) },
          {
            element: $(`${TEST_PREFIX}${labels.tabNavigator.webview}`),
            margin: 10,
          },
        ],
      },
    )).to.equal(0);
  },
);

Then(
  /I'd like to compare a screenshot of the home screen with with a disabled status bar/,
  () => {
    expect(device.compareScreen(
      'compare-home-screen-disabled-statusbar',
      {
        blockOutStatusBar: true,
      },
    )).to.equal(0);
  },
);

device.compareScreen(
  'compare-home-screen-element-blockouts',
  {
    elementBlockOuts: [
      { element: $(logo) },
      {
        element: $(`${TEST_PREFIX}${labels.tabNavigator.webview}`),
        margin: 10,
      },
    ],
  },
);
