import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

//a local component
export default function LocationMarker(props: {
    defaultLocation: L.LatLngExpression,
    setStaticMap: (m: L.Map) => void,
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
        <table>
            <tr><td>LAT:LON</td><td>{bbox[3]} : {bbox[2]}</td></tr>
            <tr><td>{bbox[1]} : {bbox[0]}</td><td>LAT:LON</td></tr>
        </table>
        </Popup>
    </Marker>
    );
}
