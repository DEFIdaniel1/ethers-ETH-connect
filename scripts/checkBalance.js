const { ethers } = require('ethers')
require('dotenv').config()

const ALCHEMY_ETH_API = process.env.ALCHEMY_ETH_API
const bigAddress = '0x1AaddcF6749E6a56b1C704cD30221dF00a08659C'

const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ETH_API}`
)

const getBalance = async () => {
    const balance = await provider.getBalance(bigAddress)
    console.log(`ETH Balance of ${bigAddress} is ${ethers.utils.formatEther(balance)} ETH.`)
}
getBalance()
