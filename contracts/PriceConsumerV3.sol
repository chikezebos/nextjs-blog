// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    struct Token {
        AggregatorV3Interface priceFeed;
        int256 storedPrice;
    }

    mapping(string => Token) public tokens;

    constructor() {
        // ETH/USD
        tokens["ETH/USD"] = Token(
            AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306),
            0
        );

        // BTC/USD
        tokens["BTC/USD"] = Token(
            AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43),
            0
        );

        // LINK/USD
        tokens["LINK/USD"] = Token(
            AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF),
            0
        );

        // Add more tokens as needed
    }

    function getLatestPrice(string memory tokenSymbol) public view returns (int256) {
        AggregatorV3Interface priceFeed = tokens[tokenSymbol].priceFeed;
        (
            /*uint80 roundID*/,
            int256 price,
            /*uint256 startedAt*/,
            /*uint256 timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    function storeLatestPrice(string memory tokenSymbol) external {
        int256 latestPrice = getLatestPrice(tokenSymbol);
        tokens[tokenSymbol].storedPrice = latestPrice;
    }
}
