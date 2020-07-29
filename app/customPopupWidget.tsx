import { declared, subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";
import Popup = require("esri/widgets/Popup")
import PopupVM = require("esri/widgets/Popup/PopupViewModel")


const CSS = {
    popupContainer: "custom-popup-container"
};

alert(CSS);

//@subclass("customPopupCSS")
//class CustomPopup extends declared(Popup)




//var view = new MapView({
//        container: "viewDiv",
//        map: map,
      
//        center: [-71.404317, 42.082764],
//        zoom: 13
//    }); 

//const customPopup;

//view.ui.add(customPopup, {
//    position: "top-left"
//});
