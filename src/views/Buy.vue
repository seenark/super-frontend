<script setup lang="ts">
import { ExchangeAddress, TokenAddress } from "@/constants";
import { getAccount } from "@/services/ethers";
import { SuperToken } from "@/typechain";
import { Exchange } from "@/typechain/Exchange";
import { ethers } from "ethers";
import { onMounted, ref } from "vue";
import exchangeAbi from "../artifacts/contracts/Exchange.sol/Exchange.json";
import tokenAbi from "../artifacts/contracts/SuperToken.sol/SuperToken.json";

const buyTokenId = ref("");
const cExchange = ref<Exchange>();
const cToken = ref<SuperToken>();
// const ExchangeAddress = "0xFfBcF4531e753F64Bf2EED4DCA7534346fc5a53c";
// const NFTAddress = "0xFE303849b63E159A8Ff81Ab4F208060a2428Fb46";
// const TokenAddress = "0x73D7e8323DF278CDEe2f1DB3705911caA0Fb0AAf"
function approveToken() {
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

  const tokenContract = new ethers.Contract(
    TokenAddress,
    tokenAbi.abi,
    signer
  ) as SuperToken;
  cToken.value = tokenContract;

  cToken.value.approve(cExchange.value.address, 1 * 1e8);
}

function buy() {
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

  connectedContract.buy(buyTokenId.value);
}

onMounted(async () => {
  const account = await getAccount();
  console.log("🚀 ~ file: Buy.vue ~ line 63 ~ onMounted ~ account", account);
});
</script>

<template>
Connect Smart Contract to Target Wallet
  <div style="display: flex; flex-direction: column">
    <button @click="approveToken">approve</button>
    <hr>
    <div>
      <label for="">Buy TokenId</label>
      <input v-model="buyTokenId" type="text" />
    </div>
    <button @click="buy">Buy</button>
  </div>
</template>
