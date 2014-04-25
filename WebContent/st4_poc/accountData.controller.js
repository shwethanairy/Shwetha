sap.ui.controller("st4_poc.accountData", {


	 backTriggered: function() {
	        var bus = sap.ui.getCore().getEventBus();
	        bus.publish("nav", "back");
	    }  ,
	 
	 onBeforeShow : function(evt) {
		  		view = this.getView();
		  		busyDialog.open();	
				oModel.read("AccountSet" + "?$filter=BPID eq '" + BPID + "'and AccountID eq '" + evt.data.data.AccID + "'and AccountType eq '" + evt.data.data.AccType + "'and POLID eq '" + evt.data.data.POLID + "'" , null, null, true, function(oData, oResponse){
					for ( var i = 0; i < oResponse.data.results.length; i++) { 
						var accData = new sap.m.ColumnListItem({
							cells : [ new sap.m.ObjectIdentifier({
										text : oResponse.data.results[i].Date
										}) ,
										
									  new sap.m.Text({
										text : oResponse.data.results[i].Description
										}) ,
										
									  new sap.m.Text({
										text : oResponse.data.results[i].TxnType
										}) ,
											
									  new sap.m.Text({
										text : oResponse.data.results[i].Amount
										}) 
											
							
							         ]
						});
						accSummary.addItem(accData);
					}
					busyDialog.close();
			    	},function(){
			    	busyDialog.close();
			        alert("Read failed");
			    });
		}  ,
		
		logout : function(evt) {
			logoutDialog.open();
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", { id : "home" });
			
			var oParams = {};
			oParams.fnSuccess = function(){console.log("Delete POT successful");};
			oParams.fnError = function(){console.log("POT Delete failed ");};
			oModel.remove("/AccountSet(POLID='" + POLIDQuery + "',AccountID='" + null + "',BPID='" + null + "',AccountType='" + null + "',ChangeStateID='" + ChangeStateIDQuery + "')" ,oParams);
			
			currentList.removeAllItems();
			offersList.removeAllItems();
			depositList.removeAllItems();
			loanList.removeAllItems();
			accSummary.removeAllItems();
			if(loanInfoList != undefined){
				loanInfoList.removeAllItems();
			}
			logoutDialog.close();
		}

});