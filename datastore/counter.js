const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);        // taking 1 => '0001'
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  readCounter((err, count) => {
    //console.log('count in readcounter in gnui',count)
    if (err) {
      callback(null, 0); //changed to (null, 0) because if we get an error trying to read count it means we need to set it to zero
    } else {
      //callback(null, data);   
      writeCounter(count + 1, (err, newCount) => {
        if (err) {
          console.log('error writing new count', err);
          //not sure what error we'd get but if we do don't return a count
        } else {
          callback(null, newCount); //if no error give newCount to writeCounter so it can fs.writeFile a new count
        }
      });
    }
  });
};  




// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
