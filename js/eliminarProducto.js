// eliminarProducto.js

export async function deleteProduct(id) {
  try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Error al eliminar el producto: ${response.statusText}`);
      }

      console.log('Producto eliminado exitosamente');
  } catch (error) {
      console.error(`Error al intentar eliminar el producto: ${error}`);
      throw error;
  }
}
