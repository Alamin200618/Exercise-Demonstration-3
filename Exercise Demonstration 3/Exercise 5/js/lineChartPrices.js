// ====================================================================
// EXERCISE 5d - Line Chart: Spot Power Prices 1998-2024
// ====================================================================

(function() {
    const container = d3.select("#line-chart");
    if (container.empty()) return;

    const margin = { top: 40, right: 40, bottom: 60, left: 70 };
    const baseWidth = 500;
    const baseHeight = 400;
    const viewBox = `0 0 ${baseWidth} ${baseHeight}`;

    container.selectAll("*").remove();

    const svg = container
        .append("svg")
        .attr("viewBox", viewBox)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block");

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const innerWidth = baseWidth - margin.left - margin.right;
    const innerHeight = baseHeight - margin.top - margin.bottom;

    const csvData = `year,avgSpotPriceAUD
1998,28.5
1999,32.1
2000,45.8
2001,54.2
2002,36.7
2003,38.9
2004,42.3
2005,48.1
2006,52.4
2007,58.9
2008,65.3
2009,48.7
2010,51.2
2011,55.8
2012,68.4
2013,72.1
2014,65.9
2015,58.3
2016,54.7
2017,89.2
2018,94.5
2019,78.3
2020,65.8
2021,87.4
2022,112.6
2023,105.8
2024,98.3`;

    const data = d3.csvParse(csvData);
    data.forEach(d => {
        d.year = +d.year;
        d.avgSpotPriceAUD = +d.avgSpotPriceAUD;
    });

    const parseYear = d3.timeParse("%Y");

    const xScale = d3.scaleTime()
        .domain([new Date(1998, 0, 1), new Date(2024, 0, 1)])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgSpotPriceAUD) + 20])
        .range([innerHeight, 0])
        .nice();

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(8).tickFormat(d3.timeFormat("%Y")))
        .selectAll("text")
        .attr("font-size", "10px")
        .attr("fill", "#e0e0e0")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");

    g.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .text("Year");

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "10px")
        .attr("fill", "#e0e0e0");

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -55)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .text("Avg Spot Price (AUD/MWh)");

    const line = d3.line()
        .x(d => xScale(parseYear(d.year)))
        .y(d => yScale(d.avgSpotPriceAUD))
        .curve(d3.curveMonotoneX);

    const area = d3.area()
        .x(d => xScale(parseYear(d.year)))
        .y0(innerHeight)
        .y1(d => yScale(d.avgSpotPriceAUD))
        .curve(d3.curveMonotoneX);

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#4f46e5").attr("stop-opacity", 0.8);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#4f46e5").attr("stop-opacity", 0.1);

    g.append("path")
        .datum(data)
        .attr("class", "area-path")
        .attr("d", area)
        .attr("fill", "url(#line-gradient)")
        .attr("opacity", 0.3);

    g.append("path")
        .datum(data)
        .attr("class", "line-path")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#4f46e5")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");

    g.selectAll(".data-point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", d => xScale(parseYear(d.year)))
        .attr("cy", d => yScale(d.avgSpotPriceAUD))
        .attr("r", 5)
        .attr("fill", "#4f46e5")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", function(event, d) {
            const content = `
                <strong>${d.year}</strong>
                <hr>
                <span class="label">Spot Price:</span> <span class="value">$${d.avgSpotPriceAUD} AUD/MWh</span><br>
                <span class="label">Trend:</span> <span class="value">${d.avgSpotPriceAUD > 70 ? 'High' : d.avgSpotPriceAUD > 50 ? 'Medium' : 'Low'}</span>
            `;
            showGlobalTooltip(event, content);
        });
})();
