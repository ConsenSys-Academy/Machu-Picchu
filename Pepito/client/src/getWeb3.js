/**
 * @author ConsenSys TruffleBox
 * @notice function getWeb3, copied from TruffleBox "react"
 * @dev without the window.eventListener "load" 
 *      that was necessary in Trufflebox because getWeb3 was called in componentDidMount
 */
import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access authorization by user 
          /*await*/ window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
  });

export default getWeb3;
