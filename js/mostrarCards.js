import { listaCards, enviarProducto } from "./conexionAPI.js";
import { deleteProduct } from "./eliminarProducto.js";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("[data-formulario]");
    const lista = document.querySelector("[data-lista]");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nombre = document.querySelector("[data-nombreProducto]").value;
        const precio = document.querySelector("[data-precioProducto]").value;
        const imagen = document.querySelector("[data-imagenProducto]").value;

        if (!nombre || !precio || !imagen) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            await enviarProducto(nombre, precio, imagen);
            alert("Producto creado exitosamente");
            listarCards();
        } catch (error) {
            console.error("Error al crear el producto: ", error);
            alert("Hubo un error al crear el producto");
        }
    });

    async function listarCards() {
        try {
            const productos = await listaCards();
            lista.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos
            productos.forEach(producto => {
                const card = crearCard(producto.imagen, producto.nombre, producto.precio, producto.id);
                lista.appendChild(card);
            });
        } catch (error) {
            console.error("Error al listar las tarjetas: ", error);
        }
    }

    function crearCard(imagen, nombre, precio, id) {
        const productos = document.createElement("li");
        productos.className = "card border";
        productos.dataset.id = id;

        productos.innerHTML = `
        <div class="cards">
            <div class="card-container--info">
                <img src="${imagen}"/>
                <p class="nombreProducto">${nombre}</p>
                <p class="precioProducto">${precio}$</p>
                <button class="comprar">Borrar</button>
                <ul data-lista></ul>
            </div>
        </div>`;


        productos.querySelector(".comprar").addEventListener("click", async () => {
            if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                try {
                    await deleteProduct(id);
                    productos.remove();
                } catch (error) {
                    console.error("Error al borrar el producto: ", error);
                }
            }
        });

        return productos;
    }

    listarCards();
});
