const { ethers } = require('ethers')
require('dotenv').config()
const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_GOERLI_URL

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL)
const account1 = '0xD1D09E08d992Ada366A528c08af5576AC61d1941'
const account1PrivateKey = process.env.ACCOUNT1_PRIVATE_KEY
const account2 = '0x1136a05458d23a3852367C9A792032B32B313A0A'

const wallet = new ethers.Wallet(account1PrivateKey, provider) // create a wallet (just like metamask) to interact with blockchain

const writeTransaction = async () => {
    console.log('Starting "Send Ether" transaction...')
    // Account balances before transfer
    const senderBalanceBefore = await provider.getBalance(account1)
    const receiverBalanceBefore = await provider.getBalance(account2)

    // Send Ether
    const sendTx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther('0.3'),
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
