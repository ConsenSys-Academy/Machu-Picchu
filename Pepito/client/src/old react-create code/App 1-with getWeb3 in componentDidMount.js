// class App.js
import React, { Component } from 'react';	// from node.js module
import './App.css';                       // specific
import OptionTable from './OptionTable'; 	// specific
import Avatar from 'avataaars'; 	        // from node.js module
import { BounceLoader } from 'react-spinners'; 	// from node.js module
import getWeb3 from "./getWeb3";          // to call web3 API
import Pepito from "./contracts_abi/Pepito.json";                 // to call web3 API
import PepitoDisguise from "./contracts_abi/PepitoDisguise.json"; // to call web3 API

/**
 * @author Vu Tien Khang
 * @notice React root component for Pepito frontend
 * @dev web3 calls work in progress
 */
class App extends Component {

  constructor() {
    super()	//ES6 class constructors MUST call super if they are subclasses
    this.state = {};	//state holds variables of the component App
    this.options = {	//disguise options to react-select
      topType: ['Eyepatch', 'Hat', 'Hijab', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairMiaWallace', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'NoHair', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', /*'ShortHairShaggy',*/ 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart', 'Turban', 'WinterHat1', 'WinterHat2', 'WinterHat3', 'WinterHat4'],
      hatColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
      accessoriesType: ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'],
      hairColor: ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'],
      facialHairType: ['BeardLight', 'BeardMagestic', 'BeardMedium', 'Blank', 'MoustacheFancy', 'MoustacheMagnum'],
      facialHairColor: ['Auburn', 'Black', 'Brown', 'BrownGolden', 'brownBlack', 'Platinum', 'red'],
      clotheType: ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', /*'Graphics',*/ 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'],
      clotheColor: ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'],
      eyeType: ['Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy', 'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'],
      eyebrowType: ['Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural', 'FrownNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'],
      mouthType: ['Concerned', 'Default', 'Disbelief','Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'],
      skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']
    }
    this.state.loading = false;
    this.storeDisguise = this.storeDisguise.bind(this);   // make storeDisguise know of "this"
    this.setRandomDisguise();                           // set random set of disguise options
  }

  state = { storageValue: 0, web3: null, accounts: null, contract: null, ownerPepito: null };          // to call web3 API

  async componentDidMount() {	//React hook that runs after the first render() lifecycle
    try {
      // Get network provider and web3 instance. 
      const web3 = await getWeb3();
      console.log("web3", web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Pepito.networks[networkId];
      const instance = new web3.eth.Contract(
        Pepito.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const ownerPepito = await instance.methods.owner().call();
      console.log("instance PepitoContract", instance, ". public variable 'owner' in Pepito", ownerPepito);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
  
      this.setState({ web3, accounts, contract: instance, ownerPepito } 
        ,() => {
          console.log("1.user account", accounts,
            ".\n 1.Pepito contract", instance,
            ".\n  1.'owner' variable in Pepito", ownerPepito);
        });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  /** section copied from truffle react, to be adapted
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(500).send({ from: accounts[0] });

    // Update state with the result.
    this.setState({ storageValue: response });
  };
    */ 

  async storeDisguise() {
    /** 
    * @dev to be refined and tested
    */
    const { accounts, contract, ownerPepito } = this.state;
    /*
    if (typeof contract !== 'undefined' && typeof ownerPepito !== 'undefined')  // make sure that web3 is loaded
    */
    console.log("user account in state", accounts, ".\n Pepito contract in state", contract, ". 'owner' variable in Pepito", ownerPepito);
    const pepitoDisguise = await contract.methods.createPepitoDisguise();
    console.log("instance pepitoDisguise created by Pepito", pepitoDisguise);
    var HatColor = 1;    //  test value, should be the rank in the array of HatColor
    await pepitoDisguise.methods.setHatColor().call({ from: accounts[0] });
    const storedDisguise = await pepitoDisguise.methods.storedDisguise().call();
    console.log("storedDisguise", storedDisguise);

    /* 
    await pepitoDisguise.methods.setTopType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setHatColor().call({ from: accounts[0] });
    await pepitoDisguise.methods.setAccessoriesType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setHairColor().call({ from: accounts[0] });
    await pepitoDisguise.methods.setFacialHairType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setFacialHairColor().call({ from: accounts[0] });
    await pepitoDisguise.methods.setClotheType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setClotheColor().call({ from: accounts[0] });
    await pepitoDisguise.methods.setEyeType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setEyebrowType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setMouthType().call({ from: accounts[0] });
    await pepitoDisguise.methods.setSkinColor().call({ from: accounts[0] });
    */
  }

  async getDisguise() {
    /** 
    * @dev to be refined and tested
    */
  }

  render() {	/** @dev React main display renderer */
    /** @dev retrieve pepito disguise options from this.state */
    const {topType, hatColor, accessoriesType, hairColor, facialHairType, facialHairColor,
      clotheType, clotheColor, eyeType, eyebrowType, mouthType, skinColor} = this.state;
    return (
      <div className="container text-center">
        {this.state.error ? 	// if error is true
          <div className="alert alert-danger m-5" role="alert">
            Please check if Metamask is enabled and connected to the correct network
          </div>:<div></div>	// if error is false
        }
        <header>
          <h1 className="m-5">Pepito Disguises <sup>(not yet) on blockchain</sup></h1>
        </header>
        <div>
          <table>
            <tr>
              <th rowspan="3"><img src="./machupicchu_logo.png" alt="Machu-Picchu" width="100" height="100" /></th>
              <td><button className="btn btn-lg btn-secondary mb-5" onClick={this.setRandomDisguise.bind(this)}>Generate random disguise</button></td>
            </tr>
            <tr>
              <td><button className="btn btn-lg btn-secondary mb-5" onClick={this.storeDisguise.bind(this)}>Store disguise on blockchain</button></td>
            </tr>
            <tr>
              <td><button className="btn btn-lg btn-secondary mb-5" onClick={this.getDisguise.bind(this)}>Retrieve disguise from blockchain</button></td>
            </tr>
          </table>
        </div>
        {this.state.loading ?
          <div className="spinner">	{/* if loading is true, waiting for random response */}
            <BounceLoader
              color={'#6c757d'}
              loading={this.state.loading}
            />
          </div>:	// else no more waiting, random response is returned
          <div className="avatar">
            <Avatar
              style={{width: '400px', height: '400px'}}
              avatarStyle='Circle'
              topType={topType}
              hatColor={hatColor}
              accessoriesType={accessoriesType}
              hairColor={hairColor}
              facialHairType={facialHairType}
              facialHairColor={facialHairColor}
              clotheType={clotheType}
              clotheColor={clotheColor}
              eyeType={eyeType}
              eyebrowType={eyebrowType}
              mouthType={mouthType}
              skinColor={skinColor}
            />
          </div>
        }
        {<OptionTable 
          topType={topType}
          hatColor={hatColor}
          accessoriesType={accessoriesType}
          hairColor={hairColor}
          facialHairType={facialHairType}
          facialHairColor={facialHairColor}
          clotheType={clotheType}
          clotheColor={clotheColor}
          eyeType={eyeType}
          eyebrowType={eyebrowType}
          mouthType={mouthType}
          skinColor={skinColor}
        />}
      </div>
    );
  }

  async setRandomDisguise() {
    /** 
     * @notice generate pseudo random values of uint32; use it to retrieve random disguise options
     * @dev based on npm package
     * @dev not truly random but good enough for demo purposes
    */
    var getRandomValues = require("get-random-values");	// import JS random generator from npm
    var array = new Uint32Array(1);
    getRandomValues(array);           // fill array with random numbers
    let randomBigNumber = array[0]; 	// use 1st random number in the array
    this.setState({
        loading: true,
        randomBigNumber: randomBigNumber	// for use directly by getData()
    }
    ,() => {
      this.getData();                     // retrieve random disguise options
    });
  }

  async getData() {
    /**
     * @notice set the disguise options based on random number
     */
    let randomBigNumber = this.state.randomBigNumber;	// read random number set in state by setRandomDisguise()
    console.log("getData randomBigNumber", randomBigNumber);
    this.setState({   //random number --> position of the option in the array of options
      topType: this.options.topType[randomBigNumber % Object.values(this.options.topType).length],
      hatColor: this.options.hatColor[randomBigNumber % Object.values(this.options.hatColor).length],
      accessoriesType: this.options.accessoriesType[randomBigNumber % Object.values(this.options.accessoriesType).length],
      hairColor: this.options.hairColor[randomBigNumber % Object.values(this.options.hairColor).length],
      facialHairType: this.options.facialHairType[randomBigNumber % Object.values(this.options.facialHairType).length],
      facialHairColor: this.options.facialHairColor[randomBigNumber % Object.values(this.options.facialHairColor).length],
      clotheType: this.options.clotheType[randomBigNumber % Object.values(this.options.clotheType).length],
      clotheColor: this.options.clotheColor[randomBigNumber % Object.values(this.options.clotheColor).length],
      eyeType: this.options.eyeType[randomBigNumber % Object.values(this.options.eyeType).length],
      eyebrowType: this.options.eyebrowType[randomBigNumber % Object.values(this.options.eyebrowType).length],
      mouthType: this.options.mouthType[randomBigNumber % Object.values(this.options.mouthType).length],
      skinColor: this.options.skinColor[randomBigNumber % Object.values(this.options.skinColor).length],
      loading: false
    }
    ,() => {
      console.log("topType:", this.state.topType, ", hatColor:", this.state.hatColor, ", accessoriesType:", this.state.accessoriesType);
      console.log("hairColor:", this.state.hairColor, ", facialHairType:", this.state.facialHairType, ", clotheType:", this.state.clotheType);
      console.log("clotheColor:", this.state.clotheColor, ", eyeType:", this.state.eyeType, ", eyebrowType:", this.state.eyebrowType);
      console.log("mouthType:", this.state.mouthType, ", skinColor:", this.state.skinColor);
    });    
  }
}

export default App;
