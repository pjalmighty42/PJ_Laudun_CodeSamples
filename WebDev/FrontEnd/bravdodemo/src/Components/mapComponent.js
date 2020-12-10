import React from 'react';

import ReactMapGL, {Marker} from 'react-map-gl';

const mapComponent = (props) => {
    const mapStyle = {
        width: props.width,
        height: props.height,
        latitude: props.lat,
        longitude: props.long,
        zoom: 8
    };

    return(
        <ReactMapGL 
                mapboxApiAccessToken="pk.eyJ1IjoicGpseDkxMSIsImEiOiJja2hpcHRrY3UwY2hiMnhzODVmMnV3aTNuIn0.k11BAYCM9-Xv0DQUR6gdlw"
                {...mapStyle}
            >
             <Marker latitude={mapStyle.latitude} longitude={mapStyle.longitude} offsetLeft={-20} offsetTop={-10}>
                <div>You are here</div>
            </Marker>
        </ReactMapGL>
    );
};

export default mapComponent