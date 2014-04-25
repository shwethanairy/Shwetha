sap.ui.jsview("st4_poc.accountData", {

      getControllerName : function() {
         return "st4_poc.accountData";
      },
      
      onBeforeShow : function(evt) {
       	this.getController().onBeforeShow(evt);
      },

      createContent : function(oController) {
    	  
    	  accSummary = new sap.m.Table({
    	      headerText: "Transaction History",
    	      columns: [
    	        new sap.m.Column({
    	          header: new sap.m.Label({text: "Date"}),
    	          hAlign: "Center"
    	        }),
    	        new sap.m.Column({
    	          header: new sap.m.Label({text: "Description"}),
    	          hAlign: "Left"
    	        }),
    	        new sap.m.Column({
      	          header: new sap.m.Label({text: "Debit/Credit"}),
      	          hAlign: "Left"
      	        }),
    	        new sap.m.Column({
    	          header: new sap.m.Label({text: "Amount"}),
    	          hAlign: "Right"
    	        })
    	      ]
    	      });
   	      
    	accountDataPage = new sap.m.Page("accountDataPage",{ 
       	   			title: "SAP" ,
       	   			icon: "Images/sap-logo.png" ,
       	   			headerContent: [ new sap.m.Button({ icon: "sap-icon://log" , tap: [oController.logout , oController ]})],
       	   			content : [accSummary] ,
       	   			showNavButton:true,
       	   			navButtonText: "Back",
       	   			navButtonTap:[oController.backTriggered,oController] ,
     	});
          return accountDataPage ;
      }

});