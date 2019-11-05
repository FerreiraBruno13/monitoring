// Polyfills for IE support
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable/promise';
import 'whatwg-fetch';

import React from 'react';
import CssBaseLine from "@material-ui/core/CssBaseline";
import 'typeface-roboto';
import MainMenu from './MainMenu';
import Map from './Map';

function App() {
  const height = window.innerHeight;

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json));

  return (
    <>
      <CssBaseLine />
      <MainMenu />
      <Map height={height} />
    </>
  );
}

export default App;
