sap.ui.jsview("st4_poc.loanDetails", {

      getControllerName : function() {
         return "st4_poc.loanDetails";
      },
      
      onBeforeShow : function(evt) {
      	  this.getController().onBeforeShow(evt);
      },

      createContent : function(oController) {
    	  jQuery.sap.includeStyleSheet("Style/style.css");
    	  
		
      this.int = new sap.m.DisplayListItem({label: "Interest"});
	  this.emi = new sap.m.DisplayListItem({label: "Installment"});
	  this.amtLbl = new sap.m.Label();
	  this.termLbl = new sap.m.Label();
	   
	  this.amtSlider = new sap.m.Slider({
          min: 1,
          step : 1000 ,
          width: "200px",
        change : [oController.amtChange, oController]
        }).addStyleClass("slider");
	  		  
	  this.termSlider = new sap.m.Slider({
          min: 1,
          width: "200px",
        change : [oController.termChange, oController]
        }).addStyleClass("slider") ;
	  
	  disbSelect = new sap.m.Select();
	  
   	  loanInfoList = new sap.m.List({
	        headerText: "Offer details" ,
	        items: [ new sap.m.InputListItem({
	            		label: "Amount",
	            		content: [this.amtLbl , this.amtSlider ]
	          			}),
	          			
	          		new sap.m.InputListItem({
	          			label: "Term",
	          			content: [ this.termLbl , this.termSlider]
	          			}),
		          
	          		this.int , this.emi , 
		           
	          		new sap.m.InputListItem({
	          			label: "Disbursement Account",
	          			content: [disbSelect]
	          			})
		          ]
	      });
	      
	  acceptBtn = new sap.m.Button({
  	  				text:"Accept" , 
  	  				press: [oController.confirm, oController] 
  	  	});
  	  	  			
  	  this.loanDetailsPage = new sap.m.Page("loanDetailsPage",{
  	       	   //icon: "Images/sap-logo.png" ,
  	       	   title: "SAP" ,
  	       	   headerContent: [ new sap.m.Button({ icon: "sap-icon://log" , tap: [oController.logout , oController ]})],
  	       	   showNavButton:true,
  	       	   navButtonText: "Back",
  	       	   navButtonTap:[oController.backTriggered,oController] ,
  	       	   content : [loanInfoList ],
  	       	   footer: new sap.m.Bar({ contentRight: [acceptBtn ]})

  	  	});

  	   return this.loanDetailsPage ;
      }

});