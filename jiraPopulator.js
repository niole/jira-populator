var STORY_VIS = "story-vis";
var SPRINT_STORY_VIS = "Story Vis";
var CLICKED_BROWSER_ACTION = "clicked_browser_action";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if( request.message === CLICKED_BROWSER_ACTION) {
    runJiraPopulator();
  }
});

function updateDescription() {
  var summaryValue = document.getElementById('summary').value;
  var descriptionInput = document.getElementById('description');
  descriptionInput.value = summaryValue;
}

function assignToSelf() {
  document.getElementById("assign-to-me-trigger").click();
}

function putInActiveStoryVisSprint() {
  var isNumber = /([0-9]+)/g;
  var sprintDropDown = document.getElementById("customfield_10500-field");

  sprintDropDown.click();

  var sprintOptions = sprintDropDown.children;
  console.log('sprintOptions', sprintOptions);
  var i;
  var last = 0;
  var lastIndex = -1;
  for (i=0; i<sprintOptions.length; i++) {
    var option = sprintOptions[i].innerText;
    var sprint = parseInt(option.match(isNumber).join(""));
    if (option.indexOf(SPRINT_STORY_VIS) > -1 && sprint > last) {
      last = sprint;
      lastIndex = i;
    }
  }

  sprintDropDown.selectedIndex = lastIndex;
}

function giveMinStoryPoints() {
  document.getElementById("customfield_10105").value = 1;
}

function setTeamStoryVis() {
  var teamDropDown = document.getElementById("customfield_10900");
  teamDropDown.click();

  var children = teamDropDown.children;
  var i;
  for (i=0; i<children.length; i++) {
    var child = children[i];
    if (child.innerText === "Story Viz and Analysis") {
      teamDropDown.selectedIndex = i;
    }
  }
}

function runJiraPopulator() {
    updateDescription();
    assignToSelf();
    putInActiveStoryVisSprint();
    giveMinStoryPoints();
    setTeamStoryVis();
}
