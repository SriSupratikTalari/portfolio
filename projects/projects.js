import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');
const title = document.querySelector('.projects-title');
title.textContent = `${projects.length} Projects`;
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// let data = [
//   { value: 1, label: 'apples' },
//   { value: 2, label: 'oranges' },
//   { value: 3, label: 'mangos' },
//   { value: 4, label: 'pears' },
//   { value: 5, label: 'limes' },
//   { value: 5, label: 'cherries' },
// ];
// let rolledData = d3.rollups(
//   projects,
//   (v) => v.length,
//   (d) => d.year,
// );
// let data = rolledData.map(([year, count]) => {
//   return { value: count, label: year };
// });

// // Color scale
// let colors = d3.scaleOrdinal(d3.schemeTableau10);

// // Arc generator
// let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// // Slice generator (now using value accessor)
// let sliceGenerator = d3.pie().value(d => d.value);

// // Generate arc data with angles
// let arcData = sliceGenerator(data);

// // Draw slices
// arcData.forEach((d, i) => {
//   d3.select('#projects-pie-plot')
//     .append('path')
//     .attr('d', arcGenerator(d))
//     .attr('fill', colors(i));
// });
// let legend = d3.select('.legend');
// data.forEach((d, idx) => {
//   legend
//     .append('li')
//     .attr('style', `--color:${colors(idx)}`)
//     .attr('class', 'legend-item')
//     .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
// });
// let query = '';
// let searchInput = document.querySelector('.searchBar');
// searchInput.addEventListener('change', (event) => {
//   // update query value
//   query = event.target.value;
//   // filter projects
//   let filteredProjects = projects.filter((project) => {
//     let values = Object.values(project).join('\n').toLowerCase();
//     return values.includes(query.toLowerCase());
//   });
//   // render filtered projects
//   renderProjects(filteredProjects, projectsContainer, 'h2');
// });
let selectedIndex = -1;

function renderPieChart(projectsGiven) {
  let newSVG = d3.select('#projects-pie-plot');
  newSVG.selectAll('path').remove();

  let newLegend = d3.select('.legend');
  newLegend.selectAll('li').remove();

  // Recalculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  let newData = newRolledData.map(([year, count]) => ({
    value: count,
    label: year
  }));

  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let sliceGenerator = d3.pie().value(d => d.value);
  let arcData = sliceGenerator(newData);

  // Draw pie chart paths
  arcData.forEach((d, i) => {
    newSVG
      .append('path')
      .attr('d', arcGenerator(d))
      .attr('fill', colors(i))
      .attr('class', i === selectedIndex ? 'selected' : '')
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;

        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, 'h2');
        } else {
          const selectedYear = newData[selectedIndex].label;
          const filteredProjects = projects.filter(p => p.year === selectedYear);
          renderProjects(filteredProjects, projectsContainer, 'h2');
        }
        newSVG.selectAll('path')
          .attr('class', (_, idx) => idx === selectedIndex ? 'selected' : '');

        // Update all legend items
        newLegend.selectAll('li')
          .attr('class', (_, idx) =>
            `legend-item${idx === selectedIndex ? ' selected' : ''}`
          );
      });
  });

  // Draw legend
  newData.forEach((d, idx) => {
    newLegend
      .append('li')
      .attr('style', `--color:${colors(idx)}`)
      .attr('class', `legend-item${idx === selectedIndex ? ' selected' : ''}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
      .on('click', () => {
        selectedIndex = selectedIndex === idx ? -1 : idx;

        newSVG.selectAll('path')
          .attr('class', (_, i) => i === selectedIndex ? 'selected' : '');

        newLegend.selectAll('li')
          .attr('class', (_, i) =>
            `legend-item${i === selectedIndex ? ' selected' : ''}`
          );
      });
  });
}

// Call the function to render the initial pie chart on page load
renderPieChart(projects);

// Define the search logic
let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
  // Update query value
  query = event.target.value;

  // Filter the projects based on the query
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // Render the filtered projects list
  renderProjects(filteredProjects, projectsContainer, 'h2');

  // Re-render the pie chart with the filtered data
  renderPieChart(filteredProjects);
});