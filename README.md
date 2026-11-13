# news-image-01 — Sum up 13 November's world news in one image

A Node 22 program that copies the selected candidate image to
`/output/entry.png`. The three candidates (in `candidates/`) each sum up the world news of
Friday 13 November 2026 in a single image, with short legible labels
and one clear composition that reads at ~300px:

- Ukraine peace talks / prisoner swap
- Israeli strike on Nasser Hospital in Gaza
- Nvidia CEO Jensen Huang resigns
- Microsoft 365 global outage
- LNG tanker hits a mine in the Strait of Hormuz
- FBI on North Korean hackers' $400M crypto theft

## Candidates

1. Front-page / editorial collage (default, strongest)
2. Hero scene with insets
3. Globe / world-map montage with labelled vignettes

All three images are 1024x1024 JPEG, each under 1 MiB.

## Usage

Edit the `CANDIDATE` constant at the top of `main.ts` to select 1, 2 or 3,
then run:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Without `MAKEFUN_OUTPUT_DIR` the output goes to `/output/entry.png`.

## Determinism

The program is fully deterministic: no network, no randomness, no clock.
Two runs with the same candidate write byte-identical output.
