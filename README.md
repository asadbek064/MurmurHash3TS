# MurmurHash3_32 TypeScript Implementation (Fastest Hash)

## Overview

TypeScript implementation of the MurmurHash3 32-bit hash function. MurmurHash3 is a fast and efficient hash function suitable for hash-based lookups and data partitioning. The implementation includes a benchmark function to measure the average execution time of hashing operations.


## Purpose
MurmurHash3_32 offers **high performance** and **good hash distribution**, making it ideal for generating unique hashes quickly. It’s efficient for cases where speed is crucial, but *it is not suitable for cryptographic purposes*.


I created this implementation to quickly generate unique hashes for my [AniTrek](https://anitrek.com/) application, which fetches data from multiple third-party sources. Caching these results is crucial to avoid hitting rate limits. Using `murmurhash3_32` allows me to generate efficient keys based on request parameters and store results in Redis. 


## Why it's faster than other hashes
MurmurHash2 processes **four bytes** at a time, unlike many algorithms that handle one byte at a time. This makes it faster for longer keys.

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

## License
This project is licensed under the MIT License.
