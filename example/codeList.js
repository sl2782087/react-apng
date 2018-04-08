const CODELIST = [
  `
  import ApngComponent from 'react-apng';
  import apic1 from './apic1.png';

  class App extends React.Component {
    render() {
      return (
        <ApngComponent src={apic1} />
      );
    }
  }
  `,
  `
    <ApngComponent autoPlay src={apic1} />
  `,
  `
    //default value is 1.0
    <ApngComponent rate={3.5} autoPlay src={apic1} />
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
            <button onClick={this.apngPlay}>播放</button>
            <button onClick={this.apngPlayOne}>播放一遍</button>
            <button onClick={this.apngPause}>暂停</button>
            <button onClick={this.apngStop}>停止</button>
          </div>
        </div>
      );
    }
  }
  `,
];
export default CODELIST;
