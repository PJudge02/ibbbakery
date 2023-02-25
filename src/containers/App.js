import './App.css';
import React from 'react';
import OrderForm from '../components/OrderForm.js';
import FullPage from '../components/FullPage.js'

class App extends React.Component {

  render() {
    return (
      <div className="tc">
        <FullPage/>
        {/* <OrderSubmitted/> */}
        {/* <OrderForm /> */}
      </div>
    )
  }
}
// function App() {

// }

export default App;
