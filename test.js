var loc = 'rating stars-4_5';
var updated = loc.replace(/[^\d_]/g, '').replace('_', '.');





console.log(parseFloat(updated));


Array.prototype.isSorted = function() {
    return (function(direction) {
        return this.reduce(function(prev, next, i, arr) {
            if (direction === undefined)
                return (direction = prev <= next ? 1 : -1) || true;
            else
                return (direction + 1 ?
                    (arr[i-1] <= next) :
                    (arr[i-1] >  next));
        }) ? Number(direction) : false;
    }).call(this);
};

var arr = [5,5,5,5,5,4,3.5,3.5,3,3,3,3,3];
console.log(arr.isSorted());