# CARES Simulator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Features

- Search/view accounts
- Save accounts
- Edit accounts
- Adjust balance
- Add deposits
- Submit refunds
- View account transactions
- Search/view credit card transactions
- View call records
- Add comments
- Edit policies
- Block/unblock accounts
- View facility rates
- Generate account data (including transactions and calls)

## Future Features

- githieya settlement dollars

## Accounts

# Blank

- 2085551111 - missing payment, blank account, pin debit calls ✔️
- 2085551122 - blank account with ivr payments x2 ✔️
- 2085551133 - missing payments (payment declined in cc auths) ✔️
- 2085551144 - missing payment (went to trust instead of advance pay) ✔️
- 2085551155 - APOC ✔️
- 2085551166 - account with no bna. there are payments & bduty notes ✔️

# Partial

- 2085552211 - APOC ✔️
- 2085552222 - L601 (partial) ✔️
- 2085552233 - L287 ✔️
- 2085552244 - D5s (new D5s, old D5s) ✔️

# Broken - Expired

- All 20855533\*\* numbers have ExpFunds

# Complete

- 2085554411 - rates (complete bna, call logs, 1 facility) ✔️
- 2085554422 - rates (complete bna, call logs, 1 facility) ✔️
- 2085554433 - rates (complete bna, call logs, 2 facility) ✔️
- 2085554444 - rates (complete bna, call logs, 2 facility) ✔️
- rates (complete bna, no call logs) x2
- cpni (4 fully established accounts)
- payment (complete bna, call records) x3
- au account (complete bna with no au) x1
- au account (complete bna with AU) x4
- au account (complete bna with AU already removed) x1
- refunds (2x auto reload, 30 days no use, complete bna x3 - one with no cc on file, one with refund already pending, one with already complete)
- APOC
- blocked accounts (L2 85, L2 10 (x2), L2 04 - cobb county)
- dropped calls (HU/CH) over 5min/under 5min (x4 total)
- 1 minute free call (TO)
- lots of dropped calls, some eligible, some not
- BZs (line reset was done)

# Other

- international numbers x3
- complete bna with no call history
- write off over $1
- write off under $1
- write off bc of bduty
- recycled numbers (3mo x2/6mo x4)
