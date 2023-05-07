const walmartJobsUrl = "https://careers.walmart.com/feed?locale=en_US&categories[]=10766&sort=rv.di.dt";
const airbnbJobsUrl = "https://careers.airbnb.com/api/experiences/search?location=San%20Francisco%2C%20CA&offset=0&limit=5&type=Experiences&metadata=true&orderBy=published_at";
const twilioJobsUrl = "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Jobs/LastN.json?PageSize=5";

function getWalmartJobs() {
  fetch(walmartJobsUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const items = xml.querySelectorAll("item");
      let jobs = "";
      items.forEach(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;
        jobs += `<li><a href="${link}" target="_blank">${title}</a></li>`;
      });
      document.getElementById("walmart-jobs").innerHTML = jobs;
    });
}

function getAirbnbJobs() {
  fetch(airbnbJobsUrl)
    .then(response => response.json())
    .then(data => {
      const items = data.data.experiences;
      let jobs = "";
      items.forEach(item => {
        const title = item.metadata.title;
        const link = `https://careers.airbnb.com/experiences/${item.id}/`;
        jobs += `<li><a href="${link}" target="_blank">${title}</a></li>`;
      });
      document.getElementById("airbnb-jobs").innerHTML = jobs;
    });
}

function getTwilioJobs() {
  const username = "YOUR_ACCOUNT_SID";
  const password = "YOUR_AUTH_TOKEN";
  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(username + ":" + password));
  fetch(twilioJobsUrl, { headers: headers })
    .then(response => response.json())
    .then(data => {
      const items = data.jobs;
      let jobs = "";
      items.forEach(item => {
        const title = item.friendly_name;
        const link = `https://www.twilio.com/console/taskrouter/workspaces/YOUR_WORKSPACE_SID/tasks/${item.sid}`;
        jobs += `<li><a href="${link}" target="_blank">${title}</a></li>`;
      });
      document.getElementById("twilio-jobs").innerHTML = jobs;
    });
}

// Call the functions to populate the job listings
getWalmartJobs();
getAirbnbJobs();
getTwilioJobs();
