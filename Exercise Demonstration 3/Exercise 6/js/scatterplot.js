(function() {
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const baseWidth = 550;
    const baseHeight = 400;

    const container = d3.select("#scatterplot");
    if (container.empty()) { console.error("Container not found"); return; }
    container.selectAll("*").remove();
    const svg = container.append("svg").attr("viewBox", "0 0 " + baseWidth + " " + baseHeight).style("display", "block").style("width", "100%").style("height", "auto");
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const innerWidth = baseWidth - margin.left - margin.right;
    const innerHeight = baseHeight - margin.top - margin.bottom;

    const colorScale = d3.scaleOrdinal().domain(["LED","OLED","QLED","Mini-LED","ULED","QNED","Neo QLED","Laser TV","LCD"]).range(["#10b981","#a855f7","#3b82f6","#f59e0b","#ef4444","#ec4899","#3b82f6","#6366f1","#6b7280"]);
    const xAxisGroup = g.append("g").attr("class","x-axis").attr("transform","translate(0," + innerHeight + ")");
    const yAxisGroup = g.append("g").attr("class","y-axis");
    g.append("text").attr("x",innerWidth/2).attr("y",innerHeight+42).attr("text-anchor","middle").attr("font-size","12px").attr("fill","#333").text("Star Rating");
    g.append("text").attr("transform","rotate(-90)").attr("x",-innerHeight/2).attr("y",-45).attr("text-anchor","middle").attr("font-size","12px").attr("fill","#333").text("Energy (kWh)");
    const tooltip = g.append("g").attr("class","tooltip-group").style("opacity",0);
    tooltip.append("rect").attr("x",-30).attr("y",-20).attr("width",60).attr("height",22).attr("rx",4);
    const tooltipText = tooltip.append("text").attr("text-anchor","middle").attr("y",-6).attr("font-size","12px").attr("font-weight","600").attr("fill","#fff");
    const csvData = `brand,model,screenSize,screenTech,energyConsumption,star
Samsung,QN65Q70T,65,QLED,280,4.5
LG,OLED55C1,55,OLED,240,4.8
Sony,KD65A8H,65,OLED,260,4.6
TCL,55C825,55,QLED,220,4.2
Panasonic,TX-55HZ980,55,OLED,235,4.7
Hisense,65U7QF,65,ULED,290,4.0
Philips,50PUS7304,50,LED,180,3.8
Sharp,43FF1A,43,LED,150,3.5
Samsung,QN75Q800T,75,Neo QLED,320,4.7
LG,OLED65C3,65,OLED,245,4.9
Sony,KD-55X80J,55,LED,195,4.3
TCL,75C835,75,Mini-LED,310,4.5
Hisense,100L5F,100,Laser TV,350,4.1
Kogan,KALD32XH,32,LED,120,3.2
FFALCON,40S515,40,LED,140,3.6
Samsung,QN55LS03T,55,QLED,205,4.4
LG,65QNED81,65,QNED,255,4.4
Sony,KD-77A8H,77,OLED,270,4.8
TCL,43S615,43,LED,145,3.4
Panasonic,TX-55FZ560,55,LED,200,4.0
Hisense,55U8GQ,55,Mini-LED,215,4.3
Philips,65PUS8536,65,OLED,250,4.5
Linsar,55H1A,55,LED,175,3.3
Hitachi,50HAL73,50,LED,160,3.4
Eko,G65XT,65,LED,195,3.8
Blaupunkt,43FB1A,43,LED,130,3.2
Bauhn,BLED55XST,55,LED,185,3.5
Samsung,S90C,65,OLED,250,4.7
LG,OLED42C4,42,OLED,180,4.6
Sony,KD-85X95L,85,Mini-LED,340,4.8
TCL,85C855,85,QLED,330,4.6
aiwa,AWC240WZ,24,LED,105,4
aiwa,AWC240G,24,LED,82,5
aiwa,AW240DVD,24,LCD,91,4.5
aiwa,AWC320WZ,31,LED,145,4.5
aiwa,AWA320S,31,LED,104,6
aiwa,AWS320DVD,32,LED,125,5
aiwa,AWC320G,32,LED,116,5.5
aiwa,AWA400S,39,LED,148,6
aiwa,AWS400G,39,LCD,189,5`;

    const data = d3.csvParse(csvData);
    console.log("Loaded:", data.length, "records");
    data.forEach(function(d) {
        d.energyConsumption = +d.energyConsumption;
        d.starRating = +d.star;
    });
        const xScale = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.starRating; })]).range([0, innerWidth]).nice();
        const yScale = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.energyConsumption; })]).range([innerHeight, 0]).nice();
        xAxisGroup.call(d3.axisBottom(xScale).ticks(8));
        yAxisGroup.call(d3.axisLeft(yScale).ticks(8));
        g.selectAll("circle").data(data).join("circle").attr("cx", function(d) { return xScale(d.starRating); }).attr("cy", function(d) { return yScale(d.energyConsumption); }).attr("r", 6).attr("fill", function(d) { return colorScale(d.screenTech); }).on("mouseenter", function(event, d) {
            tooltipText.text(d.screenSize + "\"");
            tooltip.attr("transform", "translate(" + this.getAttribute("cx") + "," + (parseFloat(this.getAttribute("cy"))-18) + ")").style("opacity",1);
        }).on("mouseleave", function() {
            tooltip.style("opacity",0).attr("transform","translate(0,500)");
        });
})();
