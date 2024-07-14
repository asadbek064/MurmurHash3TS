function murmurhash3_32(key, seed) {
    var rem = key.length & 3;
    var bytes = key.length - rem;
    var h1 = seed;
    var c1 = 0xcc9e2d51;
    var c2 = 0x1b873593;
    var i = 0;
    var k1 = 0;
    while (i < bytes) {
        k1 =
            (key.charCodeAt(i) & 0xff) |
                ((key.charCodeAt(++i) & 0xff) << 8) |
                ((key.charCodeAt(++i) & 0xff) << 16) |
                ((key.charCodeAt(++i) & 0xff) << 24);
        i++;
        k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((k1 & 0xffff) * c2 + ((((k1 >> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        var h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
        h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654) << 16);
    }
    k1 = 0;
    switch (rem) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= key.charCodeAt(i) & 0xff;
            k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 16;
    h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
}
function measurespeed() {
    var key = 'mylinx.cc';
    var iterations = 30000;
    var sampleSize = 7;
    var executionTimes = [];
    // Sample execution time
    for (var j = 0; j < sampleSize; j++) {
        var start = process.hrtime();
        for (var i = 0; i < iterations; i++) {
            murmurhash3_32(key, 0);
        }
        var end = process.hrtime(start);
        var elapsedTimeMs = (end[0] * 1000 + end[1] / 1000000) / iterations;
        executionTimes.push(elapsedTimeMs);
    }
    // sort execution times
    executionTimes.sort(function (a, b) { return a - b; });
    // remove top and bottom
    executionTimes = executionTimes.slice(1, -1);
    // calculate the average time per hash
    var averageTimeMs = executionTimes.reduce(function (acc, curr) { return acc + curr; }, 0) / executionTimes.length;
    console.log("Average time per hash: ".concat(averageTimeMs.toFixed(5), " ms"));
}
measurespeed();
