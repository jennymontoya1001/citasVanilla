
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
        id: Math.round(Math.random() * (100 - 1) + 1),
        nombre,
        fecha,
        hora,
        sintomas
    }


    const key = JSON.parse(localStorage.getItem('Citas'));
     if(key!==null){
        key.unshift(registro)
        localStorage.setItem('Citas', JSON.stringify(key))
    }else{ 
        citas.unshift(registro)
        localStorage.setItem('Citas', JSON.stringify(citas))
    }
 
    getLocalStorage();

}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaDatos();
})


const getLocalStorage = () => {
    listarCita.innerHTML = '';
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
    citasLocalStorage?.map(cita => {
        const {id, nombre, fecha, hora, sintomas } = cita;
        listarCita.innerHTML += `
                            <td>${nombre}</td>
                            <td>${fecha}</td>
                            <td>${hora}</td>
                            <td>${sintomas}</td>
                            <td><button id=${id} class="btn btn-danger">Eliminar</button></td>
        `
    })
}


document.addEventListener('DOMContentLoaded', getLocalStorage);

listarCita.addEventListener('click', (e) => {
   const btnEliminar = e.target.classList.contains('btn-danger');
   const id = e.target.id
   const local = JSON.parse(localStorage.getItem('Citas'))
   const buscado = local.find(data => data.id === Number(id))
   if(btnEliminar){
       local.forEach((element,index) => {
            if(element.id===buscado.id){
                local.splice(index,1)
                localStorage.setItem('Citas',JSON.stringify(local))
                getLocalStorage();
            }
       });
   
   }


})


buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));
    let filtro = data.filter(cita => cita.nombre.toLowerCase().includes(input.toLowerCase()))
    busqueda.innerHTML = '';

    filtro.length === 0 ?
        busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
        :
        (
            filtro.map(cita => {
                const { nombre, fecha, hora, sintomas } = cita;
                busqueda.innerHTML += `
                                    <div style="color:white;">${nombre}</div>
                                    <div style="color:white;">${fecha}</div>
                                    <div style="color:white;">${hora}</div>
                                    <div style="color:white;">${sintomas}
                                             
                `
            })
        )
})