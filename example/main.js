import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import './style.less';
import ApngComponent from '../src/ApngComponent.js';
import apic1 from './apic1.png';
import apic2 from './apic2.png';
import png from './png.png';
import CODELIST from './codeList.js';
const imgList = [apic1, png, apic2];
class App extends React.Component {
    state = {
        img: imgList[0]
    };
    componentDidMount() {
        this.index = 0;
    }
    apngPlay = () => {
        this.refs.apngcom.play();
    };
    apngPlayOne = () => {
        this.refs.apngcom.one();
    };
    apngPause = () => {
        this.refs.apngcom.pause();
    };
    apngStop = () => {
        this.refs.apngcom.stop();
    };
    apngPause2 = () => {
        if (this.refs.apngcom2.isPlay) {
            this.refs.apngcom2.pause();
        } else {
            this.refs.apngcom2.play();
        }
    };
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
            <div className="container">
                <div className="box">
                    <p className="title">usage 引入使用</p>
                    <div className="code-box">
                        <CodeMirror
                            value={CODELIST[0]}
                            options={{ mode: 'jsx' }}
                        />
                    </div>
                    <ApngComponent
                        style={{ border: '1px solid #000' }}
                        className="apng-box"
                        src={apic1}
                    />
                </div>
                <div className="box">
                    <p className="title">autoplay 自动播放</p>
                    <div className="code-box">
                        <CodeMirror
                            value={CODELIST[1]}
                            options={{ mode: 'jsx' }}
                        />
                    </div>
                    <ApngComponent className="apng-box" autoPlay src={apic1} />
                </div>
                <div className="box">
                    <p className="title">play rate 播放速度</p>
                    <div className="code-box">
                        <CodeMirror
                            value={CODELIST[2]}
                            options={{ mode: 'jsx' }}
                        />
                    </div>
                    <ApngComponent
                        className="apng-box"
                        rate={3.5}
                        autoPlay
                        src={apic1}
                    />
                </div>
                <div className="box">
                    <p className="title">bind event 事件绑定</p>
                    <div className="code-box">
                        <CodeMirror
                            value={CODELIST[3]}
                            options={{ mode: 'jsx' }}
                        />
                    </div>
                    <ApngComponent
                        ref="apngcom2"
                        className="apng-box"
                        onClick={this.apngPause2}
                        autoPlay
                        src={apic1}
                    />
                </div>
                <div className="box height-more">
                    <p className="title">control 控制</p>
                    <div className="code-box">
                        <CodeMirror
                            value={CODELIST[4]}
                            options={{ mode: 'jsx' }}
                        />
                    </div>
                    <div className="control-box">
                        <ApngComponent ref="apngcom" src={this.state.img} />
                        <div className="btn-box">
                            <button onClick={this.apngPlay}>play</button>
                            <button onClick={this.apngPlayOne}>
                                play once
                            </button>
                            <button onClick={this.apngPause}>pause</button>
                            <button onClick={this.apngStop}>stop</button>
                            <button onClick={this.changeImg}>change</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
