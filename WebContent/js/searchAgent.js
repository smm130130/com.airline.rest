/**
 * js file for post.html
 * Please use modern web browser as this file will not attempt to be
 * compatible with older browsers. Use Chrome and open javascript console
 * or Firefox with developer console.
 * 
 * jquery is required
 */
$(document).ready(function() {
	//console.log("ready");
	//var $post_example = $('#search');

	/**
	 * This is for the Submit button
	 * It will trigger a ajax POST call to: api/v2/inventory
	 * This will submit a item entry to our inventory database
	 */
	$('#login').live('click',(function(e) {
		//console.log("submit button has been clicked");
		e.preventDefault(); //cancel form submit
		
			
		//var jsObj = $post_example.serializeObject()
		//, ajaxObj = {};

		//console.log(jsObj);
		var username = $("#username").val();
		var pwd = $("#pwd").val();
		
		var jsObj = {"username":username,
					 "pwd":pwd};

		var isValSearch = isValidSearch(username,pwd);
		if(isValSearch == 1){
			ajaxObj = {  
					type: "POST",
					//url: "http://localhost:8080/com.airline.rest/api/v1/search/", 
					url: "https://localhost:8443/com.airline.rest/api/v1/agentLogin/",
					data: JSON.stringify(jsObj), 
					contentType:"application/json",
					error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				//console.log(data);
				if(data != ""){
					//alert("data is :"+data);
					var len = data.length;
					var txt = "";
					if(len > 0){
						if (typeof(Storage) != "undefined"){
							sessionStorage.setItem("agentLogin",JSON.stringify(data));
						}
						window.location.assign("displayAgent.html");
					}
				} else {
					window.location.assign("NoTickets.html");
				}
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
			};

			$.ajax(ajaxObj);
		}
	}));
});