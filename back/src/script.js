const ItemManager = require('../../client/src/contracts/ItemManager.json');

const run = async () => {
    // Get web3
    const Web3 = require('web3')
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    // Get address
    // const accounts = await web3.eth.getAccounts()
    // console.dir(accounts)

    // get balance
    // const balance = await web3.eth.getBalance(accounts[0])
    // console.log(`balance : ${balance}`)

    const networkId = await web3.eth.net.getId();
    let itemManager = new web3.eth.Contract(
        ItemManager.abi,
        ItemManager.networks[networkId] &&
        ItemManager.networks[networkId].address,
    );

    await new Promise((resolve, reject) => {
        itemManager
            .events
            .SupplyChainStep({})
            .on('data', async evt => {
                if (evt.returnValues._step === 1) {
                    let item = await self.itemManager.methods.item(evt.returnValues._itemIndex).call();

                    console.warn(item);
                    // alert("Item " + item._identifier + " was paid, deliver it now!");
                } else {
                    console.warn(evt);
                }
            });
    });

    // itemManager.events.SupplyChainStep()
    //     .on("data", async function (evt) {
    //         if (evt.returnValues._step === 1) {
    //             let item = await self.itemManager.methods.item(evt.returnValues._itemIndex).call();

    //             console.warn(item);
    //             // alert("Item " + item._identifier + " was paid, deliver it now!");
    //         } else {
    //             console.warn(evt);
    //         }

    //     })
    //     .on('error', evt => {
    //         console.error(evt);
    //     })
}

run()
    .then(res => console.log('ready'))
    .catch(err => console.log(err));