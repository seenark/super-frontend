import tokenAbi from '../artifacts/contracts/SuperToken.sol/SuperToken.json'
import { SuperToken } from './../typechain/SuperToken.d';
import { ethers } from 'ethers'
import { getAccount } from './ethers';


const TokenAddress = "0x73D7e8323DF278CDEe2f1DB3705911caA0Fb0AAf"

export async function getTokenContract(): Promise<SuperToken | null> {
    const signer = getAccount()
    if (!signer) return null
    const connectedContract = new ethers.Contract(
      TokenAddress,
      tokenAbi.abi,
      signer
    ) as SuperToken
    return connectedContract
}