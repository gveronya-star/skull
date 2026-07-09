const button = document.getElementById("escapeBtn");


button.addEventListener("mouseover", () => {


    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;


    button.style.transform =
    `translate(${x}px, ${y}px)`;

});



button.addEventListener("click", () => {

    button.innerText = "Nice try ☠";

});
