import './App.css';
import React from 'react';
import OrderForm from '../components/OrderForm.js';

class App extends React.Component {

  render() {
    return (
      <div className="tc">
        {/* <OrderSubmitted/> */}
        <OrderForm />
      </div>
    )
  }
}
// function App() {

// }

export default App;
