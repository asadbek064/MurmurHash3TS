# MurmurHash3 32-bit TypeScript Implementation

## Overview

TypeScript implementation of the MurmurHash3 32-bit hash function. MurmurHash3 is a fast and efficient hash function suitable for hash-based lookups and data partitioning. The implementation includes a benchmark function to measure the average execution time of hashing operations.


## Purpose
MurmurHash3_32 is ideal for generating unique hashes quickly, especially in non-cryptographic contexts. It’s used in the [AniTrek](https://anitrek.com/) app for efficient caching and key generation.

## Advantages
MurmurHash3 is faster than many other hashes because it processes multiple bytes at a time, making it efficient for larger datasets.

## Usage

### MurmurHash3_32 Function
This function computes a 32-bit MurmurHash3 hash of a given string with a specified seed.

#### Parameters
* `key`: The input string to hash.
* `seed`: The seed value for the hash function.

#### Returns
* A 32-bit unsigned integer hash value.

#### Example
```ts
    const hash = murmurhash3_32('bannan pie', 0);
```

Benchmarks
-------------------------

The benchmarked reference system uses an Intel i7-9700K cpu, and runs Ubuntu x64 20.04.
The [open source benchmark program] is compiled with `clang` v10.0 using `-O3` flag.

| Hash Name     | Width | Bandwidth (GB/s) | Small Data Velocity | Quality | Comment |
| ---------     | ----- | ---------------- | ----- | --- | --- |
| __XXH3__ (SSE2) |  64 | 31.5 GB/s        | 133.1 | 10
| __XXH128__ (SSE2) | 128 | 29.6 GB/s      | 118.1 | 10
| _RAM sequential read_ | N/A | 28.0 GB/s  |   N/A | N/A | 
| City64        |    64 | 22.0 GB/s        |  76.6 | 10
| T1ha2         |    64 | 22.0 GB/s        |  99.0 |  9 | Slightly worse [collisions]
| City128       |   128 | 21.7 GB/s        |  57.7 | 10
| __XXH64__     |    64 | 19.4 GB/s        |  71.0 | 10
| SpookyHash    |    64 | 19.3 GB/s        |  53.2 | 10
| Mum           |    64 | 18.0 GB/s        |  67.0 |  9 | Slightly worse [collisions]
| City32        |    32 |  9.1 GB/s        |  66.0 | 10
| **_Murmur3_** |    32 |  3.9 GB/s        |  **56.1** | **10**
| SipHash       |    64 |  3.0 GB/s        |  43.2 | 10
| FNV64         |    64 |  1.2 GB/s        |  62.7 |  5 | Poor avalanche properties
| Blake2        |   256 |  1.1 GB/s        |   5.1 | 10 | Cryptographic
| SHA1          |   160 |  0.8 GB/s        |   5.6 | 10 | Cryptographic but broken
| MD5           |   128 |  0.6 GB/s        |   7.8 | 10 | Cryptographic but broken

MurmurHash3 32-bit is notably fast with a bandwidth of 3.9 GB/s and a small data velocity of 56.1, making it efficient for high-performance applications. While not the absolute fastest, it performs well and provides a good balance of speed and hash quality.

## License
This project is licensed under the MIT License.
