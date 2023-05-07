// Get the HTML elements we need to update
const recentJobsList = document.getElementById("recent-jobs-list");
const recentJobsHeader = document.getElementById("recent-jobs-header");

// Retrieve the Walmart job data
const walmartJobsUrl = "https://careers.walmart.com/search-jobs/api/retail/5082/1";
fetch(walmartJobsUrl)
  .then(response => response.json())
  .then(data => {
    // Get the most recent 5 jobs
    const recentJobs = data.jobResults.slice(0, 5);

    // Update the header to show the number of jobs retrieved
    recentJobsHeader.innerText = `Recent Jobs Posted (${recentJobs.length})`;

    // Create HTML for each recent job
    const recentJobsHtml = recentJobs.map(job => {
      const title = job.jobTitle;
      const recruiter = job.recruiter;
      const company = job.branding.brandName;
      const jobUrl = `https://careers.walmart.com${job.jobViewUrl}`;

      return `<li>
                <span>${company}</span>
                <span>${recruiter}</span>
                <span><a href="${jobUrl}" target="_blank">${title}</a></span>
              </li>`;
    }).join("");

    // Add the HTML to the recent jobs list
    recentJobsList.innerHTML = recentJobsHtml;
  })
  .catch(error => {
    console.error("Error retrieving Walmart job data:", error);
  });
