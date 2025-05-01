import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const searchInput = document.querySelector('.searchBar');
const title = document.querySelector('.projects-title');
title.textContent = `${projects.length} Projects`;

// Function to render pie chart and legend
function renderPieChart(projectsGiven) {
  let rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );

  let data = rolledData.map(([year, count]) => ({ value: count, label: year }));
  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

  // Clear previous chart and legend
  d3.select('svg').selectAll('path').remove();
  d3.select('.legend').selectAll('li').remove();

  // Render the pie chart
  sliceGenerator(data).forEach((d, idx) => {
    let arcPath = arcGenerator(d);
    d3.select('svg')
      .append('path')
      .attr('d', arcPath)
      .attr('fill', d3.scaleOrdinal(d3.schemeTableau10)(idx));
  });

  // Render the legend
  let legend = d3.select('.legend');
  data.forEach((d, idx) => {
    legend.append('li')
      .attr('style', `--color:${d3.scaleOrdinal(d3.schemeTableau10)(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

// Initial render of pie chart
renderPieChart(projects);

// Search input listener
searchInput.addEventListener('input', (event) => {
  let query = event.target.value.toLowerCase();

  // Filter projects based on search query
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join(' ').toLowerCase();
    return values.includes(query);
  });

  // Re-render filtered projects and pie chart
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);

  // Update project count title
  title.textContent = `${filteredProjects.length} Projects`;
});