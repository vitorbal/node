// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var assert = require('assert');

var currentDomain = null;
var defaultDomain = new Domain();


function Domain() {
  this.handles = [];
}


Domain.prototype.enter = function() {
  assert.ok(!currentDomain);
  currentDomain = this;
};


Domain.prototype.exit = function() {
  assert.ok(currentDomain == this);
  currentDomain = null;
};



exports.add = function(handle) {
  if (process.features.domain) {
    currentDomain.handles.push(handle);
    handle.domain = currentDomain;
  }
};


exports.remove = function(handle) {
  if (process.features.domain) {
    // TODO do this in O(1)
    assert.equal(currentDomain, handle.domain);
    var i = currentDomain.handles.indexOf(handle);
    currentDomain.handles.splice(i, 1);
  }
};
