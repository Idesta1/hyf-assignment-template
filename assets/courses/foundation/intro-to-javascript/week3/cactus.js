// add activity using date, activity and duration parameters.
const activities = [];
const date = new Date().toISOString().split("T")[0];
function addActivity(activity, duration) {
  activities.push({
    date: date,
    activity: activity,
    duration: duration,
  });
}

console.log(addActivity("YouTube", 20));
console.log(addActivity("Instagram", 40));
console.log(addActivity("Duolingo", 10));

console.log(activities);
console.log(showStatus());
// if we want to test or trigger add some activities before calling showStatus,
// we also need to make activities 0 by uncommenting add activities

// created show status function to show total duration, number of activities and date.
function showStatus() {
  let totalDuration = 0;
  for (let i = 0; i < activities.length; i++) {
    totalDuration += activities[i].duration;
  }

  if (activities.length === 0)
    return "Add some activities before calling showStatus";
  if (totalDuration >= 90)
    return `You have reached your limit, no more activities for you!`;
  if (activities.length !== 0 && totalDuration < 90)
    return `You have added ${activities.length} activities on ${activities[0].date}, which totals to  ${totalDuration} minutes.`;
}

console.log(showStatus());

// created spentMostTimeOn function to find the activity with the most time spent.

function spentMostTimeOn() {
  const activityDuration = {};

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i].activity;
    const duration = activities[i].duration;
    if (activityDuration[activity]) {
      activityDuration[activity] += duration;
    } else {
      activityDuration[activity] = duration;
    }
  }
  let maxActivity = null;
  let maxDuration = 0;
  for (const activity in activityDuration) {
    if (activityDuration[activity] > maxDuration) {
      maxDuration = activityDuration[activity];
      maxActivity = activity;
    }
  }
  return maxActivity;
}

console.log(`You spent the most time on: ${spentMostTimeOn()}`);
