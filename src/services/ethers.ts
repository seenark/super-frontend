import { ethers } from 'ethers'

export function getProvider(): ethers.providers.Web3Provider | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any
    if (!ethereum) return null
    const provider = new ethers.providers.Web3Provider(ethereum);
    return provider
}

export function getAccount(): ethers.providers.JsonRpcSigner | null {
    const Provider = getProvider()
    if (!Provider) return null
    return Provider.getSigner()
}