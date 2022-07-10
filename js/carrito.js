
carrito= JSON.parse(localStorage.getItem("carrito")) || [];
console.log (carrito)

renderizarCarrito = (e) => {
    ID_cartContainer.innerHTML= ''
    carrito.forEach((producto) => {
   // producto.cantidad = producto.cantidad +1
    //producto.cantidad=producto.cantidad+1
    const {id, nombre, imgSrc, precio, cantidad} = producto   
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <div class="cartImg scale"> <img src="${imgSrc}" /> </div>
    <div class="cartTitle"><h2>${nombre}</h2></div>
    <div class="cartCant"><h2>cantidad: ${cantidad}</h2></div>
    <button data-id="${id}" class="buttonDelete"> Eliminar del Carrito </button>
        `
    ID_cartContainer.append(card)
})
const botonesDelete = document.querySelectorAll('.buttonDelete')  
botonesDelete.forEach((botonDelete) => {
botonDelete.addEventListener('click', eliminarProducto)
 
})
//window.location.href = "../pages/carrito.html"
}


const eliminarProducto = (e) => {
    Swal.fire('Producto eliminado')
    const productoBorrado = e.target.getAttribute('data-id')
    const producto = carrito.find((producto) => producto.id == productoBorrado)

    if (producto.cantidad>1){
    producto.cantidad= producto.cantidad-1}
    
    else{
    carrito = carrito.filter((producto) => producto.id !=productoBorrado)}

    localStorage.setItem('carrito',JSON.stringify(carrito))
    renderizarCarrito()  
    
}
renderizarCarrito()