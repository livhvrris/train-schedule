// Initialize Firebase
var config = {
    apiKey: "AIzaSyAHLkS8YLhqEQ239OYYe80T9N5hY_nPN5c",
    authDomain: "train-schedule-e6821.firebaseapp.com",
    databaseURL: "https://train-schedule-e6821.firebaseio.com",
    storageBucket: "train-schedule-e6821.appspot.com",
    messagingSenderId: "69924260922"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function() {

	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#trainDestination").val().trim();
	var trainTime = $("#trainTime").val().trim();
	var trainDeparture = $("#trainDeparture").val().trim();

	database.ref().push({
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		departure: trainDeparture
	});

	return false;

});

database.ref().on("child_added", function(snapshot){

	var addedName = snapshot.child("name").val();
	var addedDestination = snapshot.child("destination").val();
	var addedTime = snapshot.child("time").val();
	var addedDeparture = snapshot.child("departure").val();
	var calculatedArrival = 0;
	var calculatedMinutesAway = 0;

	var trainEntry = 
		"<tr>" + 
		"<td class='nameCell'>" + addedName + "</td>" +
		"<td class='destinationCell'>" + addedDestination + "</td>" +
		"<td class='departureCell'>Every " + addedDeparture + " min. </td>" +
		"<td class='timeCell'>" + calculatedArrival + "</td>" +
		"<td class='timeCell'>" + calculatedMinutesAway + "</td>" +
		"</tr>"

	$("#trainTable").append(trainEntry);

}, 

function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});
