const ReadyPrimes = require('ready-primes').ReadyPrimes;
const bcoin = require('bcoin').set('main');
const PI = require("pi");
const _ = require('lodash');
const SHA256 = require("crypto-js/sha256");
const PdfPrinter = require('pdfmake');
const fs = require('fs');

const fonts = {
    RobotoMono: {
        normal: 'fonts/RobotoMono-Regular.ttf',
        bold: 'fonts/RobotoMono-Medium.ttf'
    },
    Cousine: {
        normal: 'fonts/Cousine-Regular.ttf',
        bold: 'fonts/Cousine-Medium.ttf'
    },
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf'
    }
};

var printer = new PdfPrinter(fonts);

function blankLines(arr, lines) {
    var r = ''
    arr.forEach((e, i, a) => {
        r += e;
        r += '\n';
        if (i > 0 && i % lines == 0) {
            r += '\n';
        }
    })

    return r;
}

function makePdf(rows, primes, hashArr) {
    var piStr = '3' + PI(rows - 1, false);
    var pis = piStr.split('');

    var head1 = _.times(rows, v => {
        return _.padStart(v, 5, '0');
    });

    //var vol1 = _.times(TOTAL_ROWS, v => {
    //    return SHA256("Message" + v);
    //});

    var docDefinition = {
        header: function (currentPage, pageCount, pageSize) {
            return [
                { text: (currentPage % 2) ? 'QuantumXie' : 'BOOK', alignment: (currentPage % 2) ? 'right' : 'left', margin: 10}
            ]
        },
        footer: function (currentPage, pageCount) {
            return [
                { text: currentPage.toString() + ' of ' + pageCount, alignment: 'center', margin: 2 }];
        },
        content: [
            {
                text: 'QuantumXie - DLTDOJO BOOK 2018',
                alignment: 'center',
                style: 'header'
            },
            '\n'
            ,
            {
                columns: [
                    {
                        width: 10,
                        text:
                            {
                                text: blankLines(pis, 20),
                                style: 'code'
                            }
                    },
                    {
                        width: 35,
                        text:
                            {
                                text: blankLines(primes, 20),
                                style: 'code'
                            }
                    },
                    {
                        width: 30,
                        text:
                            {
                                text: blankLines(head1, 20),
                                style: 'code'
                            }
                    },
                    {
                        width: 400,
                        text: {
                            text: blankLines(hashArr, 20),
                            style: 'code'
                        }
                    }
                ]
            },
            '\n\nWow, you\'ve read the whole document! Congratulations :D'
        ],
        styles: {
            header: {
                fontSize: 18,
                font: "Roboto",
                bold: true
            },
            code: {
                fontSize: 8,
                font: "Cousine"
            },
            pi: {
                fontSize: 8,
                font: "Cousine"
            },
            bigger: {
                fontSize: 15,
                italics: true
            }
        },
        defaultStyle: {
            columnGap: 10
        }
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('quantumxie-mapx-draft.pdf'));
    pdfDoc.end();
}

// Open the pool (implicitly opens mempool and chain).
async function readBlock(rows) {
  const util = bcoin.util;
  // SPV chains only store the chain headers.
  var chain = new bcoin.chain({
    db: 'leveldb',
    location: './spvchain',
    spv: true
  });
  await chain.open();

  // console.log('Current height:', chain.height);

  var r = []

  for (i = 0; i < rows; i++) {
    var entry = await chain.getEntry(i);
    // console.log(entry);
    var hash = util.revHex(entry.hash)
    // console.log(entry.height, hash);
    r.push(hash);
  }
  return r;
}

const TOTAL_ROWS = 2001;

async function writePdf(num){
    var primes = await ReadyPrimes.primes(TOTAL_ROWS);
    //console.log(primes)
    var hashArr = await readBlock(TOTAL_ROWS);
    //console.log(hashArr)
    primes.unshift(1);
    makePdf(TOTAL_ROWS, primes, hashArr);
}

writePdf()