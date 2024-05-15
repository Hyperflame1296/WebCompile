const WebCompile = require('./index')({
    outputLoc: './', // Directory for the output file
    inputLoc: './example', // Directory for all of the website files
    outputName: 'a', // Name for the final output .html file
    ext: { // Where all of the js, css, and html files are located (the root is the input location)
        js: './js',
        css: './css',
        html: './'
    }
});

WebCompile.compile();