sap.ui.jsview("st4_poc.test1", {


	getControllerName : function() {
		return "st4_poc.test1";
	},

    
    onBeforeShow : function(evt) {
     	this.getController().onBeforeShow(evt);
    		},
    		
	createContent : function(oController) {
		

		
		loanList = new sap.m.List({  
				id: "loanList",
				mode: sap.m.ListMode.None
			});
	  	
	  	currentList = new sap.m.List({  
				id: "currentList",
				mode: sap.m.ListMode.None ,
				});
	  	
	  	depositList = new sap.m.List({  
				id: "depositList",
				mode: sap.m.ListMode.None
				});
	  	
	  	offersList = new sap.m.List({
	  		id: "offersList",
	  		mode: sap.m.ListMode.None,
	  	});
	  	
	  	
	  	
		tabBar = new sap.m.IconTabBar({
		      items: [
				new sap.m.IconTabFilter({
				       text: "Current",
				       content: [currentList],
				       key : "Current"
				}),
				new sap.m.IconTabFilter({
				       text: "Deposit",
				       content: [depositList],
				       key : "Deposit"
				}),
		        new sap.m.IconTabFilter({
		          text: "Loan",
		          content: [loanList],
		          key : "Loan"
		        }),
		        new sap.m.IconTabFilter({
			       text: "Offers",
			       content: [offersList],
			       key : "Offers"
			    })

		      ],
		      select: [oController.accountList , oController]
		    });
		
		
		
  		this.tabPage = new sap.m.Page("tabPage",{
	       	   icon: "sap-icon://role" ,
	       	   headerContent: [ new sap.m.Button({ icon: "sap-icon://log" , tap: [oController.logout , oController ]})],
	       	   content: [tabBar]

   		});
  		
  		return this.tabPage ;
		tabBar.placeAt('content');
	}

});