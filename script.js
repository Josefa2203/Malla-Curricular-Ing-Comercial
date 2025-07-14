// Datos de los cursos y sus prerrequisitos
const courses = [
  { id: "Introducción a la Microeconomía", semester: 1, prerequisites: [], credits: 8 },
  { id: "Matemática I", semester: 1, prerequisites: [], credits: 4 },
  { id: "Introducción a la Administración I", semester: 1, prerequisites: [], credits: 8 },
  { id: "Matemática II", semester: 2, prerequisites: ["Matemática I"], credits: 8 },
  { id: "Introducción a la Macroeconomía", semester: 2, prerequisites: [], credits: 8 },
  { id: "Microeconomía I", semester: 3, prerequisites: ["Introducción a la Microeconomía", "Matemática II"], credits: 8 },
  { id: "Macroeconomía I", semester: 4, prerequisites: ["Introducción a la Macroeconomía"], credits: 8 },
  { id: "Microeconomía II", semester: 5, prerequisites: ["Microeconomía I"], credits: 10 },
  { id: "Macroeconomía II", semester: 6, prerequisites: ["Macroeconomía I"], credits: 10 },
  // Agrega más cursos aquí según tu malla curricular
];

// Relaciones entre cursos y prerrequisitos
const links = [
  { source: "Matemática I", target: "Matemática II" },
  { source: "Introducción a la Microeconomía", target: "Microeconomía I" },
  { source: "Introducción a la Macroeconomía", target: "Macroeconomía I" },
  { source: "Microeconomía I", target: "Microeconomía II" },
  { source: "Macroeconomía I", target: "Macroeconomía II" },
  // Agrega más relaciones aquí
];

// Selección del contenedor SVG
const svg = d3.select("svg");

// Configuración de la simulación de D3
const simulation = d3.forceSimulation(courses)
  .force("link", d3.forceLink(links).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(600, 400));

// Agregar enlaces (relaciones) entre los cursos
const link = svg.append("g")
  .selectAll(".link")
  .data(links)
  .enter().append("line")
  .attr("class", "link")
  .attr("stroke", "#f06292") // Fucsia claro para los enlaces
  .attr("stroke-opacity", 0.6);

// Agregar nodos (cursos)
const node = svg.append("g")
  .selectAll(".node")
  .data(courses)
  .enter().append("circle")
  .attr("class", "node")
  .attr("r", 20)
  .attr("fill", "#880e4f") // Fucsia oscuro para los nodos
  .call(d3.drag()
    .on("start", dragstart)
    .on("drag", dragged)
    .on("end", dragend));

// Mostrar el nombre del curso al pasar el ratón por encima
node.append("title")
  .text(d => d.id);

// Simular el comportamiento de los nodos
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});

// Funciones para el comportamiento de arrastre (drag)
function dragstart(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragend(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}


