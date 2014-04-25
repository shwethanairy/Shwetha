sap.ui.jsview("st4_poc.home", {

      getControllerName : function() {
         return "st4_poc.home";
      },

      createContent : function(oController) {
    	  	 jQuery.sap.includeStyleSheet("Style/style.css");
    	  	
    	  	 this.ipTxt = new sap.m.Input({ 
             	type: sap.m.InputType.Text,
            	placeholder: 'User',
            	maxlength: 10,
    	  	 });
    	  	 
    	  	 this.pwdTxt = new sap.m.Input({ 
              	type: sap.m.InputType.Password,
             	placeholder: 'Password',
             	maxlength: 10,
     	  	 });
    	  	 
    	  	 this.ipBtn = new sap.m.Button({
             	text: 'Login',
            	tap: [oController.accList , oController ]
            });
    	  	  	
             homePage = new sap.m.Page({ 
          	   title: "SAP" ,
          	   icon: "sap-icon://sap-logo-shape" ,
          	   content : [this.ipTxt, this.pwdTxt , this.ipBtn ] 
        	});
             return homePage ;
      }

});

