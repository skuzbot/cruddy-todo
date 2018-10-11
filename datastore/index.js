const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

//var items = {};

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
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, data) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      idObj = { //test was expecting an object with id: and text: good call on using readFile
        id: id, 
        text: data.toString('utf8') };
      callback(null, idObj);
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, data) => {         
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err) => {
        if (err) {
          console.log('error in update writefile');
          //console.log(new Error(`No item with id: ${id}`));
        } else {
          callback(null, { 'id': id, 'text': text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.unlink(exports.dataDir + '/' + id + '.txt', (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
