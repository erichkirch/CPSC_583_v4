var canvas = d3.select("body").append("svg")
    .attr("width", 3500)
    .attr("height", 900);

window.onload = function(){
    setup();
};

function setup(){
    printLegend();
    loadData("comic_chars_marvel_v2_2000.csv");
}

function printLegend(){
    var fillColorBG = "#85DCB0";

    canvas.append("rect")
        .attr("width", 175)
        .attr("height", 152)
        .attr("x", 150)
        .attr("y",153)
        .attr("fill", fillColorBG)
        .attr("stroke", "black");

    canvas.append("text")
        .attr("dy", 174)
        .attr("dx", 166)
        .text("Heterosexual: ");
    canvas.append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("x", 280)
        .attr("y", 174 - 15)
        .attr("fill", "#41B3A3");

    canvas.append("text")
        .attr("dy", 198)
        .attr("dx", 166)
        .text("Bisexual: ");
    canvas.append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("x", 280)
        .attr("y", 198 - 15)
        .attr("fill", "pink");

    canvas.append("text")
        .attr("dy", 222)
        .attr("dx", 166)
        .text("Homosexual: ");
    canvas.append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("x", 280)
        .attr("y", 222 - 15)
        .attr("fill", "purple");

    canvas.append("text")
        .attr("dy", 246)
        .attr("dx", 166)
        .text("Good: ");
    canvas.append("circle")
        .attr("cx", 288)
        .attr("cy", 246 - 5)
        .attr("r", 8)
        .attr("fill", "#85DCB0")
        .attr("stroke", "black");

    canvas.append("text")
        .attr("dy", 270)
        .attr("dx", 166)
        .text("Neutral: ");
    canvas.append("rect")
        .attr("width", 16)
        .attr("height", 15)
        .attr("x", 280)
        .attr("y", 270 - 15)
        .attr("fill", "#85DCB0")
        .attr("stroke", "black");

    canvas.append("text")
        .attr("dy", 294)
        .attr("dx", 166)
        .text("Evil: ");
    var triangle = d3.symbol().type(d3.symbolTriangle);
    canvas.append("path")
        .attr("d", triangle.size(90))
        .attr("transform", function(d) { return "translate(" + (287) + "," + (287) + ")"; })
        .attr("fill","#85DCB0")
        .attr("stroke", "black");
}

function loadData(path){
    var goodYears = new Array(2020).fill(0);
    var badYears = new Array(2020).fill(0);
    var neutYears1 = new Array(2020).fill(0);
    var neutYears2 = new Array(2020).fill(0);
    var printed = new Array(2020).fill(0);
    var spaceBetween = 45;
    var lefthandOffset = 1650;
    var goodYOffset = 900;
    var badYOffset = 10;
    var neutYOffset = (goodYOffset / 2);
    var goodYPos;
    var badYPos;
    var neutYPos1;
    var neutYPos2;
    var even = true;

    canvas.append("text")
        .attr("dy", goodYOffset - 50)
        .attr("dx", (0))
        .text("GOOD");
    canvas.append("text")
        .attr("dy", badYOffset + 55)
        .attr("dx", (0))
        .text("EVIL");
    canvas.append("text")
        .attr("dy", neutYOffset)
        .attr("dx", (0))
        .text("NEUTRAL");
    canvas.append("text")
        .attr("dy", goodYOffset)
        .attr("dx", ((1957 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1957);
    canvas.append("text")
        .attr("dy", badYOffset + 10)
        .attr("dx", ((1957 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1957);
    canvas.append("text")
        .attr("dy", goodYOffset)
        .attr("dx", ((1959 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1959);
    canvas.append("text")
        .attr("dy", badYOffset + 10)
        .attr("dx", ((1959 - 1900) * spaceBetween) - 15 - lefthandOffset)
        .text(1959);



    d3.csv((path), function(data){
        var fillColor = "#41B3A3";
        //if((goodYears[data.YEAR] == 0) && (badYears[data.YEAR] == 0)) {
        if((printed[data.YEAR]) == 0) {
            printed[data.YEAR] = 1;
            canvas.append("text")
                .attr("dy", goodYOffset)
                .attr("dx", ((data.YEAR - 1900) * spaceBetween) - 15 - lefthandOffset)
                .text(data.YEAR);
            canvas.append("text")
                .attr("dy", badYOffset + 10)
                .attr("dx", ((data.YEAR - 1900) * spaceBetween) - 15 - lefthandOffset)
                .text(data.YEAR);
        }

        if((data.GSM).localeCompare("Homosexual Characters") === 0){
            fillColor = "purple";
        }
        if((data.GSM).localeCompare("Bisexual Characters") === 0){
            fillColor = "pink";
        }

        if((data.ALIGN).localeCompare("Good Characters") === 0){
            goodYears[data.YEAR] += 1;
            goodYPos = -1*(30 + 10 * (goodYears[data.YEAR]));
            canvas.append("circle")
                .attr("cx", (data.YEAR - 1900) * spaceBetween - lefthandOffset)
                .attr("cy", goodYOffset + goodYPos - 1)
                .attr("r", 5)
                .attr("fill", fillColor);
        }
        else if((data.ALIGN).localeCompare("Bad Characters") === 0){
            badYears[data.YEAR] += 1;
            badYPos = -1*(30 + 10 * (badYears[data.YEAR]));
            var triangle = d3.symbol().type(d3.symbolTriangle);

            canvas.append("path")
                .attr("d", triangle.size(60))
                .attr("transform", function(d) { return "translate(" + ((data.YEAR - 1900) * spaceBetween - lefthandOffset) + "," + (badYOffset - badYPos + 0) + ")"; })
                .attr("fill", fillColor);
        }
        else{
            if(even == true) {
                neutYears1[data.YEAR] += 1;
                even = false;
                neutYPos1 = (-1 * (10 * (neutYears1[data.YEAR])));
                canvas.append("rect")
                    .attr("width", 10)
                    .attr("height", 9)
                    .attr("x", (data.YEAR - 1900) * spaceBetween - lefthandOffset - 5)
                    .attr("y", neutYOffset + neutYPos1 - 6)
                    .attr("fill", fillColor);
            }
            else{
                even = true;
                neutYPos2 = -1*(-1 * (10 * (neutYears2[data.YEAR])));
                canvas.append("rect")
                    .attr("width", 10)
                    .attr("height", 9)
                    .attr("x", (data.YEAR - 1900) * spaceBetween - lefthandOffset - 5)
                    .attr("y", neutYOffset + neutYPos2 - 6)
                    .attr("fill", fillColor);
                neutYears2[data.YEAR] += 1;
            }
        }
        canvas.append("rect")
            .attr("width", 16)
            .attr("height", 16)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "#85DCB0");

        /*canvas.append("text")
            .attr("dx", (data.YEAR - 1900) * spaceBetween - lefthandOffset)
            .attr("dy", goodYOffset + yPos + 5)
            .text(data.NAME);
*/
        return {
            Name: data.NAME,
            Year: data.YEAR
        }
    }).then(function(data){
        logger(data);
    });
}

function logger(data) {
    console.log(data);
}