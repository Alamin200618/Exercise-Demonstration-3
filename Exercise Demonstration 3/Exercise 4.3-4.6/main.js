// ====================================================================
// EXERCISE 4.3-4.6 - TV Brand Data Visualisation
// COS30045 Data Visualisation
// ====================================================================

// ====================================================================
// SHARED DATASET - Unified for all exercises
// ====================================================================
const fullDataset = [
    { name: "Samsung (QLED 65\")", count: 18, screenTech: "QLED", marketShare: "12.5%", avgPriceAUD: 1499, topState: "NSW" },
    { name: "LG (OLED 55\")", count: 14, screenTech: "OLED", marketShare: "9.8%", avgPriceAUD: 2199, topState: "VIC" },
    { name: "Sony (OLED 65\")", count: 10, screenTech: "OLED", marketShare: "7.0%", avgPriceAUD: 2899, topState: "QLD" },
    { name: "TCL (QLED 55\")", count: 9, screenTech: "QLED", marketShare: "6.3%", avgPriceAUD: 899, topState: "WA" },
    { name: "Panasonic (OLED 55\")", count: 6, screenTech: "OLED", marketShare: "4.2%", avgPriceAUD: 1799, topState: "SA" },
    { name: "Hisense (ULED 65\")", count: 5, screenTech: "QLED", marketShare: "3.5%", avgPriceAUD: 1199, topState: "VIC" },
    { name: "Philips (LED 50\")", count: 4, screenTech: "LED", marketShare: "2.8%", avgPriceAUD: 599, topState: "NSW" },
    { name: "Sharp (LED 43\")", count: 3, screenTech: "LED", marketShare: "2.1%", avgPriceAUD: 459, topState: "TAS" },
    { name: "Samsung (Neo QLED 75\")", count: 15, screenTech: "QLED", marketShare: "10.4%", avgPriceAUD: 2999, topState: "NSW" },
    { name: "LG (OLED C3 65\")", count: 13, screenTech: "OLED", marketShare: "9.1%", avgPriceAUD: 3299, topState: "VIC" },
    { name: "Sony (Bravia LED 55\")", count: 8, screenTech: "LED", marketShare: "5.6%", avgPriceAUD: 1299, topState: "QLD" },
    { name: "TCL (Mini-LED 75\")", count: 11, screenTech: "QLED", marketShare: "7.7%", avgPriceAUD: 1699, topState: "WA" },
    { name: "Hisense (Laser TV)", count: 4, screenTech: "QLED", marketShare: "2.8%", avgPriceAUD: 3499, topState: "SA" },
    { name: "Kogan (LED 32\")", count: 12, screenTech: "LED", marketShare: "8.4%", avgPriceAUD: 199, topState: "VIC" },
    { name: "FFALCON (LED 40\")", count: 7, screenTech: "LED", marketShare: "4.9%", avgPriceAUD: 299, topState: "NSW" },
    { name: "Samsung (The Frame 55\")", count: 8, screenTech: "QLED", marketShare: "5.6%", avgPriceAUD: 1749, topState: "QLD" },
    { name: "LG (QNED 65\")", count: 9, screenTech: "QLED", marketShare: "6.3%", avgPriceAUD: 1599, topState: "NSW" },
    { name: "Sony (Master OLED 77\")", count: 5, screenTech: "OLED", marketShare: "3.5%", avgPriceAUD: 5499, topState: "VIC" },
    { name: "TCL (Android LED 43\")", count: 10, screenTech: "LED", marketShare: "7.0%", avgPriceAUD: 449, topState: "QLD" },
    { name: "Panasonic (LED 55\")", count: 4, screenTech: "LED", marketShare: "2.8%", avgPriceAUD: 899, topState: "WA" },
    { name: "Hisense (Mini-LED 55\")", count: 7, screenTech: "QLED", marketShare: "4.9%", avgPriceAUD: 999, topState: "SA" },
    { name: "Philips (Ambilight 65\")", count: 6, screenTech: "OLED", marketShare: "4.2%", avgPriceAUD: 2499, topState: "NSW" },
    { name: "Linsar (LED 55\")", count: 5, screenTech: "LED", marketShare: "3.5%", avgPriceAUD: 499, topState: "VIC" },
    { name: "Hitachi (LED 50\")", count: 3, screenTech: "LED", marketShare: "2.1%", avgPriceAUD: 399, topState: "QLD" },
    { name: "Eko (Google LED 65\")", count: 6, screenTech: "LED", marketShare: "4.2%", avgPriceAUD: 549, topState: "WA" },
    { name: "Blaupunkt (LED 43\")", count: 4, screenTech: "LED", marketShare: "2.8%", avgPriceAUD: 349, topState: "NT" },
    { name: "Bauhn (ALDI LED 55\")", count: 9, screenTech: "LED", marketShare: "6.3%", avgPriceAUD: 429, topState: "NSW" },
    { name: "Samsung (OLED S90C 65\")", count: 11, screenTech: "OLED", marketShare: "7.7%", avgPriceAUD: 2699, topState: "VIC" },
    { name: "LG (OLED Flex 42\")", count: 3, screenTech: "OLED", marketShare: "2.1%", avgPriceAUD: 3699, topState: "QLD" },
    { name: "Sony (Mini-LED 85\")", count: 6, screenTech: "QLED", marketShare: "4.2%", avgPriceAUD: 4999, topState: "WA" },
    { name: "TCL (QLED 85\")", count: 7, screenTech: "QLED", marketShare: "4.9%", avgPriceAUD: 2299, topState: "NSW" }
];

