let fs = require('fs');
let path = require('path');
let prettier = require('prettier');
let ver = require('./package.json').version
const { minify } = require('html-minifier');

function merge(ext, dir, skipFiles = [], sur, attr) {
    let res = [];
    let f = fs.readdirSync(dir);
    let files = f.filter(a => a.endsWith(`.${ext}`) && !skipFiles.includes(a));
    files.forEach(file => {
        let filePath = path.join(dir, file);
        let cont = fs.readFileSync(filePath, 'utf8');
        if (typeof sur !== 'undefined') {
            cont = `<${sur} id=${file} ${attr || ''}>${cont}</${sur}>`
            res.push(cont);
        } else {
            res.push(cont);
        }
    });
    return res.join('\n\n');
}

let m = `[WebCompile v${ver}] - `
module.exports = function (options) {
    let outputLoc = options.outputLoc || './';
    let inputLoc = options.inputLoc || './website';
    let outputName = options.outputName || 'compiled';

    let formatting = typeof options.formatting !== 'undefined'
    let minifying = typeof options.minify !== 'undefined'

    let ext = options.ext || {}
    if (formatting && minifying) {
        throw (m + 'ERROR - The compiler config can\'t have \'format\' and \'minify\' in it at the same time.');
    } else {
        return {
            compile: async function () {
                console.log(m + 'Merging...');
                let mergedCSS = merge('css', path.join(inputLoc, ext.css || './'), [], 'style');
                let mergedJS = merge('js', path.join(inputLoc, ext.js || './'), [], 'script', 'type=\"text/javascript\"');
                let mergedJSM = merge('jsm', path.join(inputLoc, ext.jsm || './'), [], 'script', 'type=\"module\"');
                let mergedHTML = merge('html', path.join(inputLoc, ext.html || './'), [`${outputName}.html`]);
                let mark = `<!-- Compiled with WebCompile v${ver} -->\n`;

                let htmlContent = `
                    ${!mergedHTML.includes('<!DOCTYPE html>') ? '<!DOCTYPE html>' : ''}
                    ${mergedHTML}

                    ${mergedCSS}

                    <script type=\"text/javascript\">
                        console.log(\'%cWebCompile v0.1.3.01\', \`
                            color: #fff;
                            font: bold 20px monospace;
                            background: linear-gradient(45deg, #19f, #f00, #0f0);
                            text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
                        \`);
                    </script>

                    ${mergedJSM}

                    ${mergedJS}
                `

                
                if (formatting) {
                    console.log(m + 'Formatting...');
                    htmlContent = await prettier.format(htmlContent, { parser: 'html', ...options.formatting });
                } else if (minifying) {
                    console.log(m + 'Minifying...');
                    htmlContent = minify(htmlContent, options.minify);
                } else if (!minifying && !formatting) {
                    console.log(m + 'Minifying...');
                    htmlContent = minify(htmlContent, {
                        collapseWhitespace: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true
                    });
                }

                htmlContent = mark.concat(htmlContent)

                console.log(m + 'Writing to output...')
                fs.writeFileSync(path.join(outputLoc, `${outputName}.html`), htmlContent);
                console.log(m + 'Finished compiling!')
            }
        }
    }
}
