const { ethers } = require('ethers')
require('dotenv').config()

const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_GOERLI_URL
const ACCOUNT_ADDRESS_1 = process.env.ACCOUNT_ADDRESS_1
const PRIVATE_KEY_1 = process.env.ACCOUNT_PRIVATE_KEY_1
const ACCOUNT_ADDRESS_2 = process.env.ACCOUNT_ADDRESS_2

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL)
const wallet = new ethers.Wallet(PRIVATE_KEY_1, provider)

// Step 1: Create the contract
const linkContractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const ERC20ABI = [
    // add the needed functions
    'function balanceOf(address) view returns (uint)',
    'function transfer(address to, uint amount) returns (bool)',
]
const linkContract = new ethers.Contract(linkContractAddress, ERC20ABI, provider)

const writeToContract = async () => {
    console.log('Initializing ERC20 transfer...')
    const account1LinkBalanceBefore = await linkContract.balanceOf(ACCOUNT_ADDRESS_1)
    const account2LinkBalanceBefore = await linkContract.balanceOf(ACCOUNT_ADDRESS_2)

    // Step 2: need to connect wallet to the contract
    const connectedContract = await linkContract.connect(wallet)

    // Step 3: call a contract function with the connected wallet
    const sendTx = await connectedContract.transfer(
        ACCOUNT_ADDRESS_2,
        ethers.utils.parseUnits('1', 18) // could also use parseEther - 18 is decimals
        // To SEND ALL, can write 'balance'
    )
    await sendTx.wait()
    console.log(sendTx)

    const account1LinkBalanceAfter = await linkContract.balanceOf(ACCOUNT_ADDRESS_1)
    const account2LinkBalanceAfter = await linkContract.balanceOf(ACCOUNT_ADDRESS_2)

    console.log(
        `\n Sender balance before: ${ethers.utils.formatEther(
            account1LinkBalanceBefore
        )} \n Sender balance after: ${ethers.utils.formatEther(account1LinkBalanceAfter)}`
    )
    console.log(
        `\n Receiver balance before: ${ethers.utils.formatEther(
            account2LinkBalanceBefore
        )} \n Receiver balance after: ${ethers.utils.formatEther(account2LinkBalanceAfter)}\n`
    )
}
writeToContract()
