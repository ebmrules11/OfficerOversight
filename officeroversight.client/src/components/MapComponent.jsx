import React, { useState, Fragment } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ pins }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDMI6jKTqhitVdLVGcf6fUWJASvJHn0EAQ'
    });

    const [selectedPin, setSelectedPin] = useState(null);

    const mapStyles = {
        height: "95vh",
        width: "95vh"
    };

    const infoWindowStyle = {
        padding: '10px',
        maxWidth: '8000px',
        minwidth: '500px',
        minheight: '300px',
        color: '#000'
    };

    const defaultCenter = {
        lat: 34.051926, // Center latitude for LA County
        lng: -118.226393 // Center longitude for LA County
    };

    // Bounds for LA County
    const LA_BOUNDS = {
        north: 35.1233,
        south: 33.2037,
        west: -119.6682,
        east: -116.8553,
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
            options={{
                restriction: {
                    latLngBounds: LA_BOUNDS,
                    strictBounds: true,
                },
            }}>
            {pins && pins.map(pin => {
                const icon = {
                    url: pin.url, // url
                    scaledSize: new google.maps.Size(50, 50), // scaled size
                };
                return <Marker key={pin.id} position={{ lat: pin.latitude, lng: pin.longitude }} icon={icon} onClick={() => setSelectedPin(pin)} />
            })}
            {selectedPin && (
                <InfoWindow
                    position={{ lat: selectedPin.latitude, lng: selectedPin.longitude }}
                    onCloseClick={() => setSelectedPin(null)}
                >
                    <div style={{ width: "300px", height: "300px" }}>
                        <h2>Event Data</h2>
                        <p>Date Event Occured: {selectedPin.date} </p>
                        <p>Location: {selectedPin.city}, {selectedPin.state} </p>
                        <p>Name of Deceased: {selectedPin.name} </p>
                        <p>Race: {selectedPin.race} </p>
                        <p>Threat Type: {selectedPin.threatType} </p>
                        <p>Was mental illness involved: {selectedPin.wasMentalIllnessRelated}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default MapComponent;
