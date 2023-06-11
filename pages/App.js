import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

function App() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getTokensData();
  }, []);

  const getTokensData = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = '0x2A1750561de46E284eC43C917379e516C4b64c06';
      const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            }
          ],
          "name": "getLatestPrice",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            }
          ],
          "name": "storeLatestPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "tokens",
          "outputs": [
            {
              "internalType": "contract AggregatorV3Interface",
              "name": "priceFeed",
              "type": "address"
            },
            {
              "internalType": "int256",
              "name": "storedPrice",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contract = new web3.eth.Contract(abi, contractAddress);
      const tokensList = ["ETH/USD", "BTC/USD", "LINK/USD"]; // List of token symbols
      const tokensData = await Promise.all(
        tokensList.map(async (tokenSymbol) => {
          const tokenData = await contract.methods.tokens(tokenSymbol).call();
          const storedPrice = BigInt(tokenData.storedPrice);
          const price = storedPrice / BigInt(100000000); // BigInt division
          return { symbol: tokenSymbol, price: Number(price) }; // Convert to number
        })
      );
      setTokens(tokensData);
      console.log("tokensData: ", tokensData);
    } catch (error) {
      console.log("getTokensData Error: ", error);
    }
  };

  const updatePrice = async (tokenSymbol) => {
    try {
      const web3 = new Web3(window.ethereum);
      const contractAddress = '0x2A1750561de46E284eC43C917379e516C4b64c06';
      const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            }
          ],
          "name": "getLatestPrice",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            }
          ],
          "name": "storeLatestPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "tokens",
          "outputs": [
            {
              "internalType": "contract AggregatorV3Interface",
              "name": "priceFeed",
              "type": "address"
            },
            {
              "internalType": "int256",
              "name": "storedPrice",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const contract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const transaction = contract.methods.storeLatestPrice(tokenSymbol).send({ from: account });
      await transaction;
      await getTokensData();
    } catch (error) {
      console.log("updatePrice Error: ", error);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#87CEFA' }}>
      <header>
        <h1>Crypto Monitor</h1>
      </header>
      <div className="row mt-5">
        {tokens.map((token, index) => (
          <div className="col" key={index}>
            <div className="card text-center">
              <div className="card-header">
                <h3>{token.symbol}</h3>
              </div>
              <div className="card-body">
                <p className="card-text">Stored Price: {token.price}</p>
                <button type="submit" className="btn btn-dark" onClick={() => updatePrice(token.symbol)}>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer mt-auto py-3">
        <p className="text-center">Designed by Stanley Okafor for Chainlink Spring 2023 Hackathon</p>
      </footer>
    </div>
  );
}

export default App;
