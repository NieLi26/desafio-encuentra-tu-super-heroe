const findHero = (id = "") => {
  $.ajax({
    type: "GET",
    url: `https://superheroapi.com/api.php/${4905856019427443}/${id}`,
    dataType: "json",
    success: function (res) {
        const { response } = res;
        if (response === "error") {
            alert(res.error);
            return;
        }
        console.log(res);
        let { 
            powerstats: {intelligence, strength, speed, durability, power, combat}, 
            image, 
            name, 
            connections,
            biography: { publisher, aliases },
            biography,  
            work: { occupation }, 
            appearance: { height, weight } 
        } = res;

        $("#heroInfo").html(`
                <p>SuperHero Encontrado</p>
                <div class="card mb-3 fs-6">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${image.url}" class="img-fluid rounded-start" alt="imagen heroe">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${name}</h5>
                                <p class="card-text">Conexiones: ${connections['group-affiliation']} </p>
                                <p class="card-text"><small class="text-body-secondary">Publicado por: ${publisher}</small></p>
                                <hr>
                                <p class="card-text">Ocupación: ${occupation}</p>
                                <hr>
                                <p class="card-text">Primera Aparición: ${biography["first-appearance"]}</p>
                                <hr>
                                <p class="card-text">Altura: ${height.join(" - ")}.</p>
                                <hr>
                                <p class="card-text">Peso: ${weight.join(" - ")}.</p>
                                <hr>
                                <p class="card-text">Alianzas: ${aliases.join(" ")}</p>
                            </div>
                        </div>
                    </div>
                </div>`
            );


        const convertirNull = (valor) => {
            return valor === "null" ? 0 : valor;
        }
        
        const chart = new CanvasJS.Chart("chartContainer",
        {
            title:{
                text: `Estadísticas de Poder para ${name}`
            },
            legend: {
                maxWidth: 1000,
                itemWidth: 120
            },
            data: [
            {
                type: "pie",
                showInLegend: true,
                // legendText: "{indexLabel}",
                dataPoints: [
                    { y: convertirNull(intelligence) , indexLabel: `intelligence (${intelligence ||'?'})`, legendText: "intelligence"},
                    { y: convertirNull(strength) , indexLabel: `strength (${strength ||'?'})`, legendText: "strength"},
                    { y: convertirNull(speed) , indexLabel: `speed (${speed ||'?'})`, legendText: "speed"},
                    { y: convertirNull(durability) , indexLabel: `durability (${durability})`, legendText: "durability"},
                    { y: convertirNull(power) , indexLabel: `power (${power ||'?'})`, legendText: "power"},
                    { y: convertirNull(combat) , indexLabel: `combat (${combat ||'?'})`, legendText: "combat"},
                ]
            }
            ]
        });
        chart.render();
    },
  });
};

// Esperemos a que carge el DOM
$(document).ready(function () {
  // Seleccionamos el formulario y escuchamos su evento submit
  $("form").submit(function (e) {
    // Prevenimos las acciones por defecto que genera el evento submit
    e.preventDefault();
    // Seleccionamos el input con name hero
    const hero = this.elements.hero.value;
    if (isNaN(parseInt(hero))) {
      alert("Debe ingresar un numero");
      return;
    }
    console.log("ES UN NUMERO", hero);
    findHero(hero);
  });

});

