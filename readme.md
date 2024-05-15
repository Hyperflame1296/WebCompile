# WebCompile

### WARNING: This is still in alpha, and may not support everything. Expect glitches!

- This package will take multiple website files, and combine it all into one HTML file.

This is how you use it:

```javascript

const WebCompile = require('webcompile')({
    outputLoc: './', // Directory for the output file
    inputLoc: './website', // Directory for all of the website files
    outputName: 'compiled', // Name for the final output .html file
    formatting: { // (optional) Prettier formatting settings
        tabWidth: 4
    },
    ext: { // Where all of the js, css, and html files are located (the root is the input location)
        js: './js',
        css: './css',
        html: './',
        jsm: './jsm' // optional
    }
});

WebCompile.compile();
```

- If you want to have it minified instead of formatted, you can change this `formatting` object to `minify` instead:

```javascript

const WebCompile = require('webcompile')({
    outputLoc: './', // Directory for the output file
    inputLoc: './website', // Directory for all of the website files
    outputName: 'compiled', // Name for the final output .html file
    minify: { // (optional) html-minify minifying settings
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
    },
    ext: { // Where all of the js, css, and html files are located (the root is the input location)
        js: './js',
        css: './css',
        html: './',
        jsm: './jsm' // optional
    }
});

WebCompile.compile();
```

- If you dont specify if you want it minified or formatted, it'll automatically minify the final output.
- Tip: You can sort how the scripts are ordered by putting a letter behind it. It sorts alphabetically.

***

v0.1.301 Changelog:

- Fixed formatting options not working
- Added better logs
- All scripts and styles are now in different tags, instead of one single tag containing everything

***