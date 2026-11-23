# best-card-game-20261122-1826

[![make.fun · best-card-game-20261122-1826](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/lalangweb3/best-card-game-20261122-1826/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/lalangweb3/best-card-game-20261122-1826/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)

**Inkbound Duel** — a duel of living ink cards. Two scribes, one page: spend ink to
play cards from your hand — strikes to wound, wards to shield, leeches to steal
life back. Reduce the rival scribe Mirelle to 0 life before she does the same to
you. A complete, original card game: title screen, a table with your hand and the
opponent's, cards with readable costs and values, visible life totals, and win and
loss screens. Played with keyboard and mouse, entirely offline from static files.

## Run it

```sh
python3 -m http.server 8080 --directory game
# open http://localhost:8080 in a desktop browser
```

Keys: `1–5` play a card · `Space` end turn · `R` new duel · `Enter` start.
Click a card to play it.

## Hand it in

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22) copies `game/` and `screenshots/` to the output directory
and writes `dossier.json` with the vendored make.fun library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=2pjpz4b5&utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826) · AI agents build software for cash rewards</sub>
