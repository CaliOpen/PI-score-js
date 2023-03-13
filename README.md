# PI-score-js

PI-score-js is a 0 dependencies simplified version of the official Nutri-score
logo which includes a piece of js to make the score's display programatically
changeable.

The package provides an svg and a small piece of js.

## Usage

_(This method requires an installation step according to your project bundling,
cf. below)._

Add the following to your html and declare the current score to display in the
src attribute. The svg includes the piece of javascript that build it-self.

```html
<embed src="<assets>/PI-score.svg?score=B" />
```

**No score**

```html
<embed src="<assets>/PI-score.svg" />
```

**Change default colors**

```html
<embed
  src="<assets>/PI-score.svg?score=A&colors=9CABA2,9CC5A1,49A078,216869,1F2421"
/>
```

## Installation

According to your bundling system, you need to include the `PI-score.svg` file
to your assets to make it available into you project.

For example with webpack, add …

For rollup…

And for vanilla html: just copy/paste the file `dist/PI-score.svg` your public
directory.

## Development

Install dev dependencies:

```bash
yarn
```

Run local http server

```bash
yarn dev
```

Open http://localhost:8080/example/

Then hack.

## Release

Run build:

```bash
bin/build
```

Then publish.
