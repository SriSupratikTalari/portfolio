import { fetchJSON, renderProjects } from './global.js';
const projects = await fetchJSON('./projects/lib/projects.json');
const latestProjects = projects.slice(0, 3);
const projectsContainer = document.querySelector('.projects');
console.log(projects)
renderProjects(latestProjects, projectsContainer, 'h2');
// const githubData = await fetchGitHubData('giorgianicolaou');
// const profileStats = document.querySelector('#profile-stats');