// Polyfills for IE support
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/stable/promise';
import 'whatwg-fetch';

import React, { useState } from 'react';
import { CssBaseline } from "@material-ui/core";
import 'typeface-roboto';
import MainMenu from './MainMenu';
import Map from './Map';

export default function App() {
  const height = window.innerHeight;
  const [map, setMap] = useState();

  const updateMap = newMap => setMap(newMap);

  return (
    <>
      <CssBaseline />
      <MainMenu map={map} />
      <Map height={height} mainMap={map} updateMap={updateMap} />
    </>
  );
}
