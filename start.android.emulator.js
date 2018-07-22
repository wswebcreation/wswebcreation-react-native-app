/**
 * With this helper you can start emulators from the command line with some easy questions.
 * It will automatically list all AVD's that you've configuered on your machine.
 *
 * NOTE 1:  MAKE SURE YOU'VE ADDED inquirer WITH `npm install inquirer --D` TO YOUR DEV DEPENDENCIES
 * NOTE 2:  MAKE SURE YOU'VE SETUP UP YOUR ENVIRONMENT CORRECTLY WITH ALL THE ENVIRONMENT VARIABLES NEEDED
 *          FOR MAKING ANDROID WORK ON YOUR MACHINE
 * NOTE 3:  MAKE SURE YOU'VE SET THE `ANDROID_EMULATOR_PATH` TO THE CORRECT PATH ON YOUR MACHINE
 *          WHERE ALL THE EMULATORS ARE LISTED
 *
 * When you start the script you will get something like this
 *
 * ----------------------------------------------------------
 *
 * ===============================
 *   Android Emulator CLI Helper
 * ===============================
 *
 * ? Which emulator do you want to start? (Use arrow keys)
 * ❯ NexusS_5.1
 *   Nexus_5_6.0
 *   Nexus_5_7.1.1
 *   Nexus_6_6.0
 *   Pixel2XL_8.0
 *
 * ----------------------------------------------------------
 *
 *  After selecting for example the Nexus_6_6.0 emulator you will see this
 *
 * ----------------------------------------------------------
 * ? Which emulator do you want to start? Nexus_6_6.0
 * ? Do you want to wipe data (delete all user data and copy data from the initial data file)? (Use arrow keys)
 * ❯ No
 *   Yes
 * ----------------------------------------------------------
 *
 * After selecting for example `Yes` you will see this
 *
 * ----------------------------------------------------------
 *
 * ===============================
 *   Android Emulator CLI Helper
 * ===============================
 *
 * ? Which emulator do you want to start? Nexus_6_6.0
 * ? Do you want to wipe data (delete all user data and copy data from the initial data file)? Yes
 *
 * =========================================================
 *   Nexus_6_6.0 is being started
 *   You can close the device with 'CMD + C'.
 * =========================================================
 *
 * ----------------------------------------------------------
 *
 * Feel free to use it for all kinds of purposes, a star is much appreciated ;-)
 *
 * Grtz,
 * Wim | wswebreation
 */

const { prompt } = require('inquirer');
const { spawnSync, execFileSync } = require('child_process');
const { resolve } = require('path');

const ANDROID_EMULATOR_PATH = 'Library/Android/sdk/tools/emulator';

console.log(`
===============================
  Android Emulator CLI Helper
===============================
`);

const emulators = execFileSync(
  'emulator',
  ['-list-avds'],
  { encoding: 'utf8' },
)
  .replace(/\n$/, '')
  .split('\n');
if (emulators.length > 0) {
  prompt([
    {
      type: 'list',
      name: 'emulator',
      message: 'Which emulator do you want to start?',
      choices: emulators,
    },
    {
      type: 'list',
      name: 'wipeData',
      message: 'Do you want to wipe data (delete all user data and copy data from the initial data file)?',
      choices: ['No', 'Yes'],
    },
  ])
    .then((answer) => {
      console.log(`
=========================================================
  ${answer.emulator} is being started
  You can close the device with 'CMD + C'. 
=========================================================
`);
      const runOnEmulator = spawnSync(
        `${resolve(process.env.HOME, ANDROID_EMULATOR_PATH)}`,
        ['-avd', answer.emulator, answer.wipeData === 'Yes' ? '-wipe-data' : '-no-snapshot'],
      );
      console.log(runOnEmulator.stdout.toString());
      process.exit(0);
    });
} else {
  console.log(`
==================================
  NO ANDROID EMULATORS SPECIFIED
==================================
`);
}