// Ensure count is number
fullDataset.forEach(d => { d.count = +d.count; });

// ====================================================================
// TOOLTIP ELEMENT
// ====================================================================
const tooltip = d3.select("#tooltip");

function showTooltip(event, d) {
    tooltip.select(".tooltip-brand").textContent = d.name;
    document.getElementById("tt-share").textContent = d.marketShare;
    document.getElementById("tt-price").textContent = "$" + d.avgPriceAUD.toLocaleString() + " AUD";
    document.getElementById("tt-state").textContent = d.topState;
    tooltip.classed("visible", true);
}

function moveTooltip(event) {
    tooltip.style.left = (event.clientX + 15) + "px";
    tooltip.style.top = (event.clientY - 10) + "px";
}

function hideTooltip() {
    tooltip.classed("visible", false);
}

// ====================================================================
// COMMON LAYOUT CONFIG
// ====================================================================
const margin = { top: 40, right: 30, bottom: 70, left: 180 };
const width = 800 - margin.left - margin.right;
const innerHeight = 650;
const viewBox = `0 0 ${800} ${innerHeight + margin.top + margin.bottom}`;

// ====================================================================
// TOGGLE FUNCTIONS
// ====================================================================
function hideAllContainers() {
    ["43", "44", "45", "46"].forEach(n => {
        const cont = document.getElementById("container-" + n);
        const desc = document.getElementById("desc-" + n);
        const btn = document.getElementById("btn-" + n);
        if (cont) cont.style.display = "none";
        if (desc) desc.style.display = "none";
        if (btn) btn.classList.remove("active");
    });
}

function showExercise43() {
    hideAllContainers();
    document.getElementById("container-43").style.display = "block";
    document.getElementById("desc-43").style.display = "block";
    document.getElementById("btn-43").classList.add("active");
    exercise43(fullDataset);
}

function showExercise44() {
    hideAllContainers();
    document.getElementById("container-44").style.display = "block";
    document.getElementById("desc-44").style.display = "block";
    document.getElementById("btn-44").classList.add("active");
    exercise44(fullDataset);
}

function showExercise45() {
    hideAllContainers();
    document.getElementById("container-45").style.display = "block";
    document.getElementById("desc-45").style.display = "block";
    document.getElementById("btn-45").classList.add("active");
    exercise45(fullDataset);
}

function showExercise46() {
    hideAllContainers();
    document.getElementById("container-46").style.display = "block";
    document.getElementById("desc-46").style.display = "block";
    document.getElementById("btn-46").classList.add("active");
    filterData('all');
}

// ====================================================================
// EXERCISE 4.3: Basic Bar Chart
// ====================================================================
function exercise43(data) {
    const container = document.querySelector("#container-43");
    if (!container) return;
    container.innerHTML = "";

    const sorted = [...data].sort((a, b) => b.count - a.count);

    const svg = d3.select(container)
        .append("svg")
        .attr("viewBox", viewBox)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block");

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(sorted, d => d.count)])
        .range([0, width])
        .nice();

    const yScale = d3.scaleBand()
        .domain(sorted.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.2);

    // Bars
    g.selectAll(".bar")
        .data(sorted)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.name))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#4f46e5")
        .attr("rx", 4)
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseout", hideTooltip);

    // Count labels
    g.selectAll(".count-label")
        .data(sorted)
        .enter()
        .append("text")
        .attr("class", "count-label")
        .attr("x", d => xScale(d.count) - 8)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff")
        .text(d => d.count);

    // Name labels
    g.selectAll(".name-label")
        .data(sorted)
        .enter()
        .append("text")
        .attr("class", "name-label")
        .attr("x", -8)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .text(d => d.name);

    // X-axis
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "12px");

    // Title
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text("Exercise 4.3 - Basic Bar Chart (Horizontal)");

    // Subtitle
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 65)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text("Hover bars to see details");
}

