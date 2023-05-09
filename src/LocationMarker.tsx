import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

//a local component
export default function LocationMarker(props: {
    defaultLocation: L.LatLngExpression,
    setStaticMap: any,
    markerIcon: L.Icon
    }) 
{
    const [position, setPosition] = useState(props.defaultLocation);
    const [bbox, setBbox] = useState([""]);

    const map = useMap();
    props.setStaticMap(map);

    useEffect(() => {
    map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        console.log(circle.options);
        circle.options.fill = false;
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
        setTimeout(() => {
            const bounds = L.latLngBounds([props.defaultLocation, e.latlng]); // Instantiate LatLngBounds object
            map.fitBounds(bounds, {animate: true, duration: 1000 });
        }, 2500);
    });
    }, [map]);

    return position === null ? null : (
    <Marker position={position} icon={props.markerIcon}>
        <Popup>
        You are here. <hr />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
        </Popup>
    </Marker>
    );
}
