var labelsxml = new Array();
var forecastxml = new Array();
var salesxml = new Array();
var labelsjson = new Array();
var radiusjson = new Array();
var pieData = new Array();
var colors = new Array("red", "teal", "orange", "blue", "purple", "yellow", "green", "aqua");


	// load up values from XML
		$(document).on("pagecreate", "#charts", function() {
			console.log("in #charts");
			$.ajax({
				type: "GET",
				url: "chart.xml",
				dataType: "xml",
				success:loadChartData
			});
	$.getJSON("torontoWeather.json", function(data) {
		console.log(data);
	});		
		});


		function loadChartData(xml)
		{
			xx = 0;
			$("#linehead").html($(xml).find("title").text());
			$("#linelegend").html("<div style='background:rgba(220,0,0,0.5);'>Forecast</div>");
			$("#linelegend").append("<div style='background:rgba(0,220,0,0.5);'>Sales</div>");
			
			// load up forecast and sales arrays
			$(xml).find("month").each(function() {
				labelsxml[xx] = $(this).attr("name");
				forecastxml[xx] = parseInt($(this).find("forecast").text());
				salesxml[xx] = parseInt($(this).find("sales").text());
				
				xx++;
			});
			console.log(labelsxml);
		}	

		
// Line Chart		
$(document).on("pageshow", "#line", function() {
	// line chart your must have strokeColor and data
	var chartData = {
		labels : labelsxml,
		datasets: [
		{
			fillColor : "rgba(220,0,0,0.5)",	// red green blue transparency
			strokeColor : "rgba(255, 0, 0, 1)", 
			pointColor : "rgba(0, 255, 0, 1)",
			pointStrokeColor : "#fff",
			data : forecastxml
		},
		{
			fillColor : "rgba(0,220,0,0.5)",	// red green blue transparency
			strokeColor : "rgba(0, 255, 0, 1)", 
			pointColor : "rgba(255, 0, 0, 1)",
			pointStrokeColor : "#fff",
			data : salesxml			
		}
		]
	}
	
	cvs = document.getElementById("lineCanvas").getContext("2d");
	myChart = new Chart(cvs).Line(chartData);
});
//------------------ end of line ------------------

// Bar chart from XML file
$(document).on("pageshow", "#barxml", function() {
	// bar chart you need fillColor, strokeColor and data
	var chartData = {
		labels : labelsxml,
		datasets: [
		{
			fillColor : "rgba(220,0,0,0.5)",	// red green blue transparency
			strokeColor : "rgba(255, 0, 0, 1)", 
			data : forecastxml
		},
		{
			fillColor : "rgba(0,220,0,0.5)",	// red green blue transparency
			strokeColor : "rgba(0, 255, 0, 1)", 
			data : salesxml			
		}
		]
	}
	
	cvs = document.getElementById("barxmlCanvas").getContext("2d");
	myChart = new Chart(cvs).Bar(chartData);
			
			$("#legend").html("<p style='background:red;color:white;'>Forecast</p>" + 
												"<p style='background:green;color:white;'>Sales</p>");
});
//------------------ end of bar / xml ------------------

// Bar chart from JSON file
$(document).on("pageshow", "#barjson", function() {
	$.getJSON("planets_ints.json", function(data) {
		// load up planet radius array
		var start = data.solarSystem.planets;
		for (x=0; x < start.length; x++) {
			labelsjson[x] = start[x].planetName;
			radiusjson[x] = start[x].planetRadius;
		}
		
		// draw chart
	var chartData = {
		labels : labelsjson,
		datasets: [
		{
			fillColor : "rgba(220,0,0,0.5)",	// red green blue transparency
			strokeColor : "rgba(255, 0, 0, 1)", 
			data : radiusjson
		}
		]
	}
	
	cvs = document.getElementById("barjsonCanvas").getContext("2d");
	myChart = new Chart(cvs).Bar(chartData);		
	});
});
//------------------ end of bar / json ------------------

