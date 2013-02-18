var type = require('type');

module.exports = function (base) {
  return new Random(base);
};

var Random = function (base) {
  var random = this;
  type(base).handle({
    'num': function () {
      random.pick = function () {
        return pickInt(base);
      };
      random.next = cycleInt(base);
    },
    'arr': function () {
      random.pick = function () {
        return picrArr(base);
      };
      random.next = cycleArr(base);
    }
  });
};

var pickInt = function (base) {
  return Math.floor(Math.random() * base);
};

var pickArr = function (base) {
  return base[pickInt(base.length)];
};

var cycleInt = function (base) {
  var arr = [];

  for (var i = 0; i < base; i++) {
    arr.push(i);
  }

  return cycleArr(arr);
};

var cycleArr = function (base) {
  var left = base.slice();

  var next = function () {
    var idx = pickInt(left.length),
        r = left.splice(idx, 1);
    
    if (!left.length) {
      left = base.slice();
    }
  };

  return next;
};