// ====================================================================
// EXERCISE 4.4: Colour by Screen Tech
// ====================================================================
function exercise44(data) {
    const container = document.querySelector("#container-44");
    if (!container) return;
    container.innerHTML = "";

    const sorted = [...data].sort((a, b) => b.count - a.count);

    const svg = d3.select(container)
        .append("svg")
        .attr("viewBox", viewBox)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block");

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(sorted, d => d.count)])
        .range([0, width])
        .nice();

    const yScale = d3.scaleBand()
        .domain(sorted.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.2);

    const colorScale = d3.scaleOrdinal()
        .domain(["QLED", "OLED", "LED"])
        .range(["#2563eb", "#7c3aed", "#059669"]);

    // Bars
    g.selectAll(".bar")
        .data(sorted)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.name))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.screenTech))
        .attr("rx", 4)
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseout", hideTooltip);

    // Count labels
    g.selectAll(".count-label")
        .data(sorted)
        .enter()
        .append("text")
        .attr("class", "count-label")
        .attr("x", d => xScale(d.count) - 8)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff")
        .text(d => d.count);

    // Name labels
    g.selectAll(".name-label")
        .data(sorted)
        .enter()
        .append("text")
        .attr("class", "name-label")
        .attr("x", -8)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .text(d => d.name);

    // X-axis
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "12px");

    // Title
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text("Exercise 4.4 - Colour by Screen Tech");

    // Legend
    const legendData = [
        { tech: "QLED", color: "#2563eb" },
        { tech: "OLED", color: "#7c3aed" },
        { tech: "LED", color: "#059669" }
    ];
    const legend = svg.append("g").attr("transform", `translate(${margin.left + 180}, ${margin.top + innerHeight + 60})`);
    legendData.forEach((item, i) => {
        const lg = legend.append("g").attr("transform", `translate(${i * 90}, 0)`);
        lg.append("rect").attr("width", 14).attr("height", 14).attr("rx", 3).attr("fill", item.color);
        lg.append("text").attr("x", 20).attr("y", 12).attr("font-size", "12px").attr("fill", "#333").text(item.tech);
    });

    // Subtitle
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 85)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text("Hover bars to see details");
}

// ====================================================================
// EXERCISE 4.5: Sequential Density with .join("rect")
// ====================================================================
function exercise45(data) {
    const container = document.querySelector("#container-45");
    if (!container) return;
    container.innerHTML = "";

    const sorted = [...data].sort((a, b) => b.count - a.count);

    const svg = d3.select(container)
        .append("svg")
        .attr("viewBox", viewBox)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block");

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(sorted, d => d.count)])
        .range([0, width])
        .nice();

    const yScale = d3.scaleBand()
        .domain(sorted.map(d => d.name))
        .range([0, innerHeight])
        .padding(0.2);

    // Sequential density scale - higher count = darker blue
    const colorScale = d3.scaleSequential()
        .domain([0, d3.max(sorted, d => d.count)])
        .interpolator(d3.interpolateBlues);

    // Bars using .join("rect") pattern
    g.selectAll(".bar")
        .data(sorted)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.name))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(d.count))
        .attr("rx", 5)
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseout", hideTooltip);

    // Count labels inside bars
    g.selectAll(".count-label")
        .data(sorted)
        .join("text")
        .attr("class", "count-label")
        .attr("x", 10)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff")
        .text(d => d.count);

    // Name labels
    g.selectAll(".name-label")
        .data(sorted)
        .join("text")
        .attr("class", "name-label")
        .attr("x", -8)
        .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .text(d => d.name);

    // X-axis
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "12px");

    // Title
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text("Exercise 4.5 - Sequential Density (join())");

    // Legend - Gradient bar
    const legendWidth = 200;
    const legendHeight = 14;
    const legendG = svg.append("g").attr("transform", `translate(${margin.left + 180}, ${margin.top + innerHeight + 60})`);

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient").attr("id", "blues-gradient");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", d3.interpolateBlues(0.2));
    gradient.append("stop").attr("offset", "100%").attr("stop-color", d3.interpolateBlues(1));

    legendG.append("rect").attr("width", legendWidth).attr("height", legendHeight).attr("rx", 3).attr("fill", "url(#blues-gradient)");
    legendG.append("text").attr("x", 0).attr("y", legendHeight + 14).attr("font-size", "11px").attr("fill", "#64748b").text("Low");
    legendG.append("text").attr("x", legendWidth).attr("y", legendHeight + 14).attr("font-size", "11px").attr("fill", "#64748b").attr("text-anchor", "end").text("High");

    // Subtitle
    svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 100)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text("Darker = Higher Count | Hover for details");
}

