import React from 'react';
import ReactDOM from 'react-dom';
import ApngComponent from '../lib/ApngComponent.js';
import apic1 from './apic1.png';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p>自动播放</p>
        <div>
        <ApngComponent autoPlay={true} src={apic1} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
