import imports from './imports';

imports();

let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this,1);

// console.error("", __dirname);

pdfParser.on("pdfParser_dataError", errData => console.error(errData));
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.error("done parsing data", undefined);
    fs.writeFile("./mocks/sponsors.txt", pdfParser.getRawTextContent());
});

// fs.readdir("./", (err, files) => {
//     files.forEach(file => {
//         console.log("file in dir", file);
//     });
// })

pdfParser.loadPDF("./mocks/2018-08-16-tier-25-register-sponsors.pdf");