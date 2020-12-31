// class App.js v2.0 of Dec 29,2020
import React, { Component } from 'react';	// from node.js module
import Avatar from 'avataaars'; 	        // from node.js module
import { BounceLoader } from 'react-spinners'; 	// from node.js module
import getWeb3 from "./getWeb3";          // to call web3 API
import Pepito from "./contracts_abi/Pepito.json";                 // to call web3 API
import PepitoDisguise from "./contracts_abi/PepitoDisguise.json"; // to call web3 API 
import './App.css';                                 // specific
import OptionTable from './OptionTable'; 	          // specific
//import { setRandomDisguise } from './helpers';    // specific - to be tested

/**
 * @author Vu Tien Khang - December 2020
 * @notice React root component for Pepito frontend
 * @dev disguise random options - done
 * @dev web3 calls - work in progress
 * @dev creating Pepito and PepitoDisguise - done
 * @dev calling functions in PepitoDisguise - to be done
 */
class App extends Component {

  constructor() {
    super()           // run super to create 'Component' before running the constructor of App, the derived class 
    this.state = {};	// state holds variables of the component App
    this.options = {	// disguise options
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
    this.state.loading = false;                                 // for use in future testnet
    this.state.web3Connect = false;
  }

  state = { web3: null, accounts: null, pepitoContract: null, ownerPepito: null };          // to call web3 API

  componentDidMount = async () => {	//React hook that runs after the first render() lifecycle
    /** @notice placeholder  */
    this.setRandomDisguise();                                   // sync. set random set of disguise options
    this.makePepito();                                          // async. connect to blockchain, create instance of Pepito
    this.tryIt();
  };

  tryIt = () => {
    /**
    * @notice try using helper functions when using 'this' and props
    */
    this.myWord = ', please!';
  }

  makePepito = async () => {
    /**
    * @notice connect web3 API and create Pepito contract
    * @dev this way to define makePepito as property of App is typical of React, to bind 'this'
    */
    try {
      /// @dev access to blockchain via Metamask
      /// @dev get network provider and web3 instance by trying several channels 
      const web3 = await getWeb3();
      //console.log("web3", web3);
      /// @dev ***** TODO: check error when getWeb3 returns, in case Matamask not connected
      /// @dev use web3 to get the account of the user
      const accounts = await web3.eth.getAccounts();
      console.log("0.user account", accounts);

      /// @dev create a Pepito singleton contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Pepito.networks[networkId];
      const pepitoInstance = new web3.eth.Contract(
        Pepito.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const ownerPepito = await pepitoInstance.methods.owner().call();
      var web3Connect = true;

      /// @dev set web3, accounts, and pepitoContract of the state variable
      this.setState({ web3, accounts, pepitoContract: pepitoInstance, pepitoAddress: deployedNetwork.address, web3Connect, ownerPepito } 
        ,() => {
          console.log("1.user account", accounts,
          ".\n 1.makePepito().Pepito contract", pepitoInstance,
          ".\n  1.Pepito contract address", this.state.pepitoAddress,
          ".\n   1.web3Connect", web3Connect,
          ".\n    1.'owner' variable in Pepito", ownerPepito);
        });
    } catch (error) {
      /// @dev catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or to create pepitoContract. Check console for details.`,
      );
      console.error(error);
    }
  }

  /** @notice section copied from truffle react, to be ignored
  runExample = async () => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    await contract.methods.set(500).send({ from: accounts[0] });
    // Update state with the result.
    this.setState({ storageValue: response });
  };
  */ 

  storeDisguise = async () => {
    /** 
    * @notice create a PepitoDisguise and store the options of this disguise
    * @dev WIP - to be refined and tested
    * @dev this way to define storeDisguise as property of App is typical of React, to bind 'this'
    */
    const { accounts, pepitoContract, web3Connect, ownerPepito } = this.state;
    console.log("storeDisguise, user account", accounts,
      ".\n 2.storeDisguise, Pepito contract", pepitoContract,
      ".\n  2.storeDisguise, web3Connect", web3Connect,
      ".\n   2.storeDisguise, 'owner' variable in Pepito", ownerPepito);

    if(web3Connect){
      const pepitoDisguise = await pepitoContract.methods.createPepitoDisguise();
      /// @dev bug to be changed: pepitoDisguise is currently a transaction object, not an address
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
    } else alert("Please reload page first, to get connected to local blockchain");
  }

  getNetDisguise = async () => {
    /** 
    * @notice retrieve a PepitoDisguise from blockchain network and display it
    * @dev to be done
    */
  }

  render() {
    /// @dev retrieve pepito disguise options from this.state
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
          <h1 className="m-5">Pepito Disguises <sup>on blockchain</sup></h1>
        </header>
        <div>
          <p></p>
          <table>
            <tbody>
              <tr>
                <th rowSpan="3"><img src="./machupicchu_logo.png" alt="Machu-Picchu" width="120" height="120" /></th>
                <td><button className="btn btn-lg btn-secondary mb-5" 
                  onClick={this.setRandomDisguise}>Generate random disguise{this.myWord}</button></td>
              </tr>
              <tr>
                <td><button className="btn btn-lg btn-secondary mb-5" 
                onClick={this.storeDisguise}>Store disguise on blockchain (WIP - Reload page if crash)
                </button></td>
              </tr>
              <tr>
                <td><button className="btn btn-lg btn-secondary mb-5 disabled" 
                onClick={this.getNetDisguise.bind(this)}>Retrieve disguise from blockchain network: INACTIVE - WIP -
                </button></td>
              </tr>
              <tr>
              <td colSpan="2">Pepito Address...-->{this.state.pepitoAddress}</td>
              </tr>
                  <tr>
                <td colSpan="2"><a href='https://ibisa.users.earthengine.app/view/mcgyver3' target='_blank'
                   className='btn btn-lg btn-secondary mb-5'>Earth Observation Easter Egg</a>
                </td>
              </tr>
            </tbody>
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

  setRandomDisguise = () => {
    /** 
     * @notice set the disguise options based on random number
     * @dev generate pseudo random values of uint32, to retrieve random disguise options
     * @dev not truly random but good enough for demo purposes
     * @dev this way to define setRandomDisguise as property of App is typical of React, to bind 'this'
    */
    var getRandomValues = require("../node_modules/get-random-values");	/// @dev import JS random generator from npm
    var array = new Uint32Array(1);
    getRandomValues(array);           /// @dev fill array with random numbers
    let randomBigNumber = array[0]; 	/// @dev use 1st random number in the array
    /** @dev these idx... variables are the indexes of disguise options that will be stored on-chain */
    var idxTopType = randomBigNumber % Object.values(this.options.topType).length;
    var idxHatColor = randomBigNumber % Object.values(this.options.hatColor).length;
    var idxAccessoriesType = randomBigNumber % Object.values(this.options.accessoriesType).length;
    var idxHairColor = randomBigNumber % Object.values(this.options.hairColor).length;
    var idxFacialHairType = randomBigNumber % Object.values(this.options.facialHairType).length;
    var idxfacialHairColor = randomBigNumber % Object.values(this.options.facialHairColor).length;
    var idxClotheType = randomBigNumber % Object.values(this.options.clotheType).length;
    var idxClotheColor = randomBigNumber % Object.values(this.options.clotheColor).length;
    var idxEyeType = randomBigNumber % Object.values(this.options.eyeType).length;
    var idxEyebrowType = randomBigNumber % Object.values(this.options.eyebrowType).length;
    var idxMouthType = randomBigNumber % Object.values(this.options.mouthType).length;
    var idxSkinColor = randomBigNumber % Object.values(this.options.skinColor).length;

    this.setState({
        randomBigNumber: randomBigNumber,	/// @dev random number for use directly by getData()
        idxTopType: idxTopType,
        topType: this.options.topType[idxTopType],
        idxHatColor: idxHatColor,
        hatColor: this.options.hatColor[idxHatColor],
        idxAccessoriesType: idxAccessoriesType,
        accessoriesType: this.options.accessoriesType[idxAccessoriesType],
        idxHairColor: idxHairColor,
        hairColor: this.options.hairColor[idxHairColor],
        idxFacialHairType: idxFacialHairType,
        facialHairType: this.options.facialHairType[idxFacialHairType],
        idxfacialHairColor: idxfacialHairColor,
        facialHairColor: this.options.facialHairColor[idxfacialHairColor],
        idxClotheType: idxClotheType,
        clotheType: this.options.clotheType[idxClotheType],
        idxClotheColor:idxClotheColor,
        clotheColor: this.options.clotheColor[idxClotheColor],
        idxEyeType: idxEyeType,
        eyeType: this.options.eyeType[idxEyeType],
        idxEyebrowType: idxEyebrowType,
        eyebrowType: this.options.eyebrowType[idxEyebrowType],
        idxMouthType: idxMouthType,
        mouthType: this.options.mouthType[idxMouthType],
        idxSkinColor: idxSkinColor,
        skinColor: this.options.skinColor[idxSkinColor],
    }
    ,() => {
        console.log("setRandomDisguise randomBigNumber", randomBigNumber);
        console.log("topType:", this.state.topType, ", hatColor:", this.state.hatColor, ", accessoriesType:", this.state.accessoriesType);
        console.log("hairColor:", this.state.hairColor, ", facialHairType:", this.state.facialHairType, ", clotheType:", this.state.clotheType);
        console.log("clotheColor:", this.state.clotheColor, ", eyeType:", this.state.eyeType, ", eyebrowType:", this.state.eyebrowType);
        console.log("mouthType:", this.state.mouthType, ", skinColor:", this.state.skinColor);
    });
  }
}

export default App;

