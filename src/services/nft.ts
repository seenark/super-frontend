import { SuperNFT } from "./../typechain/SuperNFT.d";
import { ethers } from "ethers";
import nftAbi from "../artifacts/contracts/SuperNFT.sol/SuperNFT.json";
import { getAccount } from "./ethers";
import { NFTAddress } from "@/constants";

export async function getNFTContract(): Promise<SuperNFT | null> {
  const signer = getAccount();
  if (!signer) return null;
  const connectedContract = new ethers.Contract(
    NFTAddress,
    nftAbi.abi,
    signer
  ) as SuperNFT;
  return connectedContract;
}
// https://gateway.pinata.cloud/ipfs/QmSzAAtur3bYAyzLskXyjokXTBbVYSRLebiBTEYFEVWch4
export async function createNFT(tokenUri: string): Promise<void> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    if (!ethereum) return;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    console.log("🚀 ~ file: nft.ts ~ line 26 ~ createNFT ~ signer", await signer.getAddress())
    const connectedContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    console.log('address', connectedContract.address)
    const tx = await connectedContract.createNFT(
      `https://gateway.pinata.cloud/ipfs/${tokenUri}`
    );
    await tx.wait();
    console.log("create nft hash: ", tx.hash);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllNFT(tokenId: string): Promise<string | null> {
  console.log("call");
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    if (!ethereum) return null;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    const nft = await connectedContract.tokenURI(tokenId);
    console.log(nft);
    return nft;
  } catch (error) {
    console.log(error);
    return null;
  }
}
