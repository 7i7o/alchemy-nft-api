// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";

// import dotenv
import { config } from "dotenv";
config({ path: process.ENV });

const alchemyKey = process.env.ALCHEMY_KEY;

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: alchemyKey, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Print owner's wallet address:
const ownerAddr = "0x7i7o.eth";
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

// Print total NFT count returned in the response:
const nftsForOwner = await alchemy.nft.getNftsForOwner("0x7i7o.eth");
console.log("number of NFTs found:", nftsForOwner.totalCount);
console.log("...");

let nftContractAddress = "";
let nftId = ""; 

// Print contract address and tokenId for each NFT:
for (const nft of nftsForOwner.ownedNfts) {
  console.log("===");
  console.log("contract address:", nft.contract.address);
  console.log("token ID:", nft.tokenId);
  if (nft.contract.address === "0xec800e57d8b258d69ccabb0d807da98c89e6c76a") {
      nftContractAddress = nft.contract.address;
      nftId = nft.tokenId;
  }
}
console.log("===");


// Fetch metadata for a particular NFT:
console.log("fetching metadata for the first NFT of the list...");
const response = await alchemy.nft.getNftMetadata(
  nftContractAddress,
  nftId
);

// Uncomment this line to see the full api response:
// console.log(response);

// Print some commonly used fields:
console.log("NFT name: ", response.title);
console.log("token type: ", response.tokenType);
console.log("tokenUri: ", response.tokenUri.gateway);
console.log("image url: ", response.rawMetadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("===");
