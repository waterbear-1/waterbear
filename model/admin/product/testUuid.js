var UUID = require('uuid-js');

 
var uuid4 = UUID.create();
console.log(uuid4.toString()); 
console.log("=====================")
var uuid1 = UUID.create(1);
console.log(uuid1.toString());