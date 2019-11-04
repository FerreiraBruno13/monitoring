// Polyfills for IE support
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable/promise';
import 'whatwg-fetch';

import React from 'react';
import 'typeface-roboto';
import MainMenu from './MainMenu';
import Map from './Map';

function App(props) {
  const height = window.innerHeight;
  console.log(props.children)

  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json));

  // Some unknown style is applying margin on the body
  document.body.style.setProperty("margin", 0);

  return (
    <>
      <MainMenu />
      <Map height={height} />
    </>
  );
}

export default App;
