import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import './style.less';
// import ApngComponent from '../lib/ApngComponent.js';
import apic1 from './apic1.png';
import CODELIST from './codeList.js';

const ApngComponent = require('../lib/ApngComponent.js');


class App extends React.Component {
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
	render() {
		return (
			<div className="container">
				<div className="box">
					<p className="title">usage 引入使用</p>
					<div className="code-box">
						<CodeMirror value={CODELIST[0]} options={{ mode: 'jsx' }} />
					</div>
					<ApngComponent style={{ border: '1px solid #000' }} className="apng-box" src={apic1} />
				</div>
				<div className="box">
					<p className="title">autoplay 自动播放</p>
					<div className="code-box">
						<CodeMirror value={CODELIST[1]} options={{ mode: 'jsx' }} />
					</div>
					<ApngComponent className="apng-box" autoPlay src={apic1} />
				</div>
				<div className="box">
					<p className="title">animation rate 播放速度</p>
					<div className="code-box">
						<CodeMirror value={CODELIST[2]} options={{ mode: 'jsx' }} />
					</div>
					<ApngComponent className="apng-box" rate={3.5} autoPlay src={apic1} />
				</div>
				<div className="box height-more">
					<p className="title">control 控制</p>
					<div className="code-box">
						<CodeMirror value={CODELIST[3]} options={{ mode: 'jsx' }} />
					</div>
					<div className="control-box">
						<ApngComponent ref="apngcom" src={apic1} />
						<div className="btn-box">
							<button onClick={this.apngPlay}>play</button>
							<button onClick={this.apngPlayOne}>play once</button>
							<button onClick={this.apngPause}>pause</button>
							<button onClick={this.apngStop}>stop</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
