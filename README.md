# componentDoc-cli #

Command Line Interface for [componentDoc](https://github.com/msg-systems/componentDoc).



## Installation ##

Use the Node Package Manager (NPM) to install this module locally (default) or globally (with option `-g`):

		$ npm install [-g] componentDoc-cli


## Options ##

All Options are optional, beacuse there is a default value for each option.

- `outputFolder`  string - path and name of the folder for the generated documentation [**default**: *'bld'*]
- `outputName`  string - name of the generated documentation (HTML and PDF) [**default**: *'componentDoc'*]
- `template`  string - path to the template, that should be used for the generation of the documatation
			 [**default**: is given in the componentDoc module itself]
- `buildPDF`  string - flag, if a PDF should be created as well [**default**: *'true'*]
- `log`  function - function for log information 
- `verbose`  function - function for verbose information
- `error`  function - function for error information 


## License ##

Copyright (c) 2016 msg systems ag (http://www.msg-systems.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.