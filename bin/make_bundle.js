const Builder = require('systemjs-builder');
const matchVersion = require('./match_version');

function bundle() {
  const builder = new Builder('./');
  builder.config({
    map: {
      'rxjs': 'node_modules/rxjs'
    },
    packages: {
      'rxjs': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs/operators': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs/Observable': {
        defaultExtension: 'js'
      }
    }
  });

  console.log("Bundling Rx");
  return builder.bundle('rxjs + rxjs/operators', 'rxjs.local.umd.js', {
    sourceMaps: true
  }).then(ignored => {
    builder.bundle('rxjs + rxjs/operators', 'rxjs.local.umd.min.js', {
      sourceMaps: true,
      minify: true
    });
  });
}

matchVersion(err => {
  if (err) {
    console.error(err);
    process.exit(60);
  } else {
    bundle();
  }
});