// Pie chart from JSON file
$(document).on("pageshow", "#pie", function() {
		// load radius array
	$.getJSON("planets_ints.json", function(data) {
		// load up planet radius array
		var start = data.solarSystem.planets;
		for (x=0; x < start.length; x++) {
			labelsjson[x] = start[x].planetName;
			radiusjson[x] = start[x].planetRadius;
		}		
		
		// draw chart
		var pieChart = [
		{label:labelsjson[0], value:radiusjson[0], color:colors[0]},
		{label:labelsjson[1], value:radiusjson[1], color:colors[1]},	
		{label:labelsjson[2], value:radiusjson[2], color:colors[2]},
		{label:labelsjson[3], value:radiusjson[3], color:colors[3]},
		{label:labelsjson[4], value:radiusjson[4], color:colors[4]},
		{label:labelsjson[5], value:radiusjson[5], color:colors[5]},
		{label:labelsjson[6], value:radiusjson[6], color:colors[6]},
		{label:labelsjson[7], value:radiusjson[7], color:colors[7]}
		];
	cvs = document.getElementById("pieCanvas").getContext("2d");
	myChart = new Chart(cvs).Pie(pieChart);			

		// chart legend
			$("#pieLegend").html(
				"<table>" + 
					"<tr><td>" + labelsjson[0] + "</td>" + "<td style='background:" + colors[0] + ";'>" + radiusjson[0] + "</td></tr>" +
					"<tr><td>" + labelsjson[1] + "</td>" + "<td style='background:" + colors[1] + ";'>" + radiusjson[1] + "</td></tr>" +
					"<tr><td>" + labelsjson[2] + "</td>" + "<td style='background:" + colors[2] + ";'>" + radiusjson[2] + "</td></tr>" +
					"<tr><td>" + labelsjson[3] + "</td>" + "<td style='background:" + colors[3] + ";'>" + radiusjson[3] + "</td></tr>" +
					"<tr><td>" + labelsjson[4] + "</td>" + "<td style='background:" + colors[4] + ";'>" + radiusjson[4] + "</td></tr>" +
					"<tr><td>" + labelsjson[5] + "</td>" + "<td style='background:" + colors[5] + ";'>" + radiusjson[5] + "</td></tr>" +
					"<tr><td>" + labelsjson[6] + "</td>" + "<td style='background:" + colors[6] + ";'>" + radiusjson[6] + "</td></tr>" +
					"<tr><td>" + labelsjson[7] + "</td>" + "<td style='background:" + colors[7] + ";'>" + radiusjson[7] + "</td></tr>" +
				"</table>");	
				
/* 
		// Earth to Mercury and Venus
		var pieChart = [
			{label : labelsjson[0],value : pieData[0],color : colors[0]},
			{label : labelsjson[1],value : pieData[1],color : colors[1]},
			{label : labelsjson[2],value : pieData[2],color : colors[2]} ]		

			cvs = document.getElementById("pieCanvas1").getContext('2d');
			myChart = new Chart(cvs).Pie(pieChart);	

			$("#pieLegend1").html(
				"<table><tr><td>" + labelsjson[0] + "</td>" +
							 "<td style='background:" + colors[0] + ";'>" + 
										pieData[0] + "</td></tr>" +
							"<tr><td>" + labelsjson[1] + "</td>" +
							 "<td style='background:" + colors[1] + ";'>" + 
										pieData[1] + "</td></tr>" +
							"<tr><td>" + labelsjson[2] + "</td>" +
							 "<td style='background:" + colors[2] + ";'>" + 
										pieData[2] + "</td></tr>" +
				"</tr></table>");	

		// Earth to Mars, Jupiter and Saturn
		var pieChart = [
			{label : labelsjson[2],value : pieData[2],color : colors[2]},
			{label : labelsjson[3],value : pieData[3],color : colors[0]},
			{label : labelsjson[4],value : pieData[4],color : colors[1]},		
			{label : labelsjson[5],value : pieData[5],color : colors[3]} ]
			
			cvs = document.getElementById("pieCanvas2").getContext('2d');
			myChart = new Chart(cvs).Pie(pieChart);	

			$("#pieLegend2").html(
				"<table><tr><td>" + labelsjson[2] + "</td>" +
							 "<td style='background:" + colors[2] + ";'>" + 
										pieData[2] + "</td></tr>" +
							"<tr><td>" + labelsjson[3] + "</td>" +
							 "<td style='background:" + colors[0] + ";'>" + 
										pieData[3] + "</td></tr>" +
							"<tr><td>" + labelsjson[4] + "</td>" +
							 "<td style='background:" + colors[1] + ";'>" + 
										pieData[4] + "</td></tr>" +
							"<tr><td>" + labelsjson[5] + "</td>" +
							 "<td style='background:" + colors[3] + ";'>" + 
										pieData[5] + "</td></tr>" +			
				"</tr></table>");

		// Earth to Uranus and Neptune
		var pieChart = [
			{label : labelsjson[2],value : pieData[2],color : colors[2]},
			{label : labelsjson[6],value : pieData[6],color : colors[0]},
			{label : labelsjson[7],value : pieData[7],color : colors[1]} ]
			
			cvs = document.getElementById("pieCanvas3").getContext('2d');
			myChart = new Chart(cvs).Pie(pieChart);	

			$("#pieLegend3").html(
				"<table><tr><td>" + labelsjson[2] + "</td>" +
							 "<td style='background:" + colors[2] + ";'>" + 
										pieData[2] + "</td></tr>" +
							"<tr><td>" + labelsjson[6] + "</td>" +
							 "<td style='background:" + colors[0] + ";'>" + 
										pieData[6] + "</td></tr>" +
							"<tr><td>" + labelsjson[7] + "</td>" +
							 "<td style='background:" + colors[1] + ";'>" + 
										pieData[7] + "</td></tr>" +	
				"</tr></table>");			*/	
	});
});
//------------------ end of pie / json ------------------


