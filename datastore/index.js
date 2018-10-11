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
    //items[id] = text;
  
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
        let fileObj = { id: file.substr(0, 5), text: file.substr(0, 5) };
        data.push(fileObj);
      });    
      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  //var text = items[id];
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('err is : ', err);
      //console.log('error: no directory found');
    } else {
    
      if (err) {
        console.log('id in fail', id);
        callback(new Error(`No item with id: ${id}`));
      } else {
        console.log('id in else', id);
        console.log('id in fileData', fileData);
        callback( id, fileData );
      }
    }
  });
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
