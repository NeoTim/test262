// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    IteratorClose is not called when rest element evaluation has exhausted the
    iterator
info: |
    ArrayAssignmentPattern :
        [ AssignmentElementList , Elisionopt AssignmentRestElementopt ]

    [...]
    7. If AssignmentRestElement is present, then
       a. Let status be the result of performing
          IteratorDestructuringAssignmentEvaluation of AssignmentRestElement
          with iteratorRecord as the argument.
    8. If iteratorRecord.[[done]] is false, return IteratorClose(iterator,
       status).
    9. Return Completion(status).
features: [Symbol.iterator]
es6id: 12.14.5.2
esid: sec-runtime-semantics-destructuringassignmentevaluation
---*/

var nextCount = 0;
var returnCount = 0;
var iterable = {};
var x, y;
var iterator = {
  next: function() {
    nextCount += 1;
    return { value: nextCount, done: nextCount > 1 };
  },
  return: function() {
    returnCount += 1;
  }
};
iterable[Symbol.iterator] = function() {
  return iterator;
};

[ x , ...y ] = iterable;

assert.sameValue(nextCount, 2, 'nextCount');
assert.sameValue(returnCount, 0, 'returnCount');
assert.sameValue(x, 1, 'x');
assert.sameValue(y.length, 0, 'y.length');
