const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, count, id) => {
    
    id = count;
    const filename = exports.dataDir + '/' + id + '.txt';
    items[id] = text;
  
    fs.writeFile(filename, text, (err) => {
      if (err) {
        console.log('error: file not written');
      } else {
        callback(null, { id, text });
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('error: no directory found');  
    } else {
      var data = [];
      files.forEach(file => {
        if (file) {
          fs.readFile(exports.dataDir + '/' + file, (err, fileData) => {
            if (err) {
              console.log("dir is : ", exports.dataDir + '/' + file);
              console.log('error: no file found');
            } else {
              console.log('our fileData is: ', fileData);
              data.push(fileData);
              callback(null, data);
            }
          });
        }
      });    
    }
  });
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
