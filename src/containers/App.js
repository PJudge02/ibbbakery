import './App.css';
import React from 'react';
import OrderForm from '../components/OrderForm.js';
// import Hi from '../Hi.js'

class App extends React.Component {

  render() {
    return (
      <div className="tc">
        {/* <OrderSubmitted/> */}
        <OrderForm />
        {/* <Hi/> */}
      </div>
    )
  }
}
// function App() {

// }

export default App;
