import React, {useEffect, useRef} from "react";
import L from 'leaflet';

const Home = () => {
    //Variables
    const _isMounted = useRef(true);
    const mapContainer = React.useRef(null);
    const baseLayer = useRef();

    function initMap(){
        baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; Pacific Community (OSM)',
            detectRetina: true
        });
    
        
        mapContainer.current = L.map('map', {
        zoom: 7,
        center: [-7.87321, 178.320346]
        });
        baseLayer.current.addTo(mapContainer.current); 

        var m_drawn_features = new L.FeatureGroup();
        mapContainer.current.addLayer(m_drawn_features);
   
        let draw_control = new L.Control.Draw({
         position: 'topleft',
         draw: {
             polyline: false,
             polygon: false,
             circle: false,
             rectangle: true,
             circlemarker: false,
             marker: false,
         },
         edit: {
           featureGroup: m_drawn_features, //REQUIRED!!
           remove: true
       }
     });
   
     mapContainer.current.addControl(draw_control);

     mapContainer.current.on(L.Draw.Event.CREATED, function(e) {
      // Remove all layers (only show one location at a time)
      m_drawn_features.clearLayers();
  
      // Add layer with the new features
      let new_features_layer = e.layer;
      m_drawn_features.addLayer(new_features_layer);
      console.log(new_features_layer)
    //  console.log('----------');
   //   console.log('----------');
    //  update_plot(new_features_layer);
  });
   
       
    }
    useEffect(() => {  
  
        if (_isMounted.current){
            console.log('home')
    initMap();
          
        }  
        return () => { _isMounted.current = false }; 
    },[]);

    return (
        <div className="container-fluid">
            <main id="bodyWrapper">
          <div id="mapWrapper">

 <div className="row">
 <div className="col-sm-6" style={{backgroundColor:'#f7f7f7', height:'45vh'}} id="map3">
 <div className="row" style={{marginTop:'10px'}}>
    <div className="col-sm-6">
    <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail2" >Start date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>
      </div>
      <div className="col-sm-6">
      <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail3" >End Date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail3" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>

  </div>
      </div>
 </div>
 <div className="col-sm-6" id="map" ref={mapContainer.current} />
 </div>
          </div>
      </main>
      </div>
      
    );  
}

export default Home;