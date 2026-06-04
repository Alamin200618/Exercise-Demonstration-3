// ====================================================================
// EXERCISE 5b - Donut Chart: Energy Consumption by Screen Technology
// ====================================================================

(function() {
    const container = d3.select("#donut-chart");
    if (container.empty()) return;

    const margin = { top: 40, right: 30, bottom: 40, left: 30 };
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
        .attr("transform", `translate(${baseWidth / 2},${baseHeight / 2})`);

    const outerRadius = 140;
    const innerRadius = 70;

    const techColors = d3.scaleOrdinal()
        .domain(["QLED", "OLED", "LED", "Mini-LED", "ULED", "Neo QLED", "QNED", "Laser TV"])
        .range(["#4f46e5", "#7c3aed", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#ec4899", "#6366f1"]);

    const csvData = `brand,model,screenSize,inches,starRating,energyConsumptionKwH,screenTech,priceAUD
Samsung,QLED 65" QA65Q70T,65,65,4.5,280,QLED,1499
LG,OLED 55" OLED55C1,55,55,4.8,240,OLED,2199
Sony,OLED 65" KD65A8H,65,65,4.6,260,OLED,2899
TCL,QLED 55" 55C825,55,55,4.2,220,QLED,899
Panasonic,OLED 55" TX-55HZ980,55,55,4.7,235,OLED,1799
Hisense,ULED 65" 65U7QF,65,65,4.0,290,ULED,1199
Philips,LED 50" 50PUS7304,50,50,3.8,180,LED,599
Sharp,LED 43" 43FF1A,43,43,3.5,150,LED,459
Samsung,Neo QLED 75" QN75Q800T,75,75,4.7,320,Neo QLED,2999
LG,OLED C3 65" OLED65C3,65,65,4.9,245,OLED,3299
Sony,Bravia LED 55" KD-55X80J,55,55,4.3,195,LED,1299
TCL,Mini-LED 75" 75C835,75,75,4.5,310,Mini-LED,1699
Hisense,Laser TV 100" 100L5F,100,100,4.1,350,Laser TV,3499
Kogan,LED 32" KALD32XH,32,32,3.2,120,LED,199
FFALCON,LED 40" 40S515,40,40,3.6,140,LED,299
Samsung,The Frame 55" QN55LS03T,55,55,4.4,205,QLED,1749
LG,QNED 65" 65QNED81,65,65,4.4,255,QNED,1599
Sony,Master OLED 77" KD-77A8H,77,77,4.8,270,OLED,5499
TCL,Android LED 43" 43S615,43,43,3.4,145,LED,449
Panasonic,LED 55" TX-55FZ560,55,55,4.0,200,LED,899
Hisense,Mini-LED 55" 55U8GQ,55,55,4.3,215,Mini-LED,999
Philips,Ambilight 65" 65PUS8536,65,65,4.5,250,OLED,2499
Linsar,LED 55" 55H1A,55,55,3.3,175,LED,499
Hitachi,LED 50" 50HAL73,50,50,3.4,160,LED,399
Eko,Google LED 65" G65XT,65,65,3.8,195,LED,549
Blaupunkt,LED 43" 43FB1A,43,43,3.2,130,LED,349
Bauhn,ALDI LED 55" BLED55XST,55,55,3.5,185,LED,429
Samsung,OLED S90C 65" S90C,65,65,4.7,250,OLED,2699
LG,OLED Flex 42" OLED42C4,42,42,4.6,180,OLED,3699
Sony,Mini-LED 85" KD-85X95L,85,85,4.8,340,Mini-LED,4999
TCL,QLED 85" 85C855,85,85,4.6,330,QLED,2299`;

    const data = d3.csvParse(csvData);
    data.forEach(d => {
        d.energyConsumptionKwH = +d.energyConsumptionKwH;
    });

    const aggregated = Array.from(
        d3.rollup(data, v => d3.sum(v, d => d.energyConsumptionKwH), d => d.screenTech),
        ([tech, total]) => ({ tech, total })
    );

    const pie = d3.pie()
        .value(d => d.total)
        .sort(null);

    const arc = d3.arc();

    const arcs = g.selectAll(".arc")
        .data(pie(aggregated))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", d => arc.outerRadius(outerRadius).innerRadius(innerRadius)(d))
        .attr("fill", d => techColors(d.data.tech))
        .attr("stroke", "#1a1a2e")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", function(event, d) {
            const totalEnergy = d3.sum(aggregated, x => x.total);
            const percentage = ((d.data.total / totalEnergy) * 100).toFixed(1);
            const content = `
                <strong>${d.data.tech}</strong>
                <hr>
                <span class="label">Total Energy:</span> <span class="value">${d.data.total} kWh</span><br>
                <span class="label">Market Share:</span> <span class="value">${percentage}%</span><br>
                <span class="label">Categories:</span> <span class="value">${aggregated.length} types</span>
            `;
            showGlobalTooltip(event, content);
        });

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.3em")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#e0e0e0")
        .text("Total Energy");

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.2em")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .attr("fill", "#fff")
        .text(d3.sum(aggregated, d => d.total) + " kWh");

    const legend = svg.append("g")
        .attr("transform", `translate(${baseWidth - 130}, 30)`);

    aggregated.forEach((d, i) => {
        const lgRow = legend.append("g").attr("transform", `translate(0, ${i * 26})`);
        lgRow.append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("rx", 3)
            .attr("fill", techColors(d.tech));
        lgRow.append("text")
            .attr("x", 20)
            .attr("y", 12)
            .attr("font-size", "11px")
            .attr("fill", "#e0e0e0")
            .text(`${d.tech}`);
    });
})();
