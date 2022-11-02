### Instalation

``` bash
$ npm install
```

or

``` bash
$ yarn install
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:8080
$ npm run serve
# then trigger mock api http://localhost:3001
$ npm run json-server
```

or

``` bash
# dev server with hot reload at http://localhost:8080
$ yarn serve
# then trigger mock api http://localhost:3001
$ yarn json-server
```

Navigate to [http://localhost:8080](http://localhost:8080). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
# build for production with minification
$ npm run build
```

or

```bash
# build for production with minification
$ yarn build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
├── public/          # static files
│   └── index.html   # html template
│
├── src/             # project root
│   ├── api/         # http request handlers
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components - header, footer, sidebar, etc.
│   ├── helpers/     # common helper scripts
│   ├── layouts/     # layout containers
│   ├── lib/         # external libraries
│   ├── plugins/     # vue plugins
│   ├── router       # routes config
│   └── store        # state
│   ├── styles/      # scss styles
│   ├── views/       # application views
│   ├── _nav.js      # sidebar navigation config
│   ├── App.vue
│   ├── ...
│   └── main.js
│
└── package.json
```

