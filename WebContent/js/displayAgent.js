$(document).ready(function() {
	var data = sessionStorage.getItem("agentLogin");
	data = JSON.parse(data);
	if(data){
		var len = data.length;
		var txt = "";
		if(len > 0){
			for(var i=0;i<len;i++){
				if(data[i].FlightId){
					txt += "<tr><td>"+data[i].BookingId+"</td><td>"+data[i].Name+"</td>" +
					"<td>"+data[i].EmailId+"</td><td>"+data[i].DOB+"</td>" +
					"<td>"+data[i].PNumber+"</td><td>"+data[i].Address+"</td>" +
					"<td>"+data[i].FlightId+"</td>" +"</tr>";
				}
			}
			if(txt != ""){
				$("#agentDetails").append(txt);
			}
		}
	}
});