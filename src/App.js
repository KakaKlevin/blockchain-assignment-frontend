import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Web3 from 'web3';

const ADDRESS = "0x500192509beb6f53faa6e17b68d245a508a22d15";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreasingNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increasingNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];
function App() {
  const [number, setNumber] = useState("none");
  const [newMessage, setNewMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("none");

  const web3 = new Web3(window.ethereum);

  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  async function getNumber() {
    const result = await myContract.methods.getNumber().call();

    setNumber(String(result));
  }

  async function increaseNumber() {
    const accountConnected = await web3.eth.requestAccounts();
    const tx = await myContract.methods.increasingNumber().send({ from: accountConnected[0]});

    getNumber();
  }

  async function decreaseNumber() {
    const accountPresent = await web3.eth.requestAccounts();
    const tx = await myContract.methods.decreasingNumber().send({ from: accountPresent[0]});

    getNumber();
  }

  async function getMessage() {
    const message =  await myContract.methods.message().call();
    setCurrentMessage(message);
    
  }

  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();
    const transact = await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0]});

    getMessage();
  }

  return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={getNumber}>Get Number</button>
      <button onClick={increaseNumber}>Increase Number</button>
      <button onClick={decreaseNumber}>Decrease Number</button>
      <p>Number: {number}</p>
      <button onClick={getMessage}>Get Messages</button>
      <p>Message: {currentMessage}</p>
      <input 
      type='text'
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder='Enter new message'
      />
       <button onClick={updateMessage}>Update Messages</button>
       <p>Message: {newMessage}</p>
    </header>
  </div>
  );
}

export default App;
