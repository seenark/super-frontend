import { Exchange } from './../typechain/Exchange.d';
import { ethers } from 'ethers'
import exchangeAbi from '../artifacts/contracts/Exchange.sol/Exchange.json'
import { getAccount } from './ethers';
const ExchangeAddress = "0xFfBcF4531e753F64Bf2EED4DCA7534346fc5a53c"



export async function getExchangeContract():Promise<Exchange | null> {
    const signer = getAccount()
    if (!signer) return null
    const connectedContract = new ethers.Contract(
      ExchangeAddress,
      exchangeAbi.abi,
      signer
    ) as Exchange
    return connectedContract
}