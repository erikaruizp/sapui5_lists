// @ts-nocheck
sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
	function (Controller,JSONModel) {
		"use strict";

        function onInit() {
                    var oJSONModel = new JSONModel();
                    var oView = this.getView();
                    oJSONModel.loadData("./localService/mockdata/ListData.json");
                    oView.setModel(oJSONModel);
                };

        var Main = Controller.extend("logaligroup.Lists.controller.ListTypes", {});

        Main.prototype.onInit = onInit;                
                        
		});

