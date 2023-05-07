window.addEventListener('load', function() {
  const walmartUrl = 'https://careers.walmart.com/results?q=&page=1&sort=rank&jobCareerArea=all';
  const twilioUrl = 'https://www.twilio.com/company/jobs';
  const airbnbUrl = 'https://careers.airbnb.com/positions/';

  const walmartJobs = document.querySelector('#walmart-jobs');
  const twilioJobs = document.querySelector('#twilio-jobs');
  const airbnbJobs = document.querySelector('#airbnb-jobs');

  fetch(walmartUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const jobs = html.querySelectorAll('.search-result');

      let jobList = '';
      for (let i = 0; i < 5; i++) {
        const jobTitle = jobs[i].querySelector('.search-result-title').textContent;
        const jobRecruiter = jobs[i].querySelector('.search-result-recruiter-name').textContent;
        const jobLocation = jobs[i].querySelector('.search-result-location').textContent;
        const jobLink = 'https://careers.walmart.com' + jobs[i].querySelector('.search-result-title a').getAttribute('href');
        jobList += `
          <li>
            <a href="${jobLink}" target="_blank">${jobTitle}</a>
            <p>${jobRecruiter} - ${jobLocation}</p>
          </li>
        `;
      }
      walmartJobs.innerHTML = jobList;
    });

  fetch(twilioUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const jobs = html.querySelectorAll('.job-posting-item');

      let jobList = '';
      for (let i = 0; i < 5; i++) {
        const jobTitle = jobs[i].querySelector('.job-title a').textContent;
        const jobRecruiter = jobs[i].querySelector('.job-department').textContent;
        const jobLocation = jobs[i].querySelector('.job-location').textContent;
        const jobLink = jobs[i].querySelector('.job-title a').getAttribute('href');
        jobList += `
          <li>
            <a href="${jobLink}" target="_blank">${jobTitle}</a>
            <p>${jobRecruiter} - ${jobLocation}</p>
          </li>
        `;
      }
      twilioJobs.innerHTML = jobList;
    });

  fetch(airbnbUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const html = parser.parseFromString(data, 'text/html');
      const jobs = html.querySelectorAll('.position-result');

      let jobList = '';
      for (let i = 0; i < 5; i++) {
        const jobTitle = jobs[i].querySelector('.position-title a').textContent;
        const jobRecruiter = jobs[i].querySelector('.position-team').textContent;
        const jobLocation = jobs[i].querySelector('.position-location').textContent;
        const jobLink = 'https://careers.airbnb.com' + jobs[i].querySelector('.position-title a').getAttribute('href');
        jobList += `
          <li>
            <a href="${jobLink}" target="_blank">${jobTitle}</a>
            <p>${jobRecruiter} - ${jobLocation}</p>
          </li>
        `;
      }
      airbnbJobs.innerHTML = jobList;
    });
});