// ====================================================================
// EXERCISE 4.6: Interactive Dashboard with Filtering & Transitions
// ====================================================================
const categoryColors = {
    "QLED": "#3b82f6",
    "OLED": "#a855f7",
    "LED": "#10b981"
};

// Persistent state
let persistentSvg, persistentG, xScale, yScale;
const chart46Container = document.getElementById("chart-46");

function initChart46() {
    d3.select(chart46Container).selectAll("*").remove();

    persistentSvg = d3.select(chart46Container)
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${innerHeight + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block");

    persistentG = persistentSvg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    xScale = d3.scaleLinear()
        .domain([0, 18])
        .range([0, width])
        .nice();

    yScale = d3.scaleBand()
        .domain([])
        .range([0, innerHeight])
        .padding(0.25);

    // X-axis (persistent)
    persistentG.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "12px");

    // X-axis label
    persistentSvg.append("text")
        .attr("class", "x-label")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top + innerHeight + 40)
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-weight", "600")
        .attr("fill", "#333")
        .text("Volume Share Units (Count)");
}

function renderChart46(filteredData, targetColor) {
    const sorted = [...filteredData].sort((a, b) => b.count - a.count);

    // Update scales
    xScale.domain([0, d3.max(sorted, d => d.count)]).nice();
    yScale.domain(sorted.map(d => d.name)).range([0, innerHeight]);

    // Update X-axis with transition
    persistentG.select(".x-axis")
        .transition().duration(500)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "12px");

    // ========== BARS with ENTER-UPDATE-EXIT ==========
    const bars = persistentG.selectAll(".bar")
        .data(sorted, d => d.name);

    function getFillColor(d) {
        return targetColor || categoryColors[d.screenTech];
    }

    bars.join(
        enter => enter.append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => yScale(d.name))
            .attr("height", yScale.bandwidth())
            .attr("fill", d => getFillColor(d))
            .attr("rx", 5)
            .attr("width", 0)
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseout", hideTooltip)
            .call(enter => enter.transition()
                .duration(600)
                .delay((d, i) => i * 25)
                .attr("width", d => xScale(d.count))),
        update => update
            .call(update => update.transition()
                .duration(500)
                .attr("y", d => yScale(d.name))
                .attr("width", d => xScale(d.count))
                .attr("height", yScale.bandwidth())
                .attr("fill", d => getFillColor(d))),
        exit => exit
            .call(exit => exit.transition()
                .duration(300)
                .attr("width", 0)
                .attr("opacity", 0)
                .remove())
    );

    // ========== COUNT LABELS ==========
    const countLabels = persistentG.selectAll(".count-label")
        .data(sorted, d => d.name);

    countLabels.join(
        enter => enter.append("text")
            .attr("class", "count-label")
            .attr("x", 10)
            .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .attr("fill", "#fff")
            .attr("opacity", 0)
            .text(d => d.count)
            .call(enter => enter.transition()
                .duration(500)
                .delay((d, i) => i * 25)
                .attr("opacity", 1)),
        update => update
            .call(update => update.transition()
                .duration(500)
                .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
                .text(d => d.count)),
        exit => exit
            .call(exit => exit.transition()
                .duration(300)
                .attr("opacity", 0)
                .remove())
    );

    // ========== NAME LABELS ==========
    const nameLabels = persistentG.selectAll(".name-label")
        .data(sorted, d => d.name);

    nameLabels.join(
        enter => enter.append("text")
            .attr("class", "name-label")
            .attr("x", -8)
            .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("font-size", "11px")
            .attr("font-weight", "600")
            .attr("fill", "#333")
            .text(d => d.name)
            .attr("opacity", 0)
            .call(enter => enter.transition()
                .duration(500)
                .delay((d, i) => i * 25)
                .attr("opacity", 1)),
        update => update
            .call(update => update.transition()
                .duration(500)
                .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
                .text(d => d.name)),
        exit => exit
            .call(exit => exit.transition()
                .duration(300)
                .attr("opacity", 0)
                .remove())
    );
}

function filterData(tech) {
    // Update active button
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    const filterMap = { 'all': 'btn-all', 'QLED': 'btn-qled', 'OLED': 'btn-oled', 'LED': 'btn-led' };
    const btn = document.querySelector("." + filterMap[tech]);
    if (btn) btn.classList.add("active");

    // Filter data
    const filtered = tech === 'all'
        ? fullDataset
        : fullDataset.filter(d => d.screenTech === tech);

    // Target color for transition
    const targetColor = (tech && tech !== 'all') ? categoryColors[tech] : null;

    // Initialize chart if needed
    if (!persistentSvg) {
        initChart46();
    }

    // Render with transitions
    renderChart46(filtered, targetColor);
}

// ====================================================================
// INITIALIZE - Load Exercise 4.3 on start
// ====================================================================
showExercise43();
