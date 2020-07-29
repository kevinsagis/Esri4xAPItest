///<reference path= '../node_modules/dojo-typings/dojo/1.11/dnd.d.ts' />


import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import MapImageLayer from "esri/layers/MapImageLayer";
import LayerList from "esri/widgets/LayerList";
import Popup from "esri/widgets/Popup";
import PopupTemplate from "esri/PopupTemplate";
import Sublayer from "esri/layers/support/Sublayer";
import esri = __esri;
import Moveable from "dojo-typings/dojo/1.11/dnd/";  

 
//to do also: move various functionalities or extended widgets like moving Popup to separate files 




const map = new EsriMap({
    basemap: "streets-vector",
    layers: []
    });

var view = new MapView({
        container: "viewDiv",
        map: map,
      
        center: [-71.404317, 42.082764],
        zoom: 13
});

const popup = view.popup;
//popup.popupTemplate.outFields = ["*"];
view.popup.defaultPopupTemplateEnabled = true;

    // add FranklinMA Layers
const townLayerDynamic = new MapImageLayer({
        url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer",
    visible: false    
    });

var townAllSublayers = townLayerDynamic.allSublayers;
console.log(townAllSublayers);
//var townFeatureLayerArray = function (townAllSublayers) {
//    for i in 
/////consider adding all mapservice sublayers each as featurelayer for default popup to work?
///defaultpopupenabled 'should' work but is not working for map image layer service .. bug??? https://community.esri.com/thread/246593-js-414-mapimagelayer-sublayers-default-popup-template

//}



// add FranklinMA Layers
const Frank = new MapImageLayer({
    url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer",
     
});
var mapImageLayer = new MapImageLayer({
    url: Frank.url,
    title: Frank.title
});
map.add(mapImageLayer);  //testing add template to all sublayers .. 
for (var i in Frank.sublayers) {
    mapImageLayer.sublayers.add({
        id: Frank.sublayers[i].id,
        visible: Frank.sublayers[i].visible,
        title: Frank.sublayers[i].name,
        popupTemplate: Frank.sublayers[i].popupTemplate
    });
}

const ParcelLinesNoOrtho = new FeatureLayer({

    url:
            "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer/15"
    });
    //map.add(ParcelLinesNoOrtho);

const MiddleSchoolDistricts = new FeatureLayer({
        url:
            "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer/92",
        opacity: 0.5,
    visible: false
   // popupTemplate: popupTemplate

    });
    //map.add(MiddleSchoolDistricts, 0);


var layer = new MapImageLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
   

    sublayers: [{
        id: 0        
    }]
});
//use this to sample service to test Grouping layer with new GroupLayer concept in Api 4.x later to see if can be grouped in middle of layerlist with CAI town layers and sublayers


map.layers.addMany([townLayerDynamic, ParcelLinesNoOrtho, MiddleSchoolDistricts]);
    map.layers.reorder(MiddleSchoolDistricts, 0);

//var layerName;
//layerName = "test title hard coded";




    var layerList = new LayerList({
        view: view
    });
    view.ui.add(layerList, {
        position: "top-left"
    });
