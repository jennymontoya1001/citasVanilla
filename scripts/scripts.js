
let formulario = document.querySelector('form');
let listarCita = document.getElementById('listarCita');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busqueda');
let citas = [];

const capturaDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;

    let registro = {
        nombre,
        fecha,
        hora,
        sintomas
    }

    citas.unshift(registro);
    localStorage.setItem('Citas',JSON.stringify(citas));
    getLocalStorage();
  
}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaDatos();
})


const getLocalStorage = () =>{
    listarCita.innerHTML = '';
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
    //console.log(citasLocalStorage);
    citasLocalStorage.map(cita => {
        const {nombre,fecha,hora,sintomas} = cita;
        listarCita.innerHTML += `
                            <td>${nombre}</td>
                            <td>${fecha}</td>
                            <td>${hora}</td>
                            <td>${sintomas}</td>
        `   
     })
}


document.addEventListener('DOMContentLoaded',getLocalStorage);



buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));
    let filtro = data.filter(cita => cita.nombre.toLowerCase()  === input.toLowerCase())
    busqueda.innerHTML = '';  
    console.log(filtro)  
   
     filtro.length === 0 ?
          busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
          :
          (
            filtro.map(cita => { 
                const {nombre,fecha,hora,sintomas} = cita;
                busqueda.innerHTML += `
                                    <div style="color:white;">${nombre}</div>
                                    <div style="color:white;">${fecha}</div>
                                    <div style="color:white;">${hora}</div>
                                    <div style="color:white;">${sintomas}
                                    <button>Borrar</Button></div><br>             
                `   
             })
          )
})