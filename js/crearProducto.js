import { conexionAPI } from "./js/conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombreProducto]").value;
    const precio = document.querySelector("[data-precioProducto]").value;
    const imagen = document.querySelector("[data-imagenProducto]").value;


    try {
        await conexionAPI.enviarProducto(nombre, precio, imagen);
        alert("Producto creado exitosamente");
    } catch (error) {
        console.error("Error al crear el producto: ", error);
        alert("Hubo un error al crear el producto");
    }
}

formulario.addEventListener("submit", evento => crearProducto(evento));
