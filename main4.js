const buttons = document.getElementsByClassName("button4");

buttons.addEventListener("click", () => {

    const choise = buttons.value;
    saraksti(choise);
});

function saraksti(choise) {
 //   choise = choise.replace(" ", "").toLowerCase();
    const url = `${choise}.json`;

fetch(url)
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
})};
