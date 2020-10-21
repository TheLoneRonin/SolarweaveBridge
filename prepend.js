const { read, write } = require('fs-jetpack');

const file = read('dist/src/Solarweave.js');
const prependedFile = `#!/usr/bin/env node\n${file}`;

write('dist/src/Solarweave.js', prependedFile);