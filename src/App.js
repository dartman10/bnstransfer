import logo from './logo.svg';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import ContractCallBnsTransfer from './components/ContractCallBnsTransfer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <i>
            A work-in-progress entry for Clarity Universe Camp III Hackathon
          </i>
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React + Stacks.js + BNS 👋</h2>
        <ConnectWallet />
        <ContractCallBnsTransfer />
        <p>
          <i>dartman#1304</i>
        </p>
      </header>
    </div>
  );
}

export default App;
