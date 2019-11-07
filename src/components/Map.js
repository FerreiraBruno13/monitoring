import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { map, tileLayer } from "leaflet";

export default function Map({ map: mainMap, updateMap }) {
  const [divHeight, setDivHeight] = useState(window.innerHeight);
  const container = useRef();

  // const addWMSLayer = (url, options, target) => {
  //   tileLayer.wms(url, options).addTo(target);
  // }

  const updateHeight = () => {
    const { innerHeight: mainHeight } = window;
    const { height: offset } = getComputedStyle(container.current.parentElement.firstChild);
    const fitHeight = mainHeight - Number(offset.slice(0, -2));

    setDivHeight(fitHeight);
  }

  const renderMap = () => {
    updateHeight();

    const newMap = map(container.current, {
      center: [-23.547778, -46.635833],
      zoom: 4,
      maxBounds: [
        [-180, Infinity],
        [180, -Infinity]
      ],
      maxZoom: 16,
      minZoom: 3
    });

    updateMap(newMap);

    tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(newMap);
  }

  useEffect(renderMap, [container]);

  window.addEventListener("resize", updateHeight);

  return (
    <div id="map" style={{ height: divHeight }} ref={container} />
  );
}