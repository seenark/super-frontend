<script setup lang="ts">
import { ExchangeAddress, NFTAddress } from "@/constants";
import { Exchange, SuperNFT } from "@/typechain";
import { ethers } from "ethers";
import { ref } from "vue";
import exchangeAbi from "../artifacts/contracts/Exchange.sol/Exchange.json";
import nftAbi from "../artifacts/contracts/SuperNFT.sol/SuperNFT.json";

const cExchange = ref<Exchange>();
const cNFT = ref<SuperNFT>();
// const account = ref<ethers.providers.JsonRpcSigner>();
// const ExchangeAddress = "0xFfBcF4531e753F64Bf2EED4DCA7534346fc5a53c";
// const NFTAddress = "0xFE303849b63E159A8Ff81Ab4F208060a2428Fb46";
async function approveToExchange() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;
  if (!ethereum) return;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // account.value = signer
  const connectedContract = new ethers.Contract(
    ExchangeAddress,
    exchangeAbi.abi,
    signer
  ) as Exchange;
  cExchange.value = connectedContract;
  console.log(cExchange.value.address);

   const nftContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    cNFT.value = nftContract
    console.log('nft c', cNFT.value.address)

    cNFT.value.setApprovalForAll(cExchange.value.address, true)
}

const tokenIdToBeSell = ref("")
function sell() {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ethereum } = window as any;
  if (!ethereum) return;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  // account.value = signer
  const connectedContract = new ethers.Contract(
    ExchangeAddress,
    exchangeAbi.abi,
    signer
  ) as Exchange;
  cExchange.value = connectedContract;
  console.log(cExchange.value.address);

   const nftContract = new ethers.Contract(
      NFTAddress,
      nftAbi.abi,
      signer
    ) as SuperNFT;
    cNFT.value = nftContract
    console.log('nft c', cNFT.value.address)

    cExchange.value.sell(tokenIdToBeSell.value, 1 * 1e8)
}

</script>

<template>
  asdfasfs
  <div style="display: flex; flex-direction: column" class="about">
    <button @click="approveToExchange">Approve</button>
    
    <div><label for="">token id to be sell</label><input v-model="tokenIdToBeSell" type="text"></div>
    <button @click="sell">Sell</button>
  </div>
</template>
