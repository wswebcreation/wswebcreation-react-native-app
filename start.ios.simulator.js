const { execFileSync, spawnSync } = require('child_process');
const inquirer = require('inquirer');

console.log(`
============================
  iOS Simulator CLI Helper
============================
`);


console.log('📲  Retrieve all 📱 📱');
const simulators = execFileSync('xcrun', ['instruments', '-s'], { encoding: 'utf8' })
  .replace(/\n$/, '').split('\n')
  .filter(simulator => simulator.includes('iPhone') && !simulator.includes('Watch'))
  .map((simulator) => {
    const device = simulator.match(/(.*?) \((.*?)\) \[(.*?)\]/);
    const name = device[1];
    const version = device[2];
    const udid = device[3];
    return { udid, name, version };
  });

const formatedSimulatorNameList = simulators
  .map(simulator => `${simulator.name} (${simulator.version})`);

console.log('✅  All simulators retrieved\n');

inquirer.prompt([
  {
    type: 'list',
    name: 'simulator',
    message: 'On which simulator do you want to run your test?',
    choices: formatedSimulatorNameList,
  },
])
  .then((answer) => {
    const devices = JSON.parse(execFileSync('xcrun', ['simctl', 'list', '--json', 'devices'], { encoding: 'utf8' })).devices;
    for (const version in devices) {
      if (version.indexOf('iOS') !== 0) {
        continue;
      }
      for (const device in devices[version]) {
        const simulator = devices[version][device];
        const simulatorName = `${simulator.name} (${version.replace(/iOS|\s+/g, '')})`;
        if (simulator.availability !== '(available)') {
          continue;
        }
        if (simulator.state === 'Booted' && simulatorName !== answer.simulator) {
          console.log(`
=========================================================
    ☝🏻  The ${simulatorName} is already opened. 
    It will be closed. 
=========================================================
`);
          execFileSync('xcrun', ['simctl', 'shutdown', 'all'], { encoding: 'utf8' });
          console.log(`✅  ${simulatorName} has been shut down.\n`);
        }
      }
    }
    const simulator = answer.simulator.split('(');
    const iphone = simulator[0].replace(/\s+$/g, '');
    const os = simulator[1].replace(/\s+$|\(|\)/g, '').split('.');
    console.log(`📱  ${answer.simulator} wil be opened and tests will be run.`);
    const runOnSimulator = spawnSync('npm',
      ['run', 'e2e.ios', '--', `--iphone="${iphone}"`, `--os=${os[0]}.${os[1]}`]
    );
    console.log(runOnSimulator.stdout.toString());
    if (runOnSimulator.status !== 0) {
      throw new Error(`Tests on the ${answer.simulator} did not run properly.`);
    }
    process.exit(0);
    process.exit(0);
  });
