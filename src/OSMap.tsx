import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PinSvg from "./mappin.svg"
import { Chip } from "@mui/material";
import LocationMarker from "./LocationMarker";

let staticMap: L.Map;
export default function OSMap() {
    const markerIcon = L.icon({
        iconUrl: PinSvg,
        iconSize: [48, 48],
        iconAnchor: [16, 38]
    });
    const defaultZoom: number = 16;
    const defaultLocation = {lat: 52.51629936526891, lng: 13.377686483224936} // Brandenburger Tor, Berlin

    function setDefaultLocation() {
        if (!staticMap) return;
        staticMap.flyTo(defaultLocation, defaultZoom);
    }

    function setMyLocation() {
        if (!staticMap) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                staticMap.flyTo({lat: position.coords.latitude, lng: position.coords.longitude}, defaultZoom);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function fitAllLocations() {
        if (!staticMap) return;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {lat: position.coords.latitude, lng: position.coords.longitude};
                staticMap.flyTo(pos, staticMap.getZoom());
                const bounds = L.latLngBounds([defaultLocation, pos]); // Instantiate LatLngBounds object
                staticMap.fitBounds(bounds, {animate: true});
                },
            (error) => {
                console.log(error);
            }
        );
    }

  return (
    <div id="map">
        <Chip label="Go Home" 
            color="primary"
            style={{margin: "10px"}} 
            clickable={true} 
            onClick={ () => {window.location.href = "/"} } 
        />
        <Chip label="Default Location" 
            color="primary"
            style={{margin: "10px"}} 
            clickable={true} 
            onClick={ () => setDefaultLocation() } 
        />
        <Chip label="My Location" 
            color="primary"
            style={{margin: "10px"}} 
            clickable={true} 
            onClick={ () => setMyLocation() } 
        />
        <Chip label="Fit All" 
            color="primary"
            style={{margin: "10px"}} 
            clickable={true} 
            onClick={ () => fitAllLocations() } 
        />
        <MapContainer
            center={defaultLocation}
            zoom={defaultZoom}
            scrollWheelZoom
            style={{ height: "90vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={defaultLocation}
            icon={ markerIcon }
            >
                <Popup>
                    This is the default location
                </Popup>
            </Marker>
            <LocationMarker 
                defaultLocation = {defaultLocation}
                setStaticMap = {(m: L.Map) => { staticMap = m; }}
                markerIcon = {markerIcon}
            />
        </MapContainer>
    </div>
  );
}
