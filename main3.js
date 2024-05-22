
const buttons = document.getElementsByClassName("button4");

buttons.addEventListener("click", saraksti);

function saraksti() {

var choice = buttons.value;

switch (choice) {
  case "2":
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
	break;
	case "3":
		fetch("inventars.json")
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
	break;

	default:
		fetch("inventars.json")
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
	}
}
