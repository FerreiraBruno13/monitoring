// Polyfills for IE support
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable/promise';
import 'whatwg-fetch';

import React, { useState, useEffect } from 'react';
import CssBaseLine from "@material-ui/core/CssBaseline";
import 'typeface-roboto';
import MainMenu from './MainMenu';
import Map from './Map';

export default function App() {
  const height = window.innerHeight;
  const [map, setMap] = useState();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => console.log(json));
  }, []);

  const updateMap = newMap => setMap(newMap);

  return (
    <>
      <CssBaseLine />
      <MainMenu map={map} updateMap={updateMap} />
      <Map height={height} mainMap={map} updateMap={updateMap} />
    </>
  );
}
