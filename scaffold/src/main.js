import TS from './ts/index.tsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
   <TS />,
   document.getElementById('root')
);

require('./style/index.css')
require('./style/app.css')
require('./style/index.less')
require('./style/index.scss')
require('./style/index.postcss')

// import 动态引入， 注意动态引入名字不能为表达式，否则会导致 tree shaking 无效
import('./module.js').then(({ counter, incCounter }) => {
	console.log(counter);
	incCounter();
	console.log(counter);
});

const h2 = document.createElement('h2')
h2.className = 'test'
h2.innerText = 'testaaa'
document.body.append(h2);

import { cube, square } from './treeShaking';

console.log(cube(2));
