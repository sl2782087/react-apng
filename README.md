# react-apng
APNG implementation on canvas as a [React.js](http://facebook.github.io/react) component, provides functions for control it (base on [apng-js](https://github.com/davidmz/apng-js)).

## Demo & Examples

Live demo: [https://sl2782087.github.io/react-apng/](https://sl2782087.github.io/react-apng/)

To run the examples locally:

```
npm install or yarn
npm start or yarn start
```

Then open [`localhost:8080`](http://localhost:8080) in a browser.


## Installation

react-apng is available through npm or yarn:

```
npm install react-apng --save
```
```
yarn add react-apng --save
```
## Usage

Require the react-apng component and render it with JSX:
```javascript
const React = require('react');
const ApngComponent = require('react-codemirror');

var App = React.createClass({
	getInitialState: function() {
		return {
			code: "// Code",
		};
	},
	updateCode: function(newCode) {
		this.setState({
			code: newCode,
		});
	},
	render: function() {
		var options = {
			lineNumbers: true,
		};
		return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
	}
});

React.render(<App />, document.getElementById('app'));
```
