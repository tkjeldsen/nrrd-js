var test = require('tape');
var nrrd = require('./nrrd.js');
var fs = require('fs');

test("binaryInlineFile", function (t) {
    var file = nrrd.parse(fs.readFileSync('example1.nrrd'));
    
    t.equal(file.type, 'uint8');
    t.equal(file.dimension, 3);
    t.equal(file.sizes.length, 3);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 512);
    t.equal(file.sizes[2], 512);
    t.equal(file.data.length, 3*512*512);
    
    t.end();
});

test("textInlineFile", function (t) {
    var file = nrrd.parse(fs.readFileSync('example2.nrrd')),
        i, list = [1,2,3, 65000,64000,63000, 10000,11000,12000, 4,5,6];
    
    t.equal(file.type, 'uint16');
    t.equal(file.dimension, 2);
    t.equal(file.sizes.length, 2);
    t.equal(file.sizes[0], 3);
    t.equal(file.sizes[1], 4);
    t.equal(file.data.length, 3*4);
    t.equal(file.data.byteLength, 3*4*2);
    
    for(i=0; i<list.length; i++) {
        t.equal(file.data[i], list[i]);
    }
    
    t.end();
});
