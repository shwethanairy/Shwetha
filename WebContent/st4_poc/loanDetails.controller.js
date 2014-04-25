sap.ui.controller("st4_poc.loanDetails", {


	 	backTriggered: function() {
	        var bus = sap.ui.getCore().getEventBus();
	        bus.publish("nav", "back");
	        
	        var oParams = {};
	        oParams.fnSuccess = function(){console.log("Delete POT successful");};
			oParams.fnError = function(){console.log("POT Delete failed ");};
			oModel.remove("/QuoteDataSet(POLID='" + polid + "',QuoteDataID='" + null + "',ChangeStateID='" + changestateid + "')" ,oParams); 
	    } ,
	    
	    
		onBeforeShow : function(evt) {
			
	    	  if ("to" === evt.direction) {
			  		view = this.getView();
			  		QuoteID = evt.data.data.QuoteID;
					busyDialog.open();	
					
					oModel.read('QuoteDataSet(QuoteDataID=' + "'" + QuoteID + "',ChangeStateID='" + null + "',POLID='" + null + "')", null, null, true, function(oData, oResponse){
				        view.amtLbl.setText(evt.data.data.QuoteAmount + " EUR");
				        view.termLbl.setText(evt.data.data.QuoteTerm + " months");
						view.int.setValue(oResponse.data.Interest + "%");
				        view.emi.setValue(oResponse.data.EMI );
				        
				        amt = parseFloat(evt.data.data.QuoteAmount);
				        term = parseFloat(evt.data.data.QuoteTerm);
				        
				        view.amtSlider.setMax(amt);
				        view.amtSlider.setValue(amt);
				        view.termSlider.setMax(term);
				        view.termSlider.setValue(term);
				        
				        polid = oResponse.data.POLID ;
				        changestateid = oResponse.data.ChangeStateID ;
				        				        
						oModel.read("AccountSet" + "?$filter=BPID eq '" + BPID + "'and ChangeStateID eq '" + null + "'and AccountID eq '" + null + "'and AccountType eq '" + "Current" + "'and POLID eq '" + evt.data.data.POLIDQuery + "'" , null, null, true, function(oData, oResponse){

								for ( var i = 0; i < oResponse.data.results.length; i++) { 
									selectTemplate = new sap.ui.core.Item();
									selectTemplate.setKey(oResponse.data.results[i].AccountID);
									selectTemplate.setText(oResponse.data.results[i].AccountID);
									disbSelect.addItem(selectTemplate);
								}
							
								busyDialog.close();
							},function(){
					    		console.log("Read disbursement accounts failed");
					    });    
				        				        
						 
				        
				      },function(){
				    	  console.log("Read quote data failed");
				    	  busyDialog.close(); 
				        });
				
				}
	
		} ,
		
		confirm : function(evt) {

			oModel.refreshSecurityToken();
			var oEntry = {};
			oEntry.POLID = polid ;
			oEntry.ChangeStateID = changestateid ;
			oEntry.CurrentAccount = selectTemplate.getKey(); 

			oModel.create("/LoanCreateSet", oEntry, null,   
					   function(oData, oResponse) {
							
							offersList.removeAllItems();
							
							var oParamsQuery = {};
							oParamsQuery.fnSuccess = function(){console.log("CO delete successful");};
							oParamsQuery.fnError = function(){console.log("CO delete failed");};
							oModel.remove("/AccountSet(POLID='" + POLIDQuery + "',AccountID='" + null + "',BPID='" + null + "',AccountType='" + null + "',ChangeStateID='" + ChangeStateIDQuery + "')" ,oParamsQuery);
							
				  			msg = oResponse.data.Message ;
				   			console.log("Loan Create successful");
				   			
						    var bus = sap.ui.getCore().getEventBus();
							bus.publish("nav", "to", {
								id : "test1",
								data : { 
									bpid : BPID,
								}
							});
							
				   			jQuery.sap.require("sap.m.MessageBox");
						    sap.m.MessageBox.show(
					        		  "Loan request will be processed , reference number : " + QuoteID,
							          "sap-icon://hint",
							          "Information",
							          [sap.m.MessageBox.Action.OK]
							        );
						  

		   				},  
				       function(oError) { 
				   			console.log("Loan Create failed");    
				            }
				   		);
		
		},
		
		amtChange : function(evt) {
        	newAmt = view.amtSlider.getValue();
        	term = view.termSlider.getValue();
        	view.amtLbl.setText(newAmt + " EUR");
        	
        	busyDialog.open();	
			oModel.read('NewQuoteDataSet(POLID=' + "'" + polid + "'" + ',ChangeStateID=' + "'" + changestateid + "'" + ',Term=' + "'" + term + "'" + ',Amount=' + "'" + newAmt + "'" + ')', null, null, true, function(oData, oResponse){
				view.int.setValue(oResponse.data.Interest + "%");
		        view.emi.setValue(oResponse.data.EMI );
		        busyDialog.close();
		        polid = oResponse.data.POLID ;
		        changestateid = oResponse.data.ChangeStateID ;
		        },function(){
		        	console.log("Read new quote data failed");
		        	busyDialog.close(); 
		        });
        	
		},
		
		termChange : function(evt) {
			newTerm = view.termSlider.getValue();
			amt = view.amtSlider.getValue();
        	view.termLbl.setText(newTerm + "  months");
       	
        	busyDialog.open();	
			oModel.read('NewQuoteDataSet(POLID=' + "'" + polid + "'" + ',ChangeStateID=' + "'" + changestateid + "'" + ',Term=' + "'" + newTerm + "'" + ',Amount=' + "'" + amt + "'" + ')', null, null, true, function(oData, oResponse){
				view.int.setValue(oResponse.data.Interest + "%");
		        view.emi.setValue(oResponse.data.EMI );
		        busyDialog.close();
		        polid = oResponse.data.POLID ;
		        changestateid = oResponse.data.ChangeStateID ;
		        },function(){
		        	console.log("Read new quote data failed");
		        	busyDialog.close(); 
		        });

		} ,
		
		logout : function(evt) {
			logoutDialog.open();
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", { id : "home" });
			
	        var oParams = {};
	        oParams.fnSuccess = function(){console.log("PALB Delete successful");};
			oParams.fnError = function(){console.log("PALB delete failed");};
			oModel.remove("/QuoteDataSet(POLID='" + polid + "',QuoteDataID='" + null + "',ChangeStateID='" + changestateid + "')" ,oParams);
			
			var oParamsQuery = {};
			oParamsQuery.fnSuccess = function(){console.log("CO delete successful");};
			oParamsQuery.fnError = function(){console.log("CO delete failed");};
			oModel.remove("/AccountSet(POLID='" + POLIDQuery + "',AccountID='" + null + "',BPID='" + null + "',AccountType='" + null + "',ChangeStateID='" + ChangeStateIDQuery + "')" ,oParamsQuery);
			
			currentList.removeAllItems();
			offersList.removeAllItems();
			depositList.removeAllItems();
			loanList.removeAllItems();
			if(accSummary != undefined) {
				accSummary.removeAllItems();
			}
			loanInfoList.removeAllItems();
			logoutDialog.close();
		}
		
  
	    
    

});