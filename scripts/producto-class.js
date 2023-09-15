class Producto {
    constructor(producto) {
        this.id = producto.id;
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.imagen = producto.imagen;
        this.descripcion = producto.descripcion;
        this.colores = producto.colores || [];
        this.categoria = new Categoria (producto.categoria);
    }
}