var teams = [];

function addTeam() {
  var teamInput = document.getElementById("teamInput").value;
  teams.push(teamInput);
  displayTeams();
  document.getElementById("teamInput").value = "";
}

function displayTeams() {
  var teamsCont = document.getElementById("teams");

  teamsCont.innerHTML = "";

  for(var i = 0; i < teams.length; i++) {
    var newTeam = document.createElement("p");
    newTeam.textContent = teams[i];
    teamsCont.appendChild(newTeam);
  }
}

function relocateTeamsList() {
  var file = document.getElementById("quiz-selection").files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      sessionStorage.setItem("quizData", e.target.result);

      var url = "game/game.html?teams=" + encodeURIComponent(JSON.stringify(teams));

      window.location.href = url;
    };
    reader.readAsText(file);
  } else {
      alert("Choose a csv file.");
  }
}
