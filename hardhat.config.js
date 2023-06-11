require("@nomicfoundation/hardhat-toolbox");


//require("@nomiclabs/hardhat-ethers")
require('dotenv').config()

 const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/1qfp2qa8YuTMPf-qF3pdbDpPcSSFAI0Y"
 const PRIVATE_KEY = process.env.PRIVATE_KEY || "14f8a3be303d3f8bac65feb1d92d62ce4ffe0ab0faec3fecf61a380900d95d21"
 

 module.exports = {
     defaultNetwork: "sepolia",
     networks: {
         hardhat: {
             // // If you want to do some forking, uncomment this
             // forking: {
             //   url: MAINNET_RPC_URL
             // }
         },
         localhost: {
         },
         sepolia: {
             url: SEPOLIA_RPC_URL,
             accounts: [PRIVATE_KEY],
             saveDeployments: true,
         },
     },

  solidity: "0.8.7",
};