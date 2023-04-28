function arr1(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return;
  }
  arr = arr.sort()
  var arrry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
          arrry.push(arr[i]);
      }
  }
  return arrry;
}
var arr = [1, 2, 2, 3];
console.log(arr1(arr));