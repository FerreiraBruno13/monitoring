import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { map, tileLayer } from "leaflet";

export default function Map() {
  const [divHeight, setDivHeight] = useState(window.innerHeight);
  let mainMap = useRef();
  const container = useRef();

  // const addWMSLayer = (url, options, target) => {
  //   tileLayer.wms(url, options).addTo(target);
  // }

  useEffect(() => {
    const { innerHeight: mainHeight } = window;
    const { height: offset } = getComputedStyle(container.current.parentElement.firstChild);
    const fitHeight = mainHeight - Number(offset.slice(0, -2));

    setDivHeight(fitHeight);

    mainMap.current = map(container.current, {
      center: [0, 0],
      zoom: 2
    });

    tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(mainMap.current);
  }, [container]);

  return (
    <div style={{ height: divHeight }} ref={container} />
  );
}