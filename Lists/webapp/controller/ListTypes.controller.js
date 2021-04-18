// @ts-nocheck
sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.m.MessageToast} MessageToast
     */
	function (Controller,JSONModel,MessageToast) {
		"use strict";

        function onInit() {
                    var oJSONModel = new JSONModel();
                    var oView = this.getView();
                    oJSONModel.loadData("./localService/mockdata/ListData.json");
                    oView.setModel(oJSONModel);
                };
        function getGroupHeader(oGroup) {
            var groupHeader = new sap.m.GroupHeaderListItem({
                title: oGroup.key,
                upperCase: true
            });

            return groupHeader;
        };
        function onShowSelecItem() {
            var standardList = this.getView().byId("standardList");
            var selectedItems = standardList.getSelectedItems();
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var mensaje = oResourceBundle.getText("messageSelection");

            if (selectedItems.length === 0) {
                mensaje = oResourceBundle.getText("messageNoSelection");                
            } else {
                for (let index in selectedItems) {
                    const oContext = selectedItems[index].getBindingContext().getObject();

                    if (index === "0") {
                        mensaje = mensaje + ' ';
                    } else {
                        mensaje = mensaje + ', ';
                    }
                    mensaje = mensaje + oContext.Material;
                    
                }
            }
            MessageToast.show(mensaje);
        };
        function onDeleteSelecItem() {
            var standardList = this.getView().byId("standardList");
            var selectedItems = standardList.getSelectedItems();
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            var mensaje = oResourceBundle.getText("messageDelete");            

            if (selectedItems.length === 0) {
                mensaje = oResourceBundle.getText("messageNoSelection");                
            } else {
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");     
                var arraySelec = [];                       
                for (let index in selectedItems) {
                    const oContext = selectedItems[index].getBindingContext().getObject();
                    if (index === "0") {
                        mensaje = mensaje + ' ';
                    } else {
                        mensaje = mensaje + ', ';
                    }
                    mensaje = mensaje + oContext.Material;
                    arraySelec.push(oContext.Id);
                }
                products = products.filter( function(p) { return !arraySelec.includes(p.Id) } );
                model.setProperty("/Products", products);
                standardList.removeSelections();
            }
            MessageToast.show(mensaje);            
        };
        function onDeleteRow(oEvent) {
            var context = oEvent.getParameter("listItem").getBindingContext();
            var split = context.getPath().split("/");
            var indexRow = split[split.length - 1];
            var model = this.getView().getModel();
            var products = model.getProperty("/Products");
            products.splice(indexRow,1);
            model.refresh();
        };
        var Main = Controller.extend("logaligroup.Lists.controller.ListTypes", {});

        Main.prototype.onInit = onInit;                
        Main.prototype.getGroupHeader = getGroupHeader;
        Main.prototype.onShowSelecItem = onShowSelecItem;
        Main.prototype.onDeleteSelecItem = onDeleteSelecItem;
        Main.prototype.onDeleteRow = onDeleteRow;
        return Main;    
    }
);

