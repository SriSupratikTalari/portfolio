import { fetchJSON, renderProjects, fetchGitHubData} from './global.js';
const projects = await fetchJSON('./projects/lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
console.log(projects)
renderProjects(latestProjects, projectsContainer, 'h2');
const githubData = await fetchGitHubData('SriSupratikTalari');
console.log(githubData)
const profileStats = document.querySelector('#profile-stats');
if (profileStats) {
    profileStats.innerHTML = `
          <dl>
            <h2>My GitHub Stats</h2>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
  }