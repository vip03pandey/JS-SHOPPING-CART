document.addEventListener('DOMContentLoaded',()=>{
    const products=[
        {id:1,name:"Product1",Price:20.99},
        {id:2,name:"Product2",Price:22.99},
        {id:3,name:"Product3",Price:18.99}
    ]
    let cart=[];
    const productList=document.getElementById("products-List")
    const cartItems=document.getElementById("cart-items")
    const emptyCartMessage=document.getElementById("empty-cart")
    const cartTotalMessage=document.getElementById("cart-total")
    const totalPriceDisplay=document.getElementById("total-price");
    const checkOut=document.getElementById("checkOut-btn");
    products.forEach(product=>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`
        <span>${product.name} - ${product.Price}</span>
                <button data-id=${product.id}>Add to Cart</button>
        `
        productList.appendChild(productDiv)
    })
    productList.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON'){
            const productId=parseInt(e.target.getAttribute("data-id"));
            const product=products.find(p=>p.id===productId);
            addToCart(product);
        }
    })
    function addToCart(product){
        cart.push(product);
        renderCart();
    }
    function renderCart(){
        cartItems.innerText='';
        let totalPrice=0;
        if(cart.length>0){
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach((item)=>{
                totalPrice+=item.Price;
                const cartItem=document.createElement('div');
                cartItem.innerHTML=`
                 ${item.name} - ${item.Price}
                  <button del-id="${item.id}" style=" background-color: #6200ea;
                  border: none;padding: 5px 5px; color: #fff; border-radius: 5px; cursor: pointer;">
                  Delete </button >
                `
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`
            })
        }
        else{
            emptyCartMessage.classList.remove('hidden');
            totalPriceDisplay.textContent=`0.00`

        }
    }
    cartItems.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const delId = parseInt(e.target.getAttribute("del-id"));
            const removeProduct = products.find(p => p.id === delId);
            
            if (removeProduct) {
                removeFromCart(removeProduct);
            }
        }
    });
    
    function removeFromCart(removeProduct) {
        cart = cart.filter(p => p.id !== removeProduct.id);
        renderCart();
    }
    checkOut.addEventListener('click',()=>{
        cart.length=0;
        alert("CheckOut successfully")
        renderCart();
    })
})