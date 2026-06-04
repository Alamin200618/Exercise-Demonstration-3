// ====================================================================
// EXERCISE 5c - Bar Chart: 55-Inch TVs Energy Consumption
// ====================================================================

(function() {
    const container = d3.select("#bar-chart-55");
    if (container.empty()) return;

    const margin = { top: 40, right: 30, bottom: 80, left: 120 };
    const baseWidth = 500;
    const baseHeight = 380;
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

    const techColors = {
        "QLED": "#3b82f6",
        "OLED": "#a855f7",
        "LED": "#10b981",
        "Mini-LED": "#f59e0b"
    };

    const csvData = `brand,model,screenSize,energyConsumption,screenTech
LG,OLED 55" OLED55C1,55,240,OLED
TCL,QLED 55" 55C825,55,220,QLED
Panasonic,OLED 55" TX-55HZ980,55,235,OLED
Sony,Bravia LED 55" KD-55X80J,55,195,LED
Samsung,The Frame 55" QN55LS03T,55,205,QLED
Panasonic,LED 55" TX-55FZ560,55,200,LED
Hisense,Mini-LED 55" 55U8GQ,55,215,Mini-LED
Linsar,LED 55" 55H1A,55,175,LED
Bauhn,ALDI LED 55" BLED55XST,55,185,LED`;

    const data = d3.csvParse(csvData);
    data.forEach(d => {
        d.energyConsumption = +d.energyConsumption;
    });

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, innerHeight])
        .padding(0.25);

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(5))
        .selectAll("text")
        .attr("font-size", "10px")
        .attr("fill", "#e0e0e0");

    g.append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .text("Energy Consumption (kWh)");

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .attr("font-size", "10px")
        .attr("fill", "#e0e0e0");

    g.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("height", yScale.bandwidth())
        .attr("width", d => xScale(d.energyConsumption))
        .attr("fill", d => techColors[d.screenTech] || "#6b7280")
        .attr("rx", 4)
        .style("cursor", "pointer")
        .on("click", function(event, d) {
            const content = `
                <strong>${d.brand} ${d.model}</strong>
                <hr>
                <span class="label">Screen Size:</span> <span class="value">${d.screenSize}"</span><br>
                <span class="label">Panel Tech:</span> <span class="value">${d.screenTech}</span><br>
                <span class="label">Energy:</span> <span class="value">${d.energyConsumption} kWh</span>
            `;
            showGlobalTooltip(event, content);
        });

    g.selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d.energyConsumption) + 8)
        .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("fill", "#e0e0e0")
        .text(d => d.energyConsumption);

    const legendData = [
        { tech: "QLED", color: "#3b82f6" },
        { tech: "OLED", color: "#a855f7" },
        { tech: "LED", color: "#10b981" },
        { tech: "Mini-LED", color: "#f59e0b" }
    ];

    const legend = g.append("g").attr("transform", `translate(0, ${innerHeight + 55})`);
    legendData.forEach((item, i) => {
        const lg = legend.append("g").attr("transform", `translate(${i * 100}, 0)`);
        lg.append("rect").attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", item.color);
        lg.append("text").attr("x", 16).attr("y", 11).attr("font-size", "10px").attr("fill", "#e0e0e0").text(item.tech);
    });
})();
