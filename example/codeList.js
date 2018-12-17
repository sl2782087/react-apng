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
    //click to play and pause 
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
  import apic2 from './apic2.png';
  import png from './png.png' //静态图片
  
  const imgList = [apic1, png, apic2];

  class App extends React.Component {
    state = {
      img: imgList[0]
    } ;
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
    changeImg = () => {
      if (this.index > 1) {
          this.index = 0;
      } else {
          this.index += 1;
    }
      const img = imgList[this.index];
      this.setState({
          img
      });
    };
    render() {
      return (
        <div>
          <ApngComponent ref="apngcom" rate={1} src={this.state.img} />
          <div>
            <button onClick={this.apngPlay}>play</button>
            <button onClick={this.apngPlayOne}>play once</button>
            <button onClick={this.apngPause}>pause</button>
            <button onClick={this.apngStop}>stop</button>
            <button onClick={this.changeImg}>change</button>
          </div>
        </div>
      );
    }
  }
  `,
];
export default CODELIST;
