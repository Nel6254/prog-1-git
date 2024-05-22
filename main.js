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
     fetch("vielas.json")
.then(function(response){
	return response.json();
})
.then(function(products){
	let placeholder = document.querySelector("#data-output");
	let out = "";
	for(let product of products){
		out += `
			<tr>
				<td>${product.id}</td>
				<td>${product.nosaukums}</td>
				<td>${product.tips}</td>
				<td>${product.apakstips}</td>
				<td>${product.skaits}</td>
                <td>${product.daudzums}</td>
                <td>${product.komentari}</td>
			</tr>
		`;
	}

	placeholder.innerHTML = out;
});