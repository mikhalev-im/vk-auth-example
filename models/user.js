'use strict';

let users = [];


function findById(id, cb) {
  let user = null;
  
  for (let i = 0, len = users.length; i < len; i++) {
    if (users[i].id === id) {
      user = users[i];
      break;
    }
  }
  

  cb(null, user);
}

function findOrCreate(profile, cb) {
  findById(profile.id, function(err, user) {
    if (!user) {
      users.push(profile);
    } 

    cb(null, profile);
  });
  
  
}


module.exports.findById = findById;
module.exports.findOrCreate = findOrCreate;