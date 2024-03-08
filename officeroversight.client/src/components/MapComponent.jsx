import React, { useState, Fragment } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ pins }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDMI6jKTqhitVdLVGcf6fUWJASvJHn0EAQ'
    });

    const [selectedPin, setSelectedPin] = useState(null);

    const mapStyles = {
        height: "90vh",
        width: "90vh"
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
        north: 34.5233,
        south: 33.7037,
        west: -118.6682,
        east: -117.8553,
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    const icon = {
        url: "https://www.iconarchive.com/download/i91266/icons8/windows-8/Military-Firing-Gun.ico", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
    };

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
                return <Marker key={pin.id} position={{ lat: pin.latitude, lng: pin.longitude }} icon={icon} onClick={() => setSelectedPin(pin)} />
            })}
            {selectedPin && (
                <InfoWindow
                    position={{ lat: selectedPin.latitude, lng: selectedPin.longitude }}
                    onCloseClick={() => setSelectedPin(null)}
                >
                    <div style={{ width: "300px", height: "300px" }}>
                        <h2>Event Data</h2>
                        <p>Date Event Occured: 9/11/2001</p>
                        <p>Name of Assailant: Julian Verdon</p>
                        <p>What happened: {selectedPin.title}</p>
                        <p>What caused the event to occur: {selectedPin.description}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

export default MapComponent;
