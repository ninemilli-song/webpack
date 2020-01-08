import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import './main.scss';

const Button = () => {
	return (
		<div
			className="button"
		>
			Hello, React@16.8
		</div>
	)
}

render(<Button/>, window.document.getElementById('app'));