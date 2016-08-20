var STORY_VIS = "story-vis";
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
  var sprintDropDown = document.getElementById("customfield_10500-field");
  sprintDropDown.click();

  var allSprintOptions = document.getElementsByClassName("aui-list-item");

  var activeSprintOption = Object.keys(allSprintOptions).reduce(function(acc, key) {
    if (key.indexOf(STORY_VIS) > -1 &&
      (acc === "" || parseInt(acc[acc.length-1]) < parseInt(key[key.length-1]))) {
      acc = key;
    }
    return acc;
  }, "");

  var activeSprintElt = allSprintOptions[activeSprintOption];
  activeSprintElt.click();
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
      child.click();
    }
  }
}

function runJiraPopulator() {
    updateDescription();
    assignToSelf();
    //putInActiveStoryVisSprint();
    giveMinStoryPoints();
    setTeamStoryVis();
}
