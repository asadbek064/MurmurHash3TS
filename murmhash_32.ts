function murmurhash3_32(key: string, seed: number): number {
  let rem = key.length & 3
  let bytes = key.length - rem
  let h1 = seed
  let c1 = 0xcc9e2d51
  let c2 = 0x1b873593
  let i = 0
  let k1 = 0

  while (i < bytes) {
    k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24)
    i++

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
    k1 = (k1 << 15) | (k1 >>> 17)
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >> 16) * c2) & 0xffff) << 16)) & 0xffffffff

    h1 ^= k1
    h1 = (h1 << 13) | (h1 >>> 19)

    const h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654) << 16)
  }

  k1 = 0

  switch (rem) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff
      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff
      h1 ^= k1
  }

  h1 ^= key.length

  h1 ^= h1 >>> 16
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 13
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff
  h1 ^= h1 >>> 16

  return h1 >>> 0
}

function measurespeed(): void {
  const key: string = 'mylinx.cc';
  const iterations: number = 30000;
  const sampleSize: number = 7;
  let executionTimes: number[] = [];
  
  // Sample execution time
  for (let j = 0; j < sampleSize; j++) {
    const start: [number, number] = process.hrtime(); 
    for (let i = 0; i < iterations; i++) {
      murmurhash3_32(key, 0); 
    }
    const end: [number, number] = process.hrtime(start); 
    
    const elapsedTimeMs: number = (end[0] * 1000 + end[1] / 1000000) / iterations;
    
    executionTimes.push(elapsedTimeMs);
  }

  // sort execution times
  executionTimes.sort((a, b) => a - b);
  
  // remove top and bottom
  executionTimes = executionTimes.slice(1, -1);

  // calculate the average time per hash
  const averageTimeMs: number = executionTimes.reduce((acc, curr) => acc + curr, 0) / executionTimes.length;
  
  console.log(`Average time per hash: ${averageTimeMs.toFixed(5)} ms`);
}

measurespeed()
