jQuery.sap.require("sap.ui.base.Event");
sap.ui.controller("st4_poc.home", {


	accList : function(evt) {
		var view = this.getView();
		bpid = view.ipTxt.getValue();
		pwd = view.pwdTxt.getValue();
		if(bpid == ""){
			alert('Enter User');
		}
		else if(pwd == ""){
			alert('Enter Password');
		}
		else{
			var bus = sap.ui.getCore().getEventBus();
		
			bus.publish("nav", "to", {
				id : "test1",
				data : { bpid : bpid }
			});
		}
	},


});