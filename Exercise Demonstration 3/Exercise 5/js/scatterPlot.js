// ====================================================================
// EXERCISE 5a - Scatter Plot: Energy Consumption vs Star Rating
// ====================================================================

(function() {
    const container = d3.select("#scatter-plot");
    if (container.empty()) return;

    const margin = { top: 40, right: 30, bottom: 60, left: 70 };
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
        d.starRating = +d.starRating;
        d.energyConsumptionKwH = +d.energyConsumptionKwH;
    });

    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.starRating) - 0.3, d3.max(data, d => d.starRating) + 0.3])
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.energyConsumptionKwH) - 20, d3.max(data, d => d.energyConsumptionKwH) + 20])
        .range([innerHeight, 0])
        .nice();

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "11px");

    g.append("text")
        .attr("class", "x-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .text("Star Rating");

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).ticks(6))
        .selectAll("text")
        .attr("font-size", "11px");

    g.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -55)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#e0e0e0")
        .text("Energy Consumption (kWh)");

    g.selectAll(".scatter-dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "scatter-dot")
        .attr("cx", d => xScale(d.starRating))
        .attr("cy", d => yScale(d.energyConsumptionKwH))
        .attr("r", 8)
        .attr("fill", "#4f46e5")
        .attr("opacity", 0.75)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .on("click", function(event, d) {
            const content = `
                <strong>${d.brand} ${d.model}</strong>
                <hr>
                <span class="label">Screen Size:</span> <span class="value">${d.screenSize}"</span><br>
                <span class="label">Screen Tech:</span> <span class="value">${d.screenTech}</span><br>
                <span class="label">Star Rating:</span> <span class="value">${d.starRating} / 5</span><br>
                <span class="label">Energy:</span> <span class="value">${d.energyConsumptionKwH} kWh</span><br>
                <span class="label">Price:</span> <span class="value">$${d.priceAUD} AUD</span>
            `;
            showGlobalTooltip(event, content);
        })
        .on("mouseover", function(event, d) {
            d3.select(this).attr("r", 11).attr("fill", "#6366f1");
        })
        .on("mouseout", function() {
            d3.select(this).attr("r", 8).attr("fill", "#4f46e5");
        });
})();
