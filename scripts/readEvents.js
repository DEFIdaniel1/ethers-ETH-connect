const { ethers } = require('ethers')
require('dotenv').config()

const ALCHEMY_ETH_URL = process.env.ALCHEMY_ETH_URL
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_ETH_URL)

// Step 1: Connect to contract
const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const daiABI = require('../contractABI/dai.json')
const ERC20ABI = ['event Transfer(address indexed from, address indexed to, uint amount)'] //method 2
const daiContract = new ethers.Contract(daiAddress, daiABI, provider)

const readEvents = async () => {
    // Step 2: add event to watch
    //      Should add block parameters for big contracts like DAI or will get any event EVER emitted
    //      queryFilter(eventName, fromBlock, toBlock)
    const currentBlock = await provider.getBlockNumber()
    const transferEvents = await daiContract.queryFilter(
        'Transfer',
        currentBlock - 5, // from 5 blocks prior
        currentBlock
    )
    console.log(transferEvents)
}

readEvents()
