///<reference path= '../node_modules/dojo-typings/dojo/1.11/modules.d.ts' />
///<reference path= '../node_modules/dojo-typings/dojo/1.11/loader.d.ts' />
define(["require", "exports", "tslib", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/MapImageLayer", "esri/widgets/LayerList"], function (require, exports, tslib_1, Map_1, MapView_1, FeatureLayer_1, MapImageLayer_1, LayerList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    LayerList_1 = tslib_1.__importDefault(LayerList_1);
    //import domClass from "dojo-typings/dojo/1.11/dom-class"
    ///// "{*}" IS NO LONGER SUPPORTED AFTER API 4.13 must use view.popup.defaultPopupTemplateEnabled = true;
    //var popupTemplate = {
    //    title: "",//replace with layer name when i figure out that property's name
    //    content: "{*}" //want all fields and then down the road we'll filter out shape and ObjID  use reply reply from forum thread to build array of all fields post-4.12 api - for now i am using 4.12 api to be able to use wildcare that was deprecated
    //};
    var map = new Map_1.default({
        basemap: "streets-vector",
        layers: []
    });
    var view = new MapView_1.default({
        container: "viewDiv",
        map: map,
        center: [-71.404317, 42.082764],
        zoom: 13
    });
    var popup = view.popup;
    //popup.popupTemplate.outFields = ["*"];
    view.popup.defaultPopupTemplateEnabled = true;
    // add FranklinMA Layers
    var townLayerDynamic = new MapImageLayer_1.default({
        url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer",
        visible: false
    });
    var townAllSublayers = townLayerDynamic.allSublayers;
    console.log(townAllSublayers);
    //var townFeatureLayerArray = function (townAllSublayers) {
    //    for i in 
    //}
    // add FranklinMA Layers
    var Frank = new MapImageLayer_1.default({
        url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer",
    });
    var mapImageLayer = new MapImageLayer_1.default({
        url: Frank.url,
        title: Frank.title
    });
    map.add(mapImageLayer);
    for (var i in Frank.sublayers) {
        mapImageLayer.sublayers.add({
            id: Frank.sublayers[i].id,
            visible: Frank.sublayers[i].visible,
            title: Frank.sublayers[i].name,
            popupTemplate: Frank.sublayers[i].popupTemplate
        });
    }
    var ParcelLinesNoOrtho = new FeatureLayer_1.default({
        url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer/15"
    });
    //map.add(ParcelLinesNoOrtho);
    var MiddleSchoolDistricts = new FeatureLayer_1.default({
        url: "https://portal.axisgis.com/server/rest/services/FranklinMA/FranklinMA/MapServer/92",
        opacity: 0.5,
        visible: false
        // popupTemplate: popupTemplate
    });
    //map.add(MiddleSchoolDistricts, 0);
    var layer = new MapImageLayer_1.default({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        sublayers: [{
                id: 0
            }]
    });
    //use this to test Grouping new GroupLayer concept in Api 4.x later to see if can be grouped in middle of layerlist with CAI town layers and sublayers
    map.layers.addMany([townLayerDynamic, ParcelLinesNoOrtho, MiddleSchoolDistricts]);
    map.layers.reorder(MiddleSchoolDistricts, 0);
    //var layerName;
    //layerName = "test title hard coded";
    var layerList = new LayerList_1.default({
        view: view
    });
    view.ui.add(layerList, {
        position: "top-left"
    });
});
//# sourceMappingURL=main.js.map