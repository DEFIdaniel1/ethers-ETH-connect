const { ethers } = require('ethers')
require('dotenv').config()
const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_GOERLI_URL

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL)
const account1 = process.env.ACCOUNT_ADDRESS_1
const account1PrivateKey = process.env.ACCOUNT_PRIVATE_KEY_1
const account2 = process.env.ACCOUNT_ADDRESS_2

const wallet = new ethers.Wallet(account1PrivateKey, provider) // create a wallet (just like metamask) to interact with blockchain

const writeTransaction = async () => {
    console.log('Starting "Send Ether" transaction...')
    // Account balances before transfer
    const senderBalanceBefore = await provider.getBalance(account1)
    const receiverBalanceBefore = await provider.getBalance(account2)

    // Send Ether
    const sendTx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther('0.1'),
    })

    //Wait for tx to be mined
    await sendTx.wait()
    console.log(sendTx)

    // Account balances after transfer
    const senderBalanceAfter = await provider.getBalance(account1)
    const receiverBalanceAfter = await provider.getBalance(account2)

    console.log(
        `\n Sender balance before: ${ethers.utils.formatEther(
            senderBalanceBefore
        )} \n Sender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
    )
    console.log(
        `\n Receiver balance before: ${ethers.utils.formatEther(
            receiverBalanceBefore
        )} \n Receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}\n`
    )
}
writeTransaction()
