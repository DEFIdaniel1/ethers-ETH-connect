const { ethers } = require('ethers')
require('dotenv').config()
const ALCHEMY_ETH_URL = process.env.ALCHEMY_ETH_URL

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_ETH_URL)

const readBlock = async () => {
    const latestBlock = await provider.getBlockNumber()
    console.log(`\n Latest Block: ${latestBlock} \n`)

    const blockInfo = await provider.getBlock(latestBlock)
    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(latestBlock)
    console.log('-----------------reading transactions--------------------')
    console.log(transactions[0])
}

readBlock()
