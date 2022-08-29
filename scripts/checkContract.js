const { ethers } = require('ethers')
require('dotenv').config()
const ALCHEMY_ETH_API = process.env.ALCHEMY_ETH_API

const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ETH_API}`
)

const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
// 2 methods to get the contract ABI - one is to copy/paste it from etherscan and import
const daiABI = require('../contractABI/dai.json')
// Or, ethers knows ERC20 contracts have the same interfaces/functions. So can just the ones you want/need as an ARRAY
const ERC20_ABI = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)',
]

// ethers.Contract(contractAddress, abi, signerOrProvider)
const daiContract = new ethers.Contract(daiAddress, ERC20_ABI, provider)

const checkContract = async () => {
    const name = await daiContract.name()
    const symbol = await daiContract.symbol()
    const totalSupply = await daiContract.totalSupply()
    const balanceOf = await daiContract.balanceOf('0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8')

    console.log(`\nReading Contract: ${name}`)
    console.log(`Token Symbol: ${symbol}`)
    console.log(`Total Token Supply: ${ethers.utils.formatUnits(totalSupply, 18)}`) //18 decimals need to be added
    console.log(`Token Balance of Selected Address: ${balanceOf.toString()}\n`)
}
checkContract()
