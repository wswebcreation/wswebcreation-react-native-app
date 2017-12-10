import { defineSupportCode } from 'cucumber';

defineSupportCode(({ Given, When, Then }) => {
  Given(
    /I open the app/,
    () => {
      if (!device.options.firstAppStart) {
        device.launch();
      }
      device.options.firstAppStart = false;
    },
  );
  When(
    /I swipe to (left|right)/,
    (action) => {
      device.touchPerform([{
        action: 'press',
        options: {
          x: action === 'left' ? 372 : 0,
          y: 200
        }
      }, {
        action: 'moveTo',
        options: {
          x: action === 'left' ? -300 : 372,
          y: 200,
          duration: 250
        }
      }, {
        action: 'release',
        options: {
          duration: 250
        }
      }]);
    },
  );
  When(
    /I open the chat with (.*)/,
    (name) => {
      device.pause(1000);
      device.touchAction(`~test-${name}`, 'tap');
    },
  );
  Then(
    /I can type "(.*)"/,
    (sentence) => {
      $('~test-chatField').setValue(sentence);
      device.touchAction('~test-send', 'tap');
      device.pause(1000)
    },
  );
});
