
//DECLARACIONES------------------------------------------------------------------------------------------------------------
let  productos = []
let carrito = []
carrito= JSON.parse(localStorage.getItem("carrito")) || [];

//QUERY DE ELEMENTOS-------------------------------------------------------------------------------------------------------
let verCarrito = document.querySelector('.verCarrito')
const botonDestacados = document.querySelector('.buttonCTA') 
const botonCarrito = document.querySelector('.buttonCarrito') 

//FUNCIONES----------------------------------------------------------------------------------------------------------------
//Función que renderiza mis productos en pantalla
renderizarProducto = () => {
    productos.forEach((producto) => {
    const {id, nombre, imgSrc, precio} = producto
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <div class="cartImg scale"> <img src="${imgSrc}" /> </div>
    <div class="cartTitle"><h2>${nombre}</h2></div>
    <div class="cartPrice"><h2>$${precio}</h2></div>
    <button data-id="${id}" class="buttonProd"> Agregar al Carrito </button>
        `
    ID_cardContainer.append(card)
})
const botonesCompra = document.querySelectorAll('.buttonProd')  
botonesCompra.forEach((botonCompra) => {
botonCompra.addEventListener('click', agregarProducto)
})
}

//Función que agrega productos al carrito
function agregarProducto(e) {
    const productoElegido = e.target.getAttribute('data-id')
    const producto = productos.find((producto) => producto.id == productoElegido)

    if (carrito.some((producto) => producto.id === productoElegido))  {
        carrito = carrito.map((producto) => {
            let cantidad = producto.cantidad
            if (producto.id === productoElegido) cantidad++

        return {
            ...producto,
            cantidad,
        }
    })
} else {
    carrito.push({
        ...producto,
        cantidad: 1,
    })

}
    localStorage.setItem('carrito',JSON.stringify(carrito))
    Swal.fire('Producto agregado')

}

//FETCH GET RELATIVO
fetch('./json/data.json')
    .then ((res) =>res.json())
    .then((data) =>{
        productos=data
        renderizarProducto(productos)
    }
    )
