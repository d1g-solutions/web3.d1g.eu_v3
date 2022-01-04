//20220104
//  - switch/add wallet
//  - add token
import "./styles.css";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import web3 from "web3";
//import simpleContractAbi from "../abi/ERC20_minimumABI.json";
import NFT_ERC731 from "/src/abi/NFT_ERC731.json";

const { mnemonic, BSCSCANAPIKEY } = require("./env.json");

//const tokenAddress = "0xb1de7905763d916b464cb8873753bf2fdebc4d50";
export const NFT_ERC731ContractAddress =
  "0xb1de7905763d916b464cb8873753bf2fdebc4d50";

function App() {
  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("");
  const [token, setToken] = useState("");
  const [tokenid, setTokenid] = useState("");
  let nft;
  let w3 = new web3(window.ethereum);

  //Created check function to see if the MetaMask extension is installed
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    if (Boolean(ethereum && ethereum.isMetaMask)) {
      alert("metamask installed");
      w3 = new web3(window.ethereum);
      window.web3 = w3;
      console.log(Object.keys(w3.eth));
    } else {
      alert("please install metamask");
    }
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      const { ethereum } = window;
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);

      console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async () => {
    try {
      const tokenAddress = "0xf6c034242d0caa628c361a6660cd72c8e419ac62";
      const tokenSymbol = "D1G";
      const tokenDecimals = 18;
      const tokenImage =
        "https://ipfs.io/ipfs/QmZ7ZNpQaqdsZP3R63r3hP9bbtSMMevGQWZ1WCaR5q2BsJ";

      try {
        /*
      const data = [{
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency:
              {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18
              },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com/'],
      }]
      */
        const data = [
          {
            chainId: "0x61",
            chainName: "BSC - Testnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            blockExplorerUrls: ["https://testnet.bscscan.com/"]
          }
        ];

        const tx = await ethereum
          .request({ method: "wallet_addEthereumChain", params: data })
          .catch();
        if (tx) {
          console.log(tx);
        }

        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage // A string url of the token logo
            }
          }
        });

        if (wasAdded) {
          console.log("Thanks for your interest!");
        } else {
          console.log("Your loss!");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMeSome = () => {
    try {
      //var w=w3.eth.accounts.wallet.add(acc[0]);

      //w3.eth.defaultAccount = acc[0];
      //w3.eth.Contract.defaultAccount = acc[0];
      let nft = new w3.eth.Contract(NFT_ERC731, NFT_ERC731ContractAddress);
      //nft.defaultAccount = acc[0];
      //nft.owner = acc[0];

      //var w=w3.eth.accounts.wallet.add(acc[0]);

      console.log(nft);
      setToken("token");
      var v = nft.methods
        .owner()
        .call()
        .then((v) => setOwner(v));
      v = nft.methods
        .name()
        .call()
        .then((v) => setToken(v));
      var accto = "0x3beb7d0c0f6e524f34d6f2f24174780434414813";
      const data = nft.methods
        .safeMint(
          accto,
          "https://ipfs.featured.market/ipfs/QmXmhCnfHdHHNPixVAgahLweVFUSB4bTDtJmm4oCUw3Lwy"
        )
        .send({ from: account })
        .then(console.log);

      //await provider.waitForTransaction(data.hash);
      nft.waitForTransaction(data.hash).send().then(console.log);
      // const receipt = w3.eth.provider.getTransactionReceipt(data.hash)
      //  .then(console.log);
      //console.log(Web3.utils.hexToNumber(receipt.logs[0].topics[3]));
      //console.log(owner);
      //setOwner('name');
      //alert(owner);
      /*
    w3.eth
      .sendTransaction({
        // this could be provider.addresses[0] if it exists
        from: account,
        to: "0x410B407B85452fBB24950c8aEa2e923de3F1cB18",
        value: "100000000000000000",
        gasPrice: "0x09184e72a000",
        gas: "0x2710"
      })
      .then(console.log)
      .catch((error) => console.log("error", error));
      */
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div id="container">
        <div id="info" onClick={onClickConnect}>
          Info
        </div>
        <div id="content">
          <h3>Clip-path title</h3>
          <p>Content of the clip-path information</p>
        </div>
      </div>
      <h1>web3.D1G.eu</h1>
      <Box my={5}>
        <p>click on this to check your metamask extension</p>
        <Button variant="contained" onClick={isMetaMaskInstalled}>
          Check metamask
        </Button>
      </Box>
      <Box mt={5}>
        <p>click on this to get wallet address</p>
        <Button variant="contained" color="secondary" onClick={onClickConnect}>
          Open Metamask ui
        </Button>
      </Box>
      {account && (
        <Box>
          <p>account address : {account}</p>
        </Box>
      )}
      <Box my={5}>
        <p>Enter you address to receive some assets</p>
        <p>
          <input
            type="text"
            name="toadd"
            defaultValue="0x3beb7d0c0f6e524f34d6f2f24174780434414813"
          />
        </p>

        <Button variant="contained" color="primary" onClick={sendMeSome}>
          send me some
        </Button>
        {owner && (
          <Box>
            <p>
              Token: {token}
              Contract {owner}
              Token ID: {tokenid}
            </p>
          </Box>
        )}
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={getBalance}>
          g=Get balance and log
        </Button>
      </Box>
    </div>
  );
}

export default App;
