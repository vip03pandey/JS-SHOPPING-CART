document.addEventListener('DOMContentLoaded',()=>{
    const products=[
        {id:1,name:"Product1",Price:20.99},
        {id:2,name:"Product2",Price:22.99},
        {id:3,name:"Product3",Price:18.99}
    ]
    const cart=[];
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
    checkOut.addEventListener('click',()=>{
        cart.length=0;
        alert("CheckOut successfully")
        renderCart();
    })
})