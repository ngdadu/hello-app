import React, { Component, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import PinSvg from "./mappin.svg"
import { Chip } from '@mui/material';

export default class OSMap extends Component {
    markerIcon = L.icon({
        iconUrl: PinSvg,
        iconSize: [48, 48],
        iconAnchor: [16, 38]
    });
    myLocation: LatLngExpression = {lat: 52.51629936526891, lng: 13.377686483224936}; // Brandenburger Tor, Berlin
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.myLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                console.log(`found ${this.myLocation}`);
                //let mapRef = useRef<L.Map>();
                //let m = mapRef.current;
                //m?.panTo(this.myLocation);
                this.forceUpdate();
            },
            (error) => {
                console.log(error);
            }
        );
        console.log(`mount ${this.myLocation}`);
    }

  render() {
    console.log(`render ${this.myLocation}`);
    return (
        <div id="map">
            <Chip label="OpenStreet Map" style={{margin: "10px"}} clickable={true} onClick={ () => {window.location.href = "/"} } />
            <MapContainer style={{height: "980px"}} center={this.myLocation} zoom={16} scrollWheelZoom={true}
            >
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
