import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import ItemManager from './contracts/ItemManager.json';
import Item from './contracts/Item.json';
import getWeb3 from "./getWeb3";

import "./App.css";

/**
 * @typedef {object} ObjectReturnValuesEvent
 * @property {string} _address
 * @property {string} _itemIndex
 * @property {string} _step
 */

/**
 * @typedef {object} ObjectRawEvent
 * @property {string} data
 * @property {Array<string>} topics
 */

/**
 * @typedef {object} ObjectEvent
 * @property {string} address
 * @property {string} blockHash
 * @property {number} blockNumber
 * @property {string} event
 * @property {string} id
 * @property {number} logIndex
 * @property {ObjectRawEvent} raw
 * @property {ObjectReturnValuesEvent} returnValues
 * @property {string} signature
 * @property {string} transactionHash
 * @property {number} transactionIndex
 * @property {string} type
 */

class App extends Component {
  state = {
    cost: 0,
    itemName: "exampleItem1",
    loaded: false,
    web3: null,
    accounts: [],
    itemManager: null,
    item: null
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;

    // console.log(itemName, cost, this.itemManager);
    let result = await this.state.itemManager.methods.createItem(itemName, cost).send({ from: this.state.accounts[0] });

    // console.log(result);
    // alert("Send " + cost + " Wei to " + result.events.SupplyChainStep.returnValues._address);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  listenToPaymentEvent = () => {
    try {
      let self = this;
      if (this.state.itemManager) {
        console.log('here');
        this.state.itemManager.events.SupplyChainStep()
          .on("data", async function (evt) {
            if (evt.returnValues._step === 1) {
              let item = await self.itemManager.methods.item(evt.returnValues._itemIndex).call();

              // console.warn(item);
              // alert("Item " + item._identifier + " was paid, deliver it now!");
            } else {
              console.warn(evt);
            }

          })
          .on('error', evt => {
            console.error(evt);
          })
      } else if (this.itemManager) {
        self
          .itemManager
          .events
          .SupplyChainStep()
          .on('data', async (evt) => {
            /**
             * @type {ObjectEvent}
             */
            let data = evt;
            if (evt) {
              console.log('evento en emit');
              console.log(data.returnValues._address);
              console.log('evento en emit');
            }
          })
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount = async () => {
    let web3 = await getWeb3();

    let accounts = await web3.eth.getAccounts();

    const networkId = await web3.eth.net.getId();
    let itemManager = new web3.eth.Contract(
      ItemManager.abi,
      ItemManager.networks[networkId] &&
      ItemManager.networks[networkId].address,
    );

    this.itemManager = itemManager;

    let item = new web3.eth.Contract(
      Item.abi,
      Item.networks[networkId] && Item.networks[networkId].address,
    );

    this.listenToPaymentEvent();
    this.setState({
      loaded: true,
      web3,
      accounts,
      itemManager,
      item
    });
  }

  // state = { storageValue: 0, web3: null, accounts: null, contract: null };

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Simply Payment/Supply Chain Example!</h1>
        <h2>Items</h2>

        <h2>Add Element</h2>
        Cost: <input type="text" name="cost" id="cost" value={this.state.cost} onChange={this.handleInputChange} />
        Item Name: <input type="text" name="itemName" id="itemName" value={this.state.itemName} onChange={this.handleInputChange} />
        <button type="submit" onClick={this.handleSubmit}>Create new Item</button>
      </div>
    );
  }
}

export default App;
