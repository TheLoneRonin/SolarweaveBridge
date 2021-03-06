### Solarweave Benchmarks

#### Auxillary Queries

Command Type | Estimated time in MS
--- | ---
balance | 485ms
latest block | 833ms

*Please note that benchmarks are run on devnet. You will get relatively similar performance on testnet/mainnet if your bandwidth and network speed have enough Gigabits per second.*

#### Cache Benchmarks

Parallelization | Average Upload Time | Lowest Upload Time | Highest Upload Time
--- | --- | --- | ---
1 | 2769ms | 1961ms | 12013ms
4 | 768ms | 766ms | 863ms
8 | 606ms | 587ms | 660ms
25 | 182ms | 159ms | 197ms
50 | 101ms | 87ms | 108ms
100 | 66ms | 55ms | 70ms

#### Livestream Benchmarks

Parallelization | Average Upload Time | Lowest Upload Time | Highest Upload Time
--- | --- | --- | ---
1 | 2495ms | 1955ms | 10809ms
4 | 778ms | 756ms | 862ms
8 | 595ms | 585ms | 652ms
25 | 183ms | 160ms | 243ms
50 | 99ms | 88ms | 113ms
100 | 68ms | 58ms | 76ms


#### Compression Benchmarks

Type | Average Size | Lowest Size | Highest Size
--- | --- | --- | ---
Uncompressed | 1498 bytes | 895 bytes | 1933 bytes
Compressed | 992 bytes | 728 bytes | 1160 bytes
% Improvement | 34% | 19% | 40%
