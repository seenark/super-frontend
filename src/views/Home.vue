<script setup lang="ts">
import { ref } from "vue";
import { connectMetamaskWallet } from "../Web3/web3";
import { uploadFile } from "../services/pinata";
import { createNFT, fetchAllNFT } from "../services/nft";

const file = ref<File>();

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) {
    return;
  }
  file.value = files[0];
}

async function upload() {
  if (!file.value) return;
  const data = await uploadFile(file.value);
  await createNFT(data.IpfsHash);
}

const imgs = ref<string[]>([]);
const tokenIdSelect = ref("");
async function showNFT() {
  const url = await fetchAllNFT(tokenIdSelect.value);
  if (url) imgs.value.push(url);
}
</script>

<template>
  <div>
    <div>
      <button @click="connectMetamaskWallet">Connect Wallet</button>
    </div>
    <hr />
    <div>
      <input type="file" name="" id="" @change="onFileChange($event)" />
      <button @click="upload">Create NFT</button>
    </div>
    <hr>
    <div>
      <input v-model="tokenIdSelect" type="text" />
      <button @click="showNFT">Show NFT</button>
    </div>

    <img v-for="(img, index) in imgs" :key="index" :src="img" alt="" />
  </div>
</template>

<style lang="scss" scoped></style>
