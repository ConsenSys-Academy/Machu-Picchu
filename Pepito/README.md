
# Presentation
|![](https://upload.wikimedia.org/wikipedia/en/9/93/Pepito_Bottaro.jpg)|Pepito is the name of the main character of a [French comic book](https://en.wikipedia.org/wiki/Pepito_(comics)) I loved when I was a kid, in 1960. Pepito was a young corsair of the Caribbean islands. His specialty was his disguises, with which he could fool Hernandez Banana, the Governor of the island of Las Ananas, his favorite (and not very smart) victim. |
|-------|:---------|


In this game, your mission is to build a disguise for Pepito, from [a set of existing components](https://avataaars.com/). Once you built this disguise, you'll record it on the blockchain so that Pepito is sure he'll not reuse it again and will never take twice the same disguise.

![Target look](https://github.com/kvutien/Machu-Picchu/blob/main/20201128%20Avatars.jpeg)

Actually, our real purpose in _Machu Picchu_ is to build a blockchain-based tool to manage personal data of persons-in-need worldwide and the financial humanitarian assistance tokens that helper organisations would give to these persons-in-need. These tokens can be exchanged and bundled in a DEX until their owner have enough tokens that it becomes cost-effective to exchange then into fiat money. More info here: [ConsenSys Academy graduation days](https://youtu.be/9fWTD8gf-Us).

In final the win-win situation is
* Helper institutions share the data of the persons-in-need to improve the efficiency of their incentive and aid programs
* Persons-in-need are free to share and exchange their tokens until they decide to make it real fiat money
* Any private of public entity (large or small) who targets these persons can use the data, that are not confiscated by any single actor.

The amount of "Cash Voucher Assistance" (CVA) totalled $5.6bn in 2019, doubling 2016 levels and accounting for 17.9% of total humanitarian assistance. Financial services taregting the same population is 10 times this amount.

## State of the project submitted end of December 2020
See details in last section below: "ConsenSys Specifications of the dApp"
* [demo video: https://youtu.be/BPxhSxSpo5A](https://youtu.be/BPxhSxSpo5A) 
* backend working, still continuously improved
  * truffle project
  * implement design patterns "Circuit Breaker" and "Factory". Factory is specially useful.
  * protect against overflow attack (SWC-101) and reentrancy attack (SWC-107), in `createPepitoDisguise()`
  * smart contracts deployed locally using "truffle develop"
* frontend operational locally
  * React frontend
  * interfaced with `web3.js` and Metamask, recognizes Metamask current account
  * reflect state change in UI: displays address of deployed contract (shameful hack to comply with submission specs but will be improved :-)
* git
  * github URL: [https://github.com/kvutien/Machu-Picchu](https://github.com/kvutien/Machu-Picchu)
  * have a README doc describing the overview of your project, how to set up and run etc. Read the MacOS section.
  * have a document called `design_pattern_decisions.md` explaining which design patterns you used

# Design
## Smart contract backend design
In the following we'll specify and code a dApp to help you in this mission. But keep this in mind: behind this game, by simply modifying a few lines of code, each disguise can become actually a set of characteristics of a person-in-need that humanitarians can help. Because the blockchain is open, once a person-in-need is recorded, all humanitarian organisations can access the data, and this person keeps full control on these personal data.

![Backend](https://github.com/kvutien/Machu-Picchu/blob/main/Pepito/Final%20Project%20Design.png)

## React Frontend design
The frontend of _Machu Picchu_ is derived from Truffle Box React. As comlpared to the version submitted in December, the `App.js` is reduced to the minimum. All important actions are in distinct React components. We can now improve gradually each function without impacting the others: 
* how to generate disguises,
*  how to store disguises (blockchain or IPFS or OrbitDB or Textile), 
*  how to retrieve a disguise, modify it and store back

We can also derive Pepito into a true humanitarian organisation without disrupting the code.

![Frontend](https://github.com/kvutien/Machu-Picchu/blob/main/Pepito/Final%20Project%20React.png)

# Directory structure
```
.
├── 20201029\ Machu\ Picchu\ Tech\ Stack.png
├── 20201128\ Avatars.jpeg
├── ConsenSys\ Academy?\200\231s\ 2020\ Blockchain\ Developer\ Bootcamp\ Final\ Project\ Spec.docx
├── LICENSE
├── Pepito (the actual Bootcamp Final Project)
│   ├── design_pattern_decisions.md
│   ├── Final\ Project\ Design.png
│   ├── Final\ Project\ Design.pptx
│   ├── Final\ Project\ React.png
│   ├── README.md
│   ├── build
│   ├── client
│   │   ├── node_modules
...
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── public  (React app HTML template and assets)
...
│   │   └── src  (React frontend app)
│   │       ├── App.css
│   │       ├── App.js
│   │       ├── App.test.js
│   │       ├── OptionTable-v7.js
│   │       ├── OptionTable.js
│   │       ├── contracts_abi (compiled Solidity contracts)
...
│   │       ├── Disguise.js
│   │       ├── DisguiseControls.js (block of components controlling the Disguise)
│   │       ├── DisguiseRetrieve.js (component to retrieve the Disguise)
│   │       ├── DisguiseStore.js (component to store on-chain the Disguise)
│   │       ├── DrawAvataar.js (component to display the avataar)
│   │       ├── getWeb3.js
│   │       ├── helpers.js  (various helper functions)
│   │       ├── index.css
│   │       ├── index.js
│   │       ├── logo.svg
│   │       ├── MakePepito.svg (component to connect Web3 and create a Disguise contract under Pepito contract)
│   │       ├── old\ react-create\ code
...
│   │       ├── reportWebVitals.js
│   │       └── setupTests.js
│   ├── contracts
│   │   ├── DraftCommunity.sol (unused placeholder)
│   │   ├── DraftHelperInstitution.sol (unused placeholder)
│   │   ├── Migrations.sol
│   │   ├── Pepito.sol
│   │   └── PepitoDisguise.sol
│   ├── migrations
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_contracts.js
│   ├── test
│   │   ├── PepitoDisguiseTest.js
│   │   └── PepitoTest.js
│   └── truffle-config.js
└── README.md
```

# Demo setup

### MacOS

* Install [Ganache](https://github.com/trufflesuite/ganache/releases/download/v1.2.1/Ganache-1.2.1-mac.zip) and [Brew](https://brew.sh/)
* Install node.js via brew `brew install node`
* Navigate to the folder where you want to clone the Machu-Picchu project
* Clone the project via `git clone https://github.com/kvutien/Machu-Picchu.git` 
* Navidate to Pepito inside the cloned folder (`Machu-Picchu/Pepito`)
* Install the required packages `npm install`
* (as of end Dec 2020) 
  * run `truffle develop`: it will generate its own ganache-like network
  * in `truffle develop` type `migrate`
  * connect Metamask to the local network of `truffle develop` (should be http://127.0.0.1:9545) and import the first 2 Ganache accounts into Metamask
  * Run the app `npm run start`
  * Your browser will open automatically [http://localhost:3000](http://localhost:3000) to view the app.
* (*TODO: target setup process, to be detailed and tested*)
  * configure `truffle-config.js` with `module.exports` containing your Infura credentials and your testnet
  * run `truffle migrate --network` (your testnet)
  * connect Metamask to this testnet where your account has some ETH
  * run the app `heroku URL` or `IPFS`

## Credits
Big thanks to the following resources:

* [https://avataaars.com/](https://avataaars.com): the initial creator of the images
* [https://github.com/fangpenlin/avataaars](https://github.com/fangpenlin/avataaars): the creator of the React avataar random generator
* [https://github.com/keep-network/random-avatar](https://github.com/keep-network/random-avatar): using avataar to illustrate its own blockchain secure random number generator 


# ConsenSys Specifications of the dApp
## Smart contract
* (**done**) Be a Truffle project
* Have a smart contract(s) commented according to the specs which:
  + (**done**) Have a circuit breaker design pattern and at least one other design pattern in Module 10 Lesson 1
  + (**done**) Have security features to protect against at least two attack vectors outlined in Module 9 Lesson 3
  + (**done**) Use a library (`SafeMath.sol`, `EthPM`, etc.) or extend another contract
* (in progress) Have at least 5 tests for each smart contract
* Smart contract should be deployed to a testnet

## Frontend

The front end is liberally inspired from this project [(https://github.com/keep-network/random-avatar)](https://github.com/keep-network/random-avatar) and this project [(https://github.com/fangpenlin/avataaars)](https://github.com/fangpenlin/avataaars)
* (**done**) Have a development server to serve the frontend interaction of the application locally (You should be able to visit a local URL and interact with the application)
  +	(**done**) Frontend should work with `web3.js` / `ethers.js`, Infura and MetaMask to: 
  +	(**done**) Recognize and display current Metamask account
  +	(in progress) Sign transactions that change a deployed contract’s state using MetaMask
*	(**done**) Reflect the successful state change in the UI

## Git
*	(**done**) Be uploaded to its own Github repository
*	(**done**) Have a README doc describing the overview of your project, pointing out directory structure and how to build and run your project locally  
*	(**done**) AND A document called design_pattern_decisions.md explaining which design patterns you used
*	(**done**) AND A document called avoiding_common_attacks.md explaining security steps you took what measures you took to ensure your contracts are not susceptible to common attacks
*	AND A document called deployed_addresses.txt that describes where your contracts live (testnet AND address).
*	A screen recording walking through your Dapp.

