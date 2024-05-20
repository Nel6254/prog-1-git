$.getJSON("vielas.json", function(json){
    data = json;

    for (i in data) {
        var table_row = '<tr>' + 
            "<td" + i + '>${data[i]["apakstips"]}</td>' +
            "<td" + i + '>${data[i]["daudzums"]}</td>' + 
            "</tr>";
        $("#KT").append(table_row);
    }    
     });