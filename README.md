# CARES Simulator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to use
Enter any of the phone numbers under the Accounts heading to pull up an account with generated information.  The simulator is detached from the main system so any changes made will only last as long as the browser is opened. It is safe to click anything within the simulator, although some links to documents or images may not properly load if not connected to the Viapath/GTL VPN.

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
- 2085551177 - balance but no cc on file

# Partial

- 2085552211 - APOC ✔️
- 2085552222 - L601 (partial) ✔️
- 2085552233 - L287 ✔️
- 2085552244 - D5s (new D5s, old D5s) ✔️
- 2085552255 - rates (complete bna, call logs, 2 facility) ✔️
- 2085552266 - rates (complete bna, call logs, 2 facility) ✔️

# Broken - Expired

- All 20855533xx numbers have ExpFunds

# Complete

- 20855544xx numbers ending with odd last digits have AUs, evens have none ✔️
- 2085554411 - APOC ✔️
- 2085554422 - blocked account L2 85 ✔️
- 2085554433 - L2 10 ✔️
- 2085554444 - L2 04 - cobb county ✔️
- 2085554455 - au account (complete BNA with AU already removed) ✔️
- 2085554466 - dropped calls (HU/CH) over 5min/under 5min (x4 total) ✔️
- 2085554477 - 1 minute free call (TO) ✔️
- 2085554488 - BZs (line reset was done) ✔️

# Other

- 0114401205551111 - international number ✔️
- 2085559911 - complete bna with no call history & auto reload ✔️
- write off over $1
- write off under $1
- write off bc of bduty
- recycled numbers (3mo x2/6mo x4)
- refund pending
- refund complete with already complete
