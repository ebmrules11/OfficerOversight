import { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';

function App() {
    const [mapPins, setMapPins] = useState([]); // State variable to store location data

    useEffect(() => {
        populateMapPinsData(); // Fetch location data on component mount
    }, []);

    async function populateMapPinsData() {
        // Fetch location data from backend
        const response = await fetch('https://localhost:7180/locations');
        const data = await response.json();
        setMapPins(data); // Update state with fetched data
    }

    return (
        <div>
            <p>Officer Oversight, reporting for duty! TEN HUT!</p>
            <MapComponent pins={mapPins} />
        </div>
    );
}

export default App;
