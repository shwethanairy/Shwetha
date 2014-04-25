sap.ui.controller("st4_poc.test1", {

	 backTriggered: function() {
	        var bus = sap.ui.getCore().getEventBus();
	        bus.publish("nav", "back");
	    } ,
	    
	      onBeforeShow : function(evt) {
	    	  if ("to" === evt.direction) {
		  		BPID = evt.data.data.bpid;
		  		view = this.getView();
		  		
		  		if(true === evt.firstTime){
		  			busyDialog.open();	
		  			oModel.read("AccountSet" + "?$filter=BPID eq '" + BPID + "'and ChangeStateID eq '" + null + "'and AccountID eq '" + null + "'and AccountType eq '" + "Current" + "'and POLID eq '" + null + "'" , null, null, true, function(oData, oResponse){
		  				view.tabPage.setTitle("Welcome " + oResponse.data.results[0].BPName );
		  				POLIDQuery = oResponse.data.results[0].POLID ;
		  				ChangeStateIDQuery = oResponse.data.results[0].ChangeStateID ;
		  				for ( var i = 0; i < oResponse.data.results.length; i++) { 
		  					var currListTemplate = new sap.m.StandardListItem({
		  						type : sap.m.ListType.Navigation ,
		  						tap : function(evt){
		  							var bus = sap.ui.getCore().getEventBus();
		  							bus.publish("nav", "to", {
		  								id : "accountData",
		  								data : {
		  									POLID : POLIDQuery ,
		  									AccType : "Current" ,
		  									AccID : evt.oSource.getTitle()
		  								}
		  							});
		  						}
							});
						currListTemplate.setTitle(oResponse.data.results[i].AccountID);
						currListTemplate.setDescription(oResponse.data.results[i].AccountBalance);
						currentList.addItem(currListTemplate);
					}
					busyDialog.close();
			    	},function(){
			    	view.tabPage.setTitle("Welcome");
			    	busyDialog.close();
			        console.log("CO query create failed");
			    	});
		  		}
		  		else {
		  			busyDialog.open();
					oModel.read("AccountSet" + "?$filter=BPID eq '" + BPID + "'and ChangeStateID eq '" + null + "'and AccountID eq '" + null + "'and AccountType eq '" + "Offers" + "'and POLID eq '" + null + "'" , null, null, true, function(oData, oResponse){
						POLIDQuery = oResponse.data.results[0].POLID ;
						ChangeStateIDQuery = oResponse.data.results[0].ChangeStateID ;
						for (var i = 0; i < oResponse.data.results.length; i++) {
							var offerListTemplate = new sap.m.StandardListItem({
									type : sap.m.ListType.Navigation ,
									tap : function(evt){
										var bus = sap.ui.getCore().getEventBus();
										var itemId = evt.oSource.getId().split("m");
										itemNo = itemId[1]-2;
										QuoteID = QuoteData[itemNo].ID ;
										QuoteAmount = QuoteData[itemNo].Amount ;
										QuoteTerm = QuoteData[itemNo].Term ;
										bus.publish("nav", "to", {
											id : "loanDetails",
											data : { 	QuoteID : QuoteID,
												 		QuoteAmount : QuoteAmount ,
												 		QuoteTerm : QuoteTerm ,
												 		POLIDQuery : POLIDQuery
										}
										
								});
								}
							});	
						offerListTemplate.setTitle(oResponse.data.results[i].QuoteDescription );
						offersList.addItem(offerListTemplate);
						QuoteObject = {};
						QuoteObject.ID = oResponse.data.results[i].QuoteID;
						QuoteObject.Amount = oResponse.data.results[i].QuoteAmount;
						QuoteObject.Term = oResponse.data.results[i].QuoteTerm ;
						QuoteData[i] = QuoteObject ;
						
						}
						busyDialog.close();
				    	},function(){
				    	view.tabPage.setTitle("Welcome");
				    	busyDialog.close();
				        console.log("CO query create offers failed");
				    	});
		  		}
	      }
		}  ,
		
		accountList : function(evt) {
			sKey = evt.oSource.oSelectedItem.getKey() ;
			QuoteData = [];
	
			if(sKey == 'Offers' && offersList.getItems().length != 0 ) {}
			else if (sKey == 'Deposit' && depositList.getItems().length != 0) {}
			else if(sKey == 'Loan' && loanList.getItems().length != 0) {}
			else if(sKey == 'Current' && currentList.getItems().length != 0) {}
			else {
			busyDialog.open();	
			oModel.read("AccountSet" + "?$filter=BPID eq '" + BPID + "'and ChangeStateID eq '" + null +  "'and AccountID eq '" + null + "'and AccountType eq '" + sKey + "'and POLID eq '" + POLIDQuery + "'" , null, null, true, function(oData, oResponse){
				if (sKey == 'Offers') {
					for (var i = 0; i < oResponse.data.results.length; i++) {
						var offerListTemplate = new sap.m.StandardListItem({
								type : sap.m.ListType.Navigation ,
								tap : function(evt){
									var bus = sap.ui.getCore().getEventBus();
									var itemId = evt.oSource.getId().split("m");
									itemNo = itemId[1]-2;
									QuoteID = QuoteData[itemNo].ID ;
									QuoteAmount = QuoteData[itemNo].Amount ;
									QuoteTerm = QuoteData[itemNo].Term ;
									bus.publish("nav", "to", {
										id : "loanDetails",
										data : { 	QuoteID : QuoteID,
											 		QuoteAmount : QuoteAmount ,
											 		QuoteTerm : QuoteTerm ,
											 		POLIDQuery : POLIDQuery
									}
									
							});
							}
						});	
					offerListTemplate.setTitle(oResponse.data.results[i].QuoteDescription );
					offersList.addItem(offerListTemplate);
					QuoteObject = {};
					QuoteObject.ID = oResponse.data.results[i].QuoteID;
					QuoteObject.Amount = oResponse.data.results[i].QuoteAmount;
					QuoteObject.Term = oResponse.data.results[i].QuoteTerm ;
					QuoteData[i] = QuoteObject ;
					
					}
				}
				else {
					for ( var i = 0; i < oResponse.data.results.length; i++) { 
					var listTemplate = new sap.m.StandardListItem({
						type : sap.m.ListType.Navigation ,
						tap : function(evt){
					    	var bus = sap.ui.getCore().getEventBus();
							bus.publish("nav", "to", {
								id : "accountData",
								data : {
									POLID : POLIDQuery ,
									AccType : sKey ,
									AccID : evt.oSource.getTitle()
								}
							});
						}
						});
					listTemplate.setTitle(oResponse.data.results[i].AccountID);
					listTemplate.setDescription(oResponse.data.results[i].AccountBalance);
					
					if (sKey == 'Deposit') {
						depositList.addItem(listTemplate);
					}else if (sKey == 'Loan') {
						loanList.addItem(listTemplate);
					}
			
				  }
				}
				busyDialog.close();
		    	},function(){
		    		busyDialog.close();
		    		alert("Read failed");
		    });
	     }
		} ,
		
	    
	    offers : function(evt) {
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
				id : "preApprovedLoan"
			});
		},
	    
		currAccData : function(accId) {

		},
		
	    preapploan : function(evt) {
			var bus = sap.ui.getCore().getEventBus();
			QuoteID = '50002568' ;
			bus.publish("nav", "to", {
				id : "loanDetails",
					data : { QuoteID : QuoteID,
					}
					
			});
		},
		
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
			if(accSummary != undefined) {
				accSummary.removeAllItems();
			}
			if(loanInfoList != undefined){
				loanInfoList.removeAllItems();
			}
			
			logoutDialog.close();
	
		}

});