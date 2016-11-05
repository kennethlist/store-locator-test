Vue.filter('floor', function(value) {
    return Math.floor(value);
})

Vue.filter('metersToMiles', function(value) {
    return MapUtility.convertMetersToMiles(value);
})

Vue.filter('recordLength', function(result, key) {
    this.$set(key, result.length);
    return result;
})

Vue.filter('limit', function(arr, limit) {
  if(limit < 0){
    return arr;
  }
  return arr.slice(0, Number(limit))
})
