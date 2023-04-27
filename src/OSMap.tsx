import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import PinSvg from "./mappin.svg"
import { Chip } from '@mui/material';

export default class OSMap extends Component {
    markerIcon = L.icon({
        iconUrl: PinSvg,
        iconSize: [48, 48],
        iconAnchor: [16, 38]
    });
    myLocation = {lat: 52.51629936526891, lng: 13.377686483224936}; // Brandenburger Tor, Berlin

  render() {
    return (
        <div>
            <Chip label="OpenStreet Map" style={{margin: "10px"}} clickable={true} onClick={ () => {window.location.href = "/"} } />
            <MapContainer style={{height: "980px"}} center={this.myLocation} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.myLocation}
                icon={ this.markerIcon }
                >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
  }
}
