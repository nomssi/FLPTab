sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
	"use strict";

	return Controller.extend("FLPTab.controller.App", {
        onInit: function() {
            var oTabData = {
                "filterTabs" : [{
                    "key" : "Order",
                    "state": "Critical",
                    "text": "Auftrag",
                    "icon": "sap-icon://customer-order-entry",
                    "fragment": "FLPTab.view.Order"
                    },{
                    "key" : "Person",
                    "state": "Critical",
                    "text": "Mitarbeiter",
                    "icon": "sap-icon://personnel-view"
                    },{
                    "key" : "Amount",
                    "state": "Critical",
                    "text": "Mengen",
                    "icon": "sap-icon://complete"
                    },{
                    "key" : "Time",
                    "state": "Critical",
                    "text": "Zeiten",
                    "icon": "sap-icon://fob-watch"
                    },{
                    "key" : "Material",
                    "state": "Critical",
                    "text": "Materialien",
                    "icon": "sap-icon://product"
                    },{
                    "key" : "Save",
                    "state": "Critical",
                    "text": "Speichern",
                    "icon": "sap-icon://save"
            }]};
            var oTabModel = new sap.ui.model.json.JSONModel();
            oTabModel.setData(oTabData);
            this.getView().setModel(oTabModel, "tabs");
            
            this._fragmentList = {};
        },
        onAfterRendering: function() {
            this.tabSelect(null);
        },
        tabSelect: function(oSource) {
            var oTabs = this.getView().byId("idIconTabBar");
            if (oTabs.getSelectedKey === "") {
                return;
            }
            var sFragment = "idv.tab.FLPTab.view." + oTabs.getSelectedKey();

            var oFragment = this.getFragment(sFragment);
            oTabs.removeAllContent();
            oTabs.addContent(oFragment);

        },
        getFragment: function(sName) {
            if(typeof this._fragmentList[sName] !== "undefined" ) {
                
                return this._fragmentList[sName];
            }
            var oFragment = new sap.ui.xmlfragment("fragment" + sName.split(".").pop(), sName, this);
            this._fragmentList[sName] = oFragment;
            return oFragment;
        }
	});
});
