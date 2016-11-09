#!/usr/bin/env node
/*
 **  componentDoc-cli -- a command line interface for a
 **  JavaScript lightweight documentation generator
 **  for documentation as HTML and/or PDF from 'component-yaml'-files
 **  Copyright (c) 2016 msg systems ag (http://www.msg-systems.com/)
 **
 **  Permission is hereby granted, free of charge, to any person obtaining
 **  a copy of this software and associated documentation files (the
 **  "Software"), to deal in the Software without restriction, including
 **  without limitation the rights to use, copy, modify, merge, publish,
 **  distribute, sublicense, and/or sell copies of the Software, and to
 **  permit persons to whom the Software is furnished to do so, subject to
 **  the following conditions:
 **
 **  The above copyright notice and this permission notice shall be included
 **  in all copies or substantial portions of the Software.
 **
 **  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 **  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 **  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 **  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 **  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 **  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 **  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global require: false */
/* global process: false */

/*  standard requirements  */
var fs = require("fs");
var path = require("path");
var util = require("util");
var glob = require("glob");

/*  extra requirements  */
var pkg = require("package");
var dashdash = require("dashdash");
var colors = require("colors");

/*  internal requirements  */
var componentDoc = require("componentDoc");

/*  gracefully die  */
var die = function (msg) {
    console.error("componentDoc: ERROR: ", msg);
    process.exit(1);
};

/*  command-line argument parsing  */
var options = [
    {names: ["version", "V"], type: "bool", "default": false, help: "Print tool version and exit."},
    {names: ["help", "h"], type: "bool", "default": false, help: "Print this help and exit."},
    {names: ["verbose", "v"], type: "bool", "default": false, help: "Print verbose processing information."},
    {names: ["outputFolder", "d"], type: "string", "default": "bld", help: "Output folder for the created html and pdf."},
    {names: ["outputName", "n"], type: "string", "default": "componentDoc", help: "Name for the created html and pdf."},
    {names: ["template", "t"], type: "string", "default": "", help: "Template for the html, that should be created."},
    {names: ["buildPDF", "p"], type: "string", "default": "true", help: "Flag for creating an pdf out of the generated html."}
];
var parser = dashdash.createParser({
    options: options,
    interspersed: false
});
try {
    var opts = parser.parse(process.argv);
    var args = opts._args;
} catch (e) {
    die(e.message);
}
if (opts.help) {
    var help = parser.help().trimRight();
    console.log("componentDoc: USAGE: componentDoc [options] arguments\n" + "options:\n" + help);
    process.exit(0);
}
else if (opts.version) {
    var p = pkg(module);
    console.log(util.format("%s componentDoc %s", p.name, p.version));
    process.exit(0);
}
var input = args.length ? args : ["."];
var yamlfiles = glob.sync("**/component.yaml", {cwd: input[0]});

var files = [];
yamlfiles.forEach(function (file) {
    files.push(path.join(input[0], file));
});


componentDoc.generateDoc(files, {
    outputFolder: opts.outputFolder,
    outputName: opts.outputName,
    template: opts.template,
    buildPDF: opts.buildPDF,
    log: function (msg) {
        process.stdout.write(msg + "\n");
    },
    verbose: function (filename, action, msg) {
        if (opts.verbose) {
            filename = path.relative(process.cwd(), filename);
            var msg = "++ " + colors.cyan.bold(filename) + ": " + colors.yellow(action) + ": " + msg + "\n";
            process.stderr.write(msg);
        }
    },
    error: function (filename, action, msg, fix) {
        filename = path.relative(process.cwd(), filename);
        var msg = "++ " + colors.cyan.bold(filename) + ": " + colors.red.bold(action) + ": " + msg + "\n";
        process.stderr.write(msg);
        if (fix) {
            process.stderr.write("Solution: " + colors.yellow.bold(fix) + "\n")
        }
        die("process stopped".red.bold);
    }
});