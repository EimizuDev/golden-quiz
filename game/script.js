// Elements
var teamsCont = document.getElementById("teams-cont");
var categoryNamesCont = document.getElementById("category-names-cont-1");
var categoryVariantsCont = document.getElementById("category-variants-cont-1");
var question1 = document.getElementById("question-1");
var answer11 = document.getElementById("answer-1-1");
var answer21 = document.getElementById("answer-2-1");
var answer31 = document.getElementById("answer-3-1");
var answer41 = document.getElementById("answer-4-1");
var answer1Fill1 = answer11.querySelector(".answer-fill-1");
var answer2Fill1 = answer21.querySelector(".answer-fill-1");
var answer3Fill1 = answer31.querySelector(".answer-fill-1");
var answer4Fill1 = answer41.querySelector(".answer-fill-1");
var quiz1Div = document.getElementById("quiz-1");
var blur = document.getElementById("blur");
var teamAnsweringFill = document.getElementById("team-answering-fill");
var leaderboardDiv = document.getElementById("leaderboard");
var leaderboardTeams = document.getElementById("leaderboard-teams");
var teamAnswering = document.getElementById("team-answering");
var categoryCont = document.getElementById("category-cont-1");
var pointsAlign = document.getElementById("points-align");
var categoryBorder = document.getElementById("category-border");
var quiz2Div = document.getElementById("quiz-2");
var categoryFill = document.getElementById("category-fill");
var btnCont = document.getElementById("btn-cont");
var timerVariantCont = document.getElementById("timer-variant-cont");
var questionFill2 = document.getElementById("question-fill-2");
var answer12 = document.getElementById("answer-1-2");
var answer22 = document.getElementById("answer-2-2");
var answer1Fill2 = answer12.querySelector(".answer-fill-2");
var answer2Fill2 = answer22.querySelector(".answer-fill-2");
var variantFill = document.getElementById("variant-fill");
var pointsCont = document.getElementById("points-cont");
var quiz3Div = document.getElementById("quiz-3");
var answerClue1 = document.getElementById("answer-clue-1");
var answerClue2 = document.getElementById("answer-clue-2");
var answerClue3 = document.getElementById("answer-clue-3");
var answerClue4 = document.getElementById("answer-clue-4");
var answerFill3 = document.querySelector(".answer-fill-3");

// Integers
var teamAmount = 0;
var matchTimer = 15;
var matchTimerReset1 = 15;
var matchTimerReset2 = 60;
var teamsPlayedAmount = 0;
var gamesPlayed = 0;
var currentCategoryID;
var match = 0;
var matchAmount = 0;
var game1Match = 1;
var game1MaxMatch = 3;

// Booleans
var canCallPoints = true;
var bAnswer1 = false;
var bAnswer2 = false;
var bAnswer3 = false;
var bAnswer4 = false;

// Arrays
var usedCategories = [];

// Other
var timerInterval;
var quizData = sessionStorage.getItem("quizData");

function quiz1(categoryName, categoryQuestion1, categoryQuestion2, categoryQuestion3, category1Answer1, category1Answer2, category1Answer3, category1Answer4, category2Answer1, category2Answer2, category2Answer3, category2Answer4, category3Answer1, category3Answer2, category3Answer3, category3Answer4, category1Answer, category2Answer, category3Answer) {
  this.categoryName = categoryName;
  this.categoryQuestion1 = categoryQuestion1;
  this.categoryQuestion2 = categoryQuestion2;
  this.categoryQuestion3 = categoryQuestion3;
  this.category1Answer1 = category1Answer1;
  this.category1Answer2 = category1Answer2;
  this.category1Answer3 = category1Answer3;
  this.category1Answer4 = category1Answer4;
  this.category2Answer1 = category2Answer1;
  this.category2Answer2 = category2Answer2;
  this.category2Answer3 = category2Answer3;
  this.category2Answer4 = category2Answer4;
  this.category3Answer1 = category3Answer1;
  this.category3Answer2 = category3Answer2;
  this.category3Answer3 = category3Answer3;
  this.category3Answer4 = category3Answer4;
  this.category1Answer = category1Answer;
  this.category2Answer = category2Answer;
  this.category3Answer = category3Answer;
}

function quiz2(categoryName, question, answers, variants, answerText1, answerText2) {
  this.categoryName = categoryName;
  this.question = question;
  this.answers = answers;
  this.variants = variants;
  this.answerText1 = answerText1;
  this.answerText2 = answerText2;
}

function quiz3(answer1, answer2, answer3, answer4, clue1, clue2, clue3, clue4) {
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.answer4 = answer4;
  this.clue1 = clue1;
  this.clue2 = clue2;
  this.clue3 = clue3;
  this.clue4 = clue4;
}

let quizzes1 = [];

let quizzes2 = [];

let quizzes3 = [];

if (quizData) {
  Papa.parse(quizData, {
    header: false,
    skipEmptyLines: true,
    complete: function(results) {
      var parsedQuizData = results.data;

      parsedQuizData.forEach((row, index) => {
        if (index === 0 || index === 9 || index === 18) {
          return;
        }

        if (index >= 1 && index <= 8) {
          quizzes1.push(new quiz1(
              row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18]
          ));
        }

        if (index >= 10 && index <= 17) {
          let answersRow = row.slice(2, 22);
          let variantsRow = row.slice(22, 42);
          quizzes2.push(new quiz2(
              row[0], row[1], answersRow, variantsRow, row[42], row[43]
          ));
        }

        if (index >= 19 && index <= 26) {
          quizzes3.push(new quiz3(
              row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]
          ));
        }
      });
    }
  });
}

{ // teamAdd
  var url = window.location.search;
  var urlParams = new URLSearchParams(url);
  var teamNames = urlParams.get("teams");
  teamNames = teamNames ? JSON.parse(decodeURIComponent(teamNames)) : [];

  teamAmount = teamNames.length;

  for(var i = 0; i < teamAmount; i++) {
    var team = document.createElement("div");
    team.className = "team";

    var teamFill = document.createElement("div");
    teamFill.className = "team-fill";

    var teamName = document.createElement("p");
    teamName.textContent = teamNames[i];

    var teamPoints = document.createElement("h5");
    teamPoints.textContent = 0;

    teamFill.appendChild(teamName);
    teamFill.appendChild(teamPoints);
    team.appendChild(teamFill);
    teamsCont.appendChild(team);

    team.style.top = 78 * i + "px";

    team.addEventListener("mousedown", function(event) {
      if (event.button == 1 || event.buttons == 4) {
        var teamPointsParse = parseInt(this.querySelector("h5").textContent);
        this.querySelector("h5").textContent = "";
        this.querySelector("h5").textContent = teamPointsParse - 1;

        rearrangeTeams();
      } else {
        var teamPointsParse = parseInt(this.querySelector("h5").textContent);
        this.querySelector("h5").textContent = "";
        this.querySelector("h5").textContent = teamPointsParse + 1;

        rearrangeTeams();
      }
    });


    var leaderboardTeam = document.createElement("div");
    leaderboardTeam.className = "leaderboard-team";

    var leaderboardTeamFill = document.createElement("div");
    leaderboardTeamFill.className = "leaderboard-team-fill";

    var leaderboardTeamName = document.createElement("h4");
    leaderboardTeamName.textContent = teamNames[i];

    var leaderboardTeamPoints = document.createElement("h3");
    leaderboardTeamPoints.textContent = 0;

    leaderboardTeams.appendChild(leaderboardTeam);
    leaderboardTeam.appendChild(leaderboardTeamFill);
    leaderboardTeamFill.appendChild(leaderboardTeamName);
    leaderboardTeamFill.appendChild(leaderboardTeamPoints);

    rearrangeLeaderboard();
  }
}

{ // CategoriesAdd1
  for(var i = 0; i < quizzes1.length; i++) {
    var categoryName = document.createElement("div");
    categoryName.className = "category-name-1";

    var categoryNameFill = document.createElement("div");
    categoryNameFill.className = "category-name-fill-1";
    categoryNameFill.textContent = quizzes1[i].categoryName;

    categoryNamesCont.appendChild(categoryName);
    categoryName.appendChild(categoryNameFill);

    var categoryVariantCont = document.createElement("div");
    categoryVariantCont.style.display = "flex";

    categoryVariantsCont.appendChild(categoryVariantCont);

    for(var o = 1; o <= 3; o++) {
      var categoryVariant = document.createElement("div");
      categoryVariant.className = "category-variant-1";
      categoryVariant.setAttribute("category-number", i);
      categoryVariant.setAttribute("variant-number", o);

      var categoryVariantFill = document.createElement("div");
      categoryVariantFill.className = "category-variant-fill-1";
      categoryVariantFill.textContent = o;

      categoryVariantCont.appendChild(categoryVariant);
      categoryVariant.appendChild(categoryVariantFill);

      categoryVariant.addEventListener("click", chooseCategory);
    }
  }
}

{ // CategoryAdd2
  for(var i = 0; i < quizzes2.length; i++) {
    var categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    categoryDiv.textContent = quizzes2[i].categoryName;
    categoryDiv.id = i;

    categoryFill.appendChild(categoryDiv);

    categoryDiv.addEventListener("click", function() {
      if(!usedCategories.includes(this.id)) {
        currentCategoryID = this.id;

        categoryBorder.style.transform = "translate(-50%, 1000%)";
        blur.style.display = "none";
        quiz2Div.style.display = "flex";
        teamsCont.style.display = "flex";

        questionFill2.textContent = quizzes2[currentCategoryID].question;
        answer1Fill2.textContent = quizzes2[currentCategoryID].answerText1;
        answer2Fill2.textContent = quizzes2[currentCategoryID].answerText2;

        window.addEventListener("keydown", changeCategory);

        updateVariants();

        window.addEventListener("keydown", startMatch);

        answer12.addEventListener("click", answer12Check = function() {
          if(canCallPoints) {
            if(answer12.getAttribute("data-boolean") === "true") {
              var newPoint = document.createElement("div");
              newPoint.className = "point-border";
              newPoint.setAttribute("data-boolean", "false");

              var newPointFill = document.createElement("div");
              newPointFill.className = "point-fill";
              newPointFill.style.background = "#001E27";

              newPoint.appendChild(newPointFill);
              pointsCont.appendChild(newPoint);

              match++;

              if(match == 20) {
                matchEndCheck(0);
              } else {
                updateVariants();
              }

              pointsUpdate();

              answer12.style.borderBottom = "8px #006700 solid";
              answer12.style.borderRight = "3px #006700 solid";
              answer1Fill2.style.backgroundColor = "#00C700";
              answer1Fill2.style.borderLeft = "solid 5px #00AB00";
              answer1Fill2.style.borderTop = "solid 7px #00AB00";

              canCallPoints = false;
              setTimeout(() => {
                answer12.style.borderBottom = "8px black solid";
                answer12.style.borderRight = "3px black solid";
                answer1Fill2.style.backgroundColor = "#001E27";
                answer1Fill2.style.borderLeft = "solid 5px black";
                answer1Fill2.style.borderTop = "solid 7px black";

                canCallPoints = true;
              }, 500);
            } else {
              var pointElements = document.querySelectorAll(".point-border");

              for (var i = pointElements.length - 1; i >= 0; i--) {
                if (pointElements[i].getAttribute("data-boolean") === "false") {
                  pointsCont.removeChild(pointElements[i]);
                }
              }

              match++;

              if(match == 20) {
                matchEndCheck(0);
              } else {
                updateVariants();
              }

              answer12.style.borderBottom = "8px #670000 solid";
              answer12.style.borderRight = "3px #670000 solid";
              answer1Fill2.style.backgroundColor = "#C70000";
              answer1Fill2.style.borderLeft = "solid 5px #AB0000";
              answer1Fill2.style.borderTop = "solid 7px #AB0000";

              canCallPoints = false;
              setTimeout(() => {
                answer12.style.borderBottom = "8px black solid";
                answer12.style.borderRight = "3px black solid";
                answer1Fill2.style.backgroundColor = "#001E27";
                answer1Fill2.style.borderLeft = "solid 5px black";
                answer1Fill2.style.borderTop = "solid 7px black";

                canCallPoints = true;
              }, 500);
            }
          }
        });

        answer22.addEventListener("click", answer22Check = function() {
          if(canCallPoints) {
            if(answer22.getAttribute("data-boolean") === "true") {
              var newPoint = document.createElement("div");
              newPoint.className = "point-border";
              newPoint.setAttribute("data-boolean", "false");

              var newPointFill = document.createElement("div");
              newPointFill.className = "point-fill";
              newPointFill.style.background = "#001E27";

              newPoint.appendChild(newPointFill);
              pointsCont.appendChild(newPoint);

              match++;

              if(match == 20) {
                matchEndCheck(0);
              } else {
                updateVariants();
              }

              pointsUpdate();

              answer22.style.borderBottom = "8px #006700 solid";
              answer22.style.borderLeft = "3px #006700 solid";
              answer2Fill2.style.backgroundColor = "#00C700";
              answer2Fill2.style.borderRight = "solid 5px #00AB00";
              answer2Fill2.style.borderTop = "solid 7px #00AB00";

              canCallPoints = false;
              setTimeout(() => {
                answer22.style.borderBottom = "8px black solid";
                answer22.style.borderLeft = "3px black solid";
                answer2Fill2.style.backgroundColor = "#001E27";
                answer2Fill2.style.borderRight = "solid 5px black";
                answer2Fill2.style.borderTop = "solid 7px black";

                canCallPoints = true;
              }, 500);
            } else {
              var pointElements = document.querySelectorAll(".point-border");

              for (var i = pointElements.length - 1; i >= 0; i--) {
                if (pointElements[i].getAttribute("data-boolean") === "false") {
                  pointsCont.removeChild(pointElements[i]);
                }
              }

              match++;

              if(match == 20) {
                matchEndCheck(0);
              } else {
                updateVariants();
              }

              answer22.style.borderBottom = "8px #670000 solid";
              answer22.style.borderLeft = "3px #670000 solid";
              answer2Fill2.style.backgroundColor = "#C70000";
              answer2Fill2.style.borderRight = "solid 5px #AB0000";
              answer2Fill2.style.borderTop = "solid 7px #AB0000";

              canCallPoints = false;
              setTimeout(() => {
                answer22.style.borderBottom = "8px black solid";
                answer22.style.borderLeft = "3px black solid";
                answer2Fill2.style.backgroundColor = "#001E27";
                answer2Fill2.style.borderRight = "solid 5px black";
                answer2Fill2.style.borderTop = "solid 7px black";

                canCallPoints = true;
              }, 500);
            }
          }
        });
      }
    });
  }
}

{ // Quiz3
  matchAmount = quizzes3.length;

  answerClue1.textContent = quizzes3[0].clue1;
  answerClue2.textContent = quizzes3[0].clue2;
  answerClue3.textContent = quizzes3[0].clue3;
  answerClue4.textContent = quizzes3[0].clue4;
}

function pointsUpdate() {
  var pointElements = document.querySelectorAll(".point-border");
  var amountOfPoints = document.getElementById("points-counter");
  var pointsCounterCont = document.getElementById("points-counter-cont");

  var countOfFalse = 0;

  for (var i = 0; i < pointElements.length; i++) {
    if (pointElements[i].getAttribute("data-boolean") === "false") {
      countOfFalse++;
    }
  }

  if(countOfFalse == 3) {
    for (var i = 0; i < pointElements.length; i++) {
      if (pointElements[i].getAttribute("data-boolean") === "false") {
        pointElements[i].setAttribute("data-boolean", "true");
        pointElements[i].querySelector(".point-fill").style.background = "linear-gradient(350deg, #FFEA87, #D9A73B)";
      }
    }

    var currentPointNumbers = parseInt(amountOfPoints.textContent);

    if(currentPointNumbers + 3 > 9) {
      pointsCounterCont.style.transform = "translateX(-12%)";
    } else {
      pointsCounterCont.style.transform = "translateX(15%)";
    }

    amountOfPoints.textContent = "";
    amountOfPoints.textContent = currentPointNumbers + 3;

    countOfFalse = 0;

    amountOfPoints.style.display = amountOfPoints.textContent > 0 ? "block" : "none";
  }
}

function updateVariants() {
  variantFill.textContent = quizzes2[currentCategoryID].variants[match];

  answer12.setAttribute("data-boolean", "false");
  answer22.setAttribute("data-boolean", "false");

  if(quizzes2[currentCategoryID].answers[match] == "1") {
    answer12.setAttribute("data-boolean", "true");
  } else if(quizzes2[currentCategoryID].answers[match] == "2") {
    answer22.setAttribute("data-boolean", "true");
  }
}

function changeCategory(evt) {
  if(evt.keyCode == "8") {
    window.removeEventListener("keydown", startMatch);
    window.removeEventListener("keydown", changeCategory);
    answer12.removeEventListener("click", answer12Check);
    answer22.removeEventListener("click", answer22Check);

    var teamElements = document.querySelectorAll(".team");
    var selectedTeam = teamElements[teamsPlayedAmount];
    var selectedTeamPoints = selectedTeam.querySelector("h5");

    var currentTeamPoints = parseInt(selectedTeamPoints.textContent);

    selectedTeamPoints.textContent = "";
    selectedTeamPoints.textContent += currentTeamPoints - 2;

    rearrangeTeams();

    categoryBorder.style.transform = "translate(-50%, -50%)";
    blur.style.display = "block";
    teamsCont.style.display = "none";
    quiz2Div.style.display = "none";
  }
}

function startMatch(evt) {
  if(evt.keyCode == "13") {
    window.removeEventListener("keydown", startMatch);
    window.removeEventListener("keydown", changeCategory);

    answer12.addEventListener("click", answer12Check);
    answer22.addEventListener("click", answer22Check);

    btnCont.style.display = "flex";
    timerVariantCont.style.display = "flex";

    timerInterval = setInterval(function() {
      document.getElementById("match-timer-fill-2").textContent = matchTimer;

      matchTimer--;

      if(matchTimer < 0) {
        matchEndCheck(0);
      }
    }, 1000);
  }
}

function chooseCategory() {
  var chosenCategoryVariant = this;

  this.removeEventListener("click", chooseCategory);
  chosenCategoryVariant.style.opacity = "0.2";

  if(this.getAttribute("variant-number") === "1") {
    question1.textContent = quizzes1[this.getAttribute("category-number")].categoryQuestion1;

    answer1Fill1.textContent = quizzes1[this.getAttribute("category-number")].category1Answer1;
    answer2Fill1.textContent = quizzes1[this.getAttribute("category-number")].category1Answer2;
    answer3Fill1.textContent = quizzes1[this.getAttribute("category-number")].category1Answer3;
    answer4Fill1.textContent = quizzes1[this.getAttribute("category-number")].category1Answer4;

    if(quizzes1[this.getAttribute("category-number")].category1Answer === "1") {
      answer11.setAttribute("data-boolean", "true");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category1Answer === "2") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "true");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category1Answer === "3") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "true");
      answer41.setAttribute("data-boolean", "false");
    } else {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "true");
    }
  } else if(this.getAttribute("variant-number") === "2") {
    question1.textContent = quizzes1[this.getAttribute("category-number")].categoryQuestion2;

    answer1Fill1.textContent = quizzes1[this.getAttribute("category-number")].category2Answer1;
    answer2Fill1.textContent = quizzes1[this.getAttribute("category-number")].category2Answer2;
    answer3Fill1.textContent = quizzes1[this.getAttribute("category-number")].category2Answer3;
    answer4Fill1.textContent = quizzes1[this.getAttribute("category-number")].category2Answer4;

    if(quizzes1[this.getAttribute("category-number")].category2Answer === "1") {
      answer11.setAttribute("data-boolean", "true");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category2Answer === "2") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "true");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category2Answer === "3") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "true");
      answer41.setAttribute("data-boolean", "false");
    } else {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "true");
    }
  } else {
    question1.textContent = quizzes1[this.getAttribute("category-number")].categoryQuestion3;

    answer1Fill1.textContent = quizzes1[this.getAttribute("category-number")].category3Answer1;
    answer2Fill1.textContent = quizzes1[this.getAttribute("category-number")].category3Answer2;
    answer3Fill1.textContent = quizzes1[this.getAttribute("category-number")].category3Answer3;
    answer4Fill1.textContent = quizzes1[this.getAttribute("category-number")].category3Answer4;

    if(quizzes1[this.getAttribute("category-number")].category3Answer === "1") {
      answer11.setAttribute("data-boolean", "true");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category3Answer === "2") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "true");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "false");
    } else if(quizzes1[this.getAttribute("category-number")].category3Answer === "3") {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "true");
      answer41.setAttribute("data-boolean", "false");
    } else {
      answer11.setAttribute("data-boolean", "false");
      answer21.setAttribute("data-boolean", "false");
      answer31.setAttribute("data-boolean", "false");
      answer41.setAttribute("data-boolean", "true");
    }
  }

  quiz1Div.style.transform = "translate(-50%, -45%)";
  blur.style.display = "block";
  document.getElementById("match-timer-fill-1").textContent = matchTimer;

  window.addEventListener("keydown", toggleTimer);

  function toggleTimer(evt) {
    if(evt.keyCode == "13") {
      window.removeEventListener("keydown", toggleTimer);

      var answered11 = function() {
        if(answer11.getAttribute("data-boolean") === "true") {
          window.removeEventListener("keydown", matchTimerResult);
          answer11.style.borderBottom = "8px #006700 solid";
          answer1Fill1.style.backgroundColor = "#00C700";
          answer1Fill1.style.borderTop = "solid 7px #00AB00";

          matchEndCheck(chosenCategoryVariant.getAttribute("variant-number"));

          removeAnswerListeners();
        } else {
          window.removeEventListener("keydown", matchTimerResult);
          answer11.style.borderBottom = "8px #670000 solid";
          answer1Fill1.style.backgroundColor = "#C70000";
          answer1Fill1.style.borderTop = "solid 7px #AB0000";

          if(answer21.getAttribute("data-boolean") === "true") {
            answer21.style.borderBottom = "8px #006700 solid";
            answer2Fill1.style.backgroundColor = "#00C700";
            answer2Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer31.getAttribute("data-boolean") === "true") {
            answer31.style.borderBottom = "8px #006700 solid";
            answer3Fill1.style.backgroundColor = "#00C700";
            answer3Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer41.getAttribute("data-boolean") === "true") {
            answer41.style.borderBottom = "8px #006700 solid";
            answer4Fill1.style.backgroundColor = "#00C700";
            answer4Fill1.style.borderTop = "solid 7px #00AB00";
          }

          matchEndCheck(0);

          removeAnswerListeners();
        }
      };

      var answered21 = function() {
        if(answer21.getAttribute("data-boolean") === "true") {
          window.removeEventListener("keydown", matchTimerResult);
          answer21.style.borderBottom = "8px #006700 solid";
          answer2Fill1.style.backgroundColor = "#00C700";
          answer2Fill1.style.borderTop = "solid 7px #00AB00";

          matchEndCheck(chosenCategoryVariant.getAttribute("variant-number"));

          removeAnswerListeners();
        } else {
          window.removeEventListener("keydown", matchTimerResult);
          answer21.style.borderBottom = "8px #670000 solid";
          answer2Fill1.style.backgroundColor = "#C70000";
          answer2Fill1.style.borderTop = "solid 7px #AB0000";

          if(answer11.getAttribute("data-boolean") === "true") {
            answer11.style.borderBottom = "8px #006700 solid";
            answer1Fill1.style.backgroundColor = "#00C700";
            answer1Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer31.getAttribute("data-boolean") === "true") {
            answer31.style.borderBottom = "8px #006700 solid";
            answer3Fill1.style.backgroundColor = "#00C700";
            answer3Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer41.getAttribute("data-boolean") === "true") {
            answer41.style.borderBottom = "8px #006700 solid";
            answer4Fill1.style.backgroundColor = "#00C700";
            answer4Fill1.style.borderTop = "solid 7px #00AB00";
          }

          matchEndCheck(0);

          removeAnswerListeners();
        }
      };

      var answered31 = function() {
        if(answer31.getAttribute("data-boolean") === "true") {
          window.removeEventListener("keydown", matchTimerResult);
          answer31.style.borderBottom = "8px #006700 solid";
          answer3Fill1.style.backgroundColor = "#00C700";
          answer3Fill1.style.borderTop = "solid 7px #00AB00";

          matchEndCheck(chosenCategoryVariant.getAttribute("variant-number"));

          removeAnswerListeners();
        } else {
          window.removeEventListener("keydown", matchTimerResult);
          answer31.style.borderBottom = "8px #670000 solid";
          answer3Fill1.style.backgroundColor = "#C70000";
          answer3Fill1.style.borderTop = "solid 7px #AB0000";

          if(answer11.getAttribute("data-boolean") === "true") {
            answer11.style.borderBottom = "8px #006700 solid";
            answer1Fill1.style.backgroundColor = "#00C700";
            answer1Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer21.getAttribute("data-boolean") === "true") {
            answer21.style.borderBottom = "8px #006700 solid";
            answer2Fill1.style.backgroundColor = "#00C700";
            answer2Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer41.getAttribute("data-boolean") === "true") {
            answer41.style.borderBottom = "8px #006700 solid";
            answer4Fill1.style.backgroundColor = "#00C700";
            answer4Fill1.style.borderTop = "solid 7px #00AB00";
          }

          matchEndCheck(0);

          removeAnswerListeners();
        }
      };

      var answered41 = function() {
        if(answer41.getAttribute("data-boolean") === "true") {
          window.removeEventListener("keydown", matchTimerResult);
          answer41.style.borderBottom = "8px #006700 solid";
          answer4Fill1.style.backgroundColor = "#00C700";
          answer4Fill1.style.borderTop = "solid 7px #00AB00";

          matchEndCheck(chosenCategoryVariant.getAttribute("variant-number"));

          removeAnswerListeners();
        } else {
          window.removeEventListener("keydown", matchTimerResult);
          answer41.style.borderBottom = "8px #670000 solid";
          answer4Fill1.style.backgroundColor = "#C70000";
          answer4Fill1.style.borderTop = "solid 7px #AB0000";

          if(answer11.getAttribute("data-boolean") === "true") {
            answer11.style.borderBottom = "8px #006700 solid";
            answer1Fill1.style.backgroundColor = "#00C700";
            answer1Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer21.getAttribute("data-boolean") === "true") {
            answer21.style.borderBottom = "8px #006700 solid";
            answer2Fill1.style.backgroundColor = "#00C700";
            answer2Fill1.style.borderTop = "solid 7px #00AB00";
          } else if(answer31.getAttribute("data-boolean") === "true") {
            answer31.style.borderBottom = "8px #006700 solid";
            answer3Fill1.style.backgroundColor = "#00C700";
            answer3Fill1.style.borderTop = "solid 7px #00AB00";
          }

          matchEndCheck(0);

          removeAnswerListeners();
        }
      };

      answer11.addEventListener("click", answered11);
      answer21.addEventListener("click", answered21);
      answer31.addEventListener("click", answered31);
      answer41.addEventListener("click", answered41);

      var removeAnswerListeners = function() {
        answer11.removeEventListener("click", answered11);
        answer21.removeEventListener("click", answered21);
        answer31.removeEventListener("click", answered31);
        answer41.removeEventListener("click", answered41);
      };

      function matchTimerResult(evt) {
        if(evt.keyCode == "13") {
          window.removeEventListener("keydown", matchTimerResult);

          removeAnswerListeners();

          matchEndCheck(0);
        }
      }

      timerInterval = setInterval(function() {
        document.getElementById("match-timer-fill-1").textContent = matchTimer;

        matchTimer--;

        if(matchTimer < 0) {
          window.addEventListener("keydown", matchTimerResult);

          clearInterval(timerInterval);
        }
      }, 1000);
    }
  };
}

function nextTeam() {
  teamAnsweringFill.textContent = teamNames[teamsPlayedAmount];
}

function nextTeamEvent(evt) {
  if(evt.keyCode == "13") {
    window.removeEventListener("keydown", nextTeamEvent);

    categoryBorder.style.transform = "translate(-50%, -50%)";
    blur.style.display = "block";

    btnCont.style.display = "none";
    timerVariantCont.style.display = "none";
    quiz2Div.style.display = "none";
    teamsCont.style.display = "none";

    clearGame2Points();

    nextTeam();
  }
}

function clearGame2Points() {
  var amountOfPoints = document.getElementById("points-counter");
  var pointElements = document.querySelectorAll(".point-border");

  for (var i = 0; i < pointElements.length; i++) {
    pointsCont.removeChild(pointElements[i]);
  }

  amountOfPoints.textContent = "0";
  amountOfPoints.style.display = "none";
}

function updatePoints(gainAmount) {
  var teamElements = document.querySelectorAll(".team");
  var selectedTeam = teamElements[teamsPlayedAmount];
  var selectedTeamPoints = selectedTeam.querySelector("h5");

  var currentTeamPoints = parseInt(selectedTeamPoints.textContent);
  var currentGainAmount = parseInt(gainAmount);

  selectedTeamPoints.textContent = "";
  selectedTeamPoints.textContent = currentTeamPoints + currentGainAmount;

  rearrangeTeams();
}

function matchEndCheck(points) {
  if(teamsPlayedAmount != teamAmount - 1) {
    if(gamesPlayed == 0) {
      clearInterval(timerInterval);

      matchTimer = matchTimerReset1;

      updatePoints(points);

      teamsPlayedAmount++;

      window.addEventListener("keydown", continueGame);
    } else if(gamesPlayed == 1) {
      clearInterval(timerInterval);

      match = 0;

      matchTimer = matchTimerReset2;

      var categoryDivs = document.querySelectorAll(".category");
      usedCategories.push(currentCategoryID);
      categoryDivs[currentCategoryID].style.opacity = "0.3";

      var amountOfPoints = document.getElementById("points-counter");
      var pointElements = document.querySelectorAll(".point-border");

      var currentPointNumbers = parseInt(amountOfPoints.textContent);

      for (var i = 0; i < pointElements.length; i++) {
        if (pointElements[i].getAttribute("data-boolean") === "false") {
          pointElements[i].setAttribute("data-boolean", "true");
          pointElements[i].querySelector(".point-fill").style.background = "linear-gradient(350deg, #FFEA87, #D9A73B)";
          currentPointNumbers++;
        }
      }

      amountOfPoints.textContent = "";
      amountOfPoints.textContent = currentPointNumbers;
      amountOfPoints.style.display = amountOfPoints.textContent > 0 ? "block" : "none";

      updatePoints(currentPointNumbers);

      teamsPlayedAmount++;

      window.addEventListener("keydown", nextTeamEvent);
      answer12.removeEventListener("click", answer12Check);
      answer22.removeEventListener("click", answer22Check);
    }
  } else {
    if(gamesPlayed == 0) {
      if(game1Match != game1MaxMatch) {
        clearInterval(timerInterval);

        game1Match++;

        matchTimer = matchTimerReset1;

        updatePoints(points);

        teamsPlayedAmount = 0;

        window.addEventListener("keydown", continueGame);
      } else {
        clearInterval(timerInterval);

        updatePoints(points);

        teamsPlayedAmount = 0;

        window.addEventListener("keydown", leaderboard);
      }
    } else if(gamesPlayed == 1) {
      clearInterval(timerInterval);

      var amountOfPoints = document.getElementById("points-counter");
      var pointElements = document.querySelectorAll(".point-border");

      var currentPointNumbers = parseInt(amountOfPoints.textContent);

      for (var i = 0; i < pointElements.length; i++) {
        if (pointElements[i].getAttribute("data-boolean") === "false") {
          pointElements[i].setAttribute("data-boolean", "true");
          pointElements[i].querySelector(".point-fill").style.background = "linear-gradient(350deg, #FFEA87, #D9A73B)";
          currentPointNumbers++;
        }
      }

      amountOfPoints.textContent = "";
      amountOfPoints.textContent = currentPointNumbers;
      amountOfPoints.style.display = amountOfPoints.textContent > 0 ? "block" : "none";

      updatePoints(currentPointNumbers);

      answer12.removeEventListener("click", answer12Check);
      answer22.removeEventListener("click", answer22Check);
      window.addEventListener("keydown", leaderboard);
    }
  }
}

function nextQuiz(evt) {
  if(evt.keyCode == "13") {
    if(match < matchAmount - 1) {
      match++;

      answerClue1.style.color = "#001E27";
      answerClue1.style.fontWeight = "400";
      answerClue1.style.fontSize = "30px";

      answerClue2.style.color = "#001E27";
      answerClue2.style.fontWeight = "400";
      answerClue2.style.fontSize = "30px";

      answerClue3.style.color = "#001E27";
      answerClue3.style.fontWeight = "400";
      answerClue3.style.fontSize = "30px";

      answerClue4.style.color = "#001E27";
      answerClue4.style.fontWeight = "400";
      answerClue4.style.fontSize = "30px";

      setTimeout(function() {
        answerClue1.textContent = quizzes3[match].clue1;
        answerClue1.style.color = "white";

        answerClue2.textContent = quizzes3[match].clue2;
        answerClue2.style.color = "white";

        answerClue3.textContent = quizzes3[match].clue3;
        answerClue3.style.color = "white";

        answerClue4.textContent = quizzes3[match].clue4;
        answerClue4.style.color = "white";
      }, 300);

      bAnswer1 = false;
      bAnswer2 = false;
      bAnswer3 = false;
      bAnswer4 = false;
    } else {
      window.addEventListener("keydown", leaderboard);
    }
  }
}

function answer13() {
  if(bAnswer1 === false) {
    answerClue1.style.color = "#001E27";

    setTimeout(function() {
      answerClue1.textContent = quizzes3[match].answer1;

      answerClue1.style.fontWeight = "600";
      answerClue1.style.fontSize = "40px";
      answerClue1.style.color = "white";
    }, 300);

    bAnswer1 = true;
  } else {
    answerClue1.style.color = "#001E27";
    answerClue1.style.fontWeight = "400";
    answerClue1.style.fontSize = "30px";

    setTimeout(function() {
      answerClue1.textContent = quizzes3[match].clue1;

      answerClue1.style.color = "white";
    }, 300);

    bAnswer1 = false;
  }
}

function answer23() {
  if(bAnswer2 === false) {
    answerClue2.style.color = "#001E27";

    setTimeout(function() {
      answerClue2.textContent = quizzes3[match].answer2;

      answerClue2.style.fontWeight = "600";
      answerClue2.style.fontSize = "40px";
      answerClue2.style.color = "white";
    }, 300);

    bAnswer2 = true;
  } else {
    answerClue2.style.color = "#001E27";
    answerClue2.style.fontWeight = "400";
    answerClue2.style.fontSize = "30px";

    setTimeout(function() {
      answerClue2.textContent = quizzes3[match].clue2;

      answerClue2.style.color = "white";
    }, 300);

    bAnswer2 = false;
  }
}

function answer33() {
  if(bAnswer3 === false) {
    answerClue3.style.color = "#001E27";

    setTimeout(function() {
      answerClue3.textContent = quizzes3[match].answer3;

      answerClue3.style.fontWeight = "600";
      answerClue3.style.fontSize = "40px";
      answerClue3.style.color = "white";
    }, 300);

    bAnswer3 = true;
  } else {
    answerClue3.style.color = "#001E27";
    answerClue3.style.fontWeight = "400";
    answerClue3.style.fontSize = "30px";

    setTimeout(function() {
      answerClue3.textContent = quizzes3[match].clue3;

      answerClue3.style.color = "white";
    }, 300);

    bAnswer3 = false;
  }
}

function answer43() {
  if(bAnswer4 === false) {
    answerClue4.style.color = "#001E27";

    setTimeout(function() {
      answerClue4.textContent = quizzes3[match].answer4;

      answerClue4.style.fontWeight = "600";
      answerClue4.style.fontSize = "40px";
      answerClue4.style.color = "white";
    }, 300);

    bAnswer4 = true;
  } else {
    answerClue4.style.color = "#001E27";
    answerClue4.style.fontWeight = "400";
    answerClue4.style.fontSize = "30px";

    setTimeout(function() {
      answerClue4.textContent = quizzes3[match].clue4;

      answerClue4.style.color = "white";
    }, 300);

    bAnswer4 = false;
  }
}

function continueGame(evt) {
  if(evt.keyCode == "13") {
    window.removeEventListener("keydown", continueGame);

    quiz1Div.style.transform = "translate(-50%, 1000%)";
    blur.style.display = "none";

    answer11.style.borderBottom = "8px black solid";
    answer1Fill1.style.backgroundColor = "#001E27";
    answer1Fill1.style.borderTop = "solid 7px black";

    answer21.style.borderBottom = "8px black solid";
    answer2Fill1.style.backgroundColor = "#001E27";
    answer2Fill1.style.borderTop = "solid 7px black";

    answer31.style.borderBottom = "8px black solid";
    answer3Fill1.style.backgroundColor = "#001E27";
    answer3Fill1.style.borderTop = "solid 7px black";

    answer41.style.borderBottom = "8px black solid";
    answer4Fill1.style.backgroundColor = "#001E27";
    answer4Fill1.style.borderTop = "solid 7px black";

    nextTeam();
  }
}

function leaderboard(evt) {
  if(evt.keyCode == "13") {
    window.removeEventListener("keydown", leaderboard);

    gamesPlayed++;

    teamsCont.style.display = "none";
    quiz1Div.style.display = "none";
    teamAnswering.style.display = "none";
    categoryCont.style.display = "none";
    pointsAlign.style.display = "none";
    quiz2Div.style.display = "none";
    quiz3Div.style.display = "none";

    var teamElements = document.querySelectorAll(".team");

    var leaderboardTeamElements = document.querySelectorAll(".leaderboard-team");

    var sortedCheckTeams = [];
    var sortedCheckLeadTeams = [];
    var currentPointCheck = 0;


    const sortedTeams = Array.from(teamElements).sort((a, b) => {
      const pointsA = parseInt(a.querySelector("h5").textContent);
      const pointsB = parseInt(b.querySelector("h5").textContent);
      return pointsB - pointsA;
    });

    sortedTeams.forEach((box, index) => {
      sortedCheckTeams.push(box);
    });

    for (var i = 0; i < sortedCheckTeams.length; i++) {
      for (var o = 0; o < leaderboardTeamElements.length; o++) {
        if(leaderboardTeamElements[o].querySelector("h4").textContent === sortedCheckTeams[i].querySelector("p").textContent) {
          sortedCheckLeadTeams.push(leaderboardTeamElements[o]);
        }
      }
    }

    for (var i = 0; i < sortedCheckLeadTeams.length; i++) {
      sortedCheckLeadTeams[i].setAttribute("latestPointAdd", teamAmount + 3 - i);
    }


    if(gamesPlayed == 3) {
      for(var i = 0; i < leaderboardTeamElements.length; i++) {
        for (var o = 0; o < sortedCheckTeams.length; o++) {
          if(leaderboardTeamElements[i].querySelector("h4").textContent === sortedCheckTeams[o].querySelector("p").textContent) {
            leaderboardTeamElements[i].querySelector("h3").textContent = sortedCheckTeams[o].querySelector("h5").textContent;
          }
        }
      }
    } else {
      for (var i = 0; i < sortedCheckTeams.length; i++) {
        var storedMatches = [];
        var matchesSum = 0;
        var o = 0;

        for(o = i + 1; o < sortedCheckTeams.length; o++) {
          if(parseInt(sortedCheckTeams[i].querySelector("h5").textContent) === parseInt(sortedCheckTeams[o].querySelector("h5").textContent)) {
            if(storedMatches.length > 0) {
              storedMatches.push(sortedCheckLeadTeams[o]);
            } else {
              storedMatches.push(sortedCheckLeadTeams[o]);
              storedMatches.push(sortedCheckLeadTeams[i]);
            }
          } else {
            if(storedMatches.length > 0) {
              for (var p = 0; p < storedMatches.length; p++) {
                matchesSum += parseInt(storedMatches[p].getAttribute("latestPointAdd"));
              }

              for (var p = 0; p < storedMatches.length; p++) {
                storedMatches[p].querySelector("h3").textContent = parseInt(storedMatches[p].querySelector("h3").textContent) + Math.round(matchesSum / storedMatches.length);
              }

              i = o - 1;

              break;
            } else {
              sortedCheckLeadTeams[i].querySelector("h3").textContent = parseInt(sortedCheckLeadTeams[i].querySelector("h3").textContent) + parseInt(sortedCheckLeadTeams[i].getAttribute("latestPointAdd"));
              break;
            }
          }
        }

        if(o === sortedCheckTeams.length) {
          if(storedMatches.length > 0) {
            for (var p = 0; p < storedMatches.length; p++) {
              matchesSum += parseInt(storedMatches[p].getAttribute("latestPointAdd"));
            }

            for (var p = 0; p < storedMatches.length; p++) {
              storedMatches[p].querySelector("h3").textContent = parseInt(storedMatches[p].querySelector("h3").textContent) + Math.round(matchesSum / storedMatches.length);
            }

            i = o - 1;
          } else {
            sortedCheckLeadTeams[i].querySelector("h3").textContent = parseInt(sortedCheckLeadTeams[i].querySelector("h3").textContent) + parseInt(sortedCheckLeadTeams[i].getAttribute("latestPointAdd"));
          }
        }
      }
    }

    if(gamesPlayed == 2) {
      for(var i = 0; i < sortedCheckTeams.length; i++) {
        for (var o = 0; o < leaderboardTeamElements.length; o++) {
          if(leaderboardTeamElements[o].querySelector("h4").textContent === sortedCheckTeams[i].querySelector("p").textContent) {
            sortedCheckTeams[i].querySelector("h5").textContent = leaderboardTeamElements[o].querySelector("h3").textContent;
          }
        }
      }
    } else {
      for(var i = 0; i < sortedCheckTeams.length; i++) {
        sortedCheckTeams[i].querySelector("h5").textContent = 0;
      }
    }

    leaderboardDiv.style.transform = "translate(-50%, -50%)";
    blur.style.display = "block";

    window.addEventListener("keydown", nextGame);
    setTimeout(rearrangeLeaderboard, 2000);
  }
}

function nextGame(evt) {
  if(evt.keyCode == "13") {
    window.removeEventListener("keydown", nextGame);

    if(gamesPlayed == 1) {
      categoryBorder.style.transform = "translate(-50%, -50%)";
      pointsAlign.style.display = "block";
      teamAnswering.style.display = "block";
      leaderboardDiv.style.transform = "translate(-50%, 1000%)";

      nextTeam();

      matchTimer = matchTimerReset2;
    } else if(gamesPlayed == 2) {
      match = 0;



      leaderboardDiv.style.transform = "translate(-50%, 1000%)";
      blur.style.display = "none";
      teamsCont.style.display = "flex";
      quiz3Div.style.display = "flex";

      window.addEventListener("keydown", nextQuiz);
    } else {
      console.log("Game Over");
    }
  }
}

function rearrangeLeaderboard() {
  var leaderboardTeamElements = document.querySelectorAll(".leaderboard-team");

  const sortedLeaderboard = Array.from(leaderboardTeamElements).sort((a, b) => {
    const pointsA = parseInt(a.querySelector("h3").textContent);
    const pointsB = parseInt(b.querySelector("h3").textContent);
    return pointsB - pointsA;
  });

  sortedLeaderboard.forEach((box, index) => {
    box.style.top = index * (box.clientHeight + 25) + "px";
  });
}

function rearrangeTeams() {
  var teams = document.querySelectorAll(".team");

  const sortedTeams = Array.from(teams).sort((a, b) => {
    const pointsA = parseInt(a.querySelector("h5").textContent);
    const pointsB = parseInt(b.querySelector("h5").textContent);
    return pointsB - pointsA;
  });

  sortedTeams.forEach((box, index) => {
    box.style.top = index * (box.clientHeight + 25) + "px";
  });
}

{ // Function Calls
  nextTeam();
}
