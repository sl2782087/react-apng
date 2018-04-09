const CODELIST = [
  `
  import ApngComponent from 'react-apng';
  import apic1 from './apic1.png';

  class App extends React.Component {
    render() {
      return (
        <ApngComponent
          style={{ border: '1px solid #000' }}
          className="apng-box"
          src={apic1}
        />
      );
    }
  }
  `,
  `
    <ApngComponent autoPlay={true} src={apic1} />
  `,
  `
    //default value is 1.0
    <ApngComponent rate={3.5} autoPlay={true} src={apic1} />
  `,
  `
    //click pause 
    <ApngComponent
      ref="apngcom"
      onClick={this.apngPause}
      autoPlay={true}
      src={apic1}
    />
  `,
  `
  import ApngComponent from 'react-apng';
  import apic1 from './apic1.png';

  class App extends React.Component {
    apngPlay=()=>{
      this.refs.apngcom.play();
    }
    apngPlayOne=()=>{
      this.refs.apngcom.one();
    }
    apngPause=()=>{
      this.refs.apngcom.pause();
    }
    apngStop=()=>{
      this.refs.apngcom.stop();
    }
    render() {
      return (
        <div>
          <ApngComponent ref="apngcom" src={apic1} />
          <div>
            <button onClick={this.apngPlay}>play</button>
            <button onClick={this.apngPlayOne}>play once</button>
            <button onClick={this.apngPause}>pause</button>
            <button onClick={this.apngStop}>stop</button>
          </div>
        </div>
      );
    }
  }
  `,
];
export default CODELIST;
