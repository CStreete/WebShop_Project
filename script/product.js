"use strict";

onload = (event) => {
    if(localCart.length > 0){
        cart.classList.remove('hidden');
        for (const item of localCart) {
            showProducts.innerHTML += `
            <div class="flex ">
                <img src="${item.image}" alt="productIMG" width = "50" class=" ml-1 mb-3" >
                <div class="flex flex-col pl-2">
                    <p class=" w-full">${item.title}</p>
                    <p class=" text-sm text-gray-400">KR ${item.price} SEK</p>
                    <div class="flex">
                        <button id="delBtn" onclick="deleteItem(${item.id})" class=" w-fit"> <i class="fa-solid fa-xmark"></i> </button>
                        
                    </div
                </div>
            </div>
            `
        }
        totalPrice();
    }
    
}
   
//Html Variables 
const product = document.getElementById('product');
const cartBtn = document.getElementById('cartBtn');
const showProducts = document.getElementById('show-products');
const clearCartBtn = document.getElementById('clear-cart');
const cart = document.getElementById('cart-wrapper');
const displayPrice = document.getElementById('display-price');
const itemNumber = document.getElementById('itemNumber');
let globalData = "";



fetch('https://fakestoreapi.com/products/'+ localStorage.getItem("productID"))
    .then(res => res.json())
    .then(data => renderApp(data));

    if(!localStorage.getItem('cart')){
        localStorage.setItem('cart', "[]");
    }

    let localCart = JSON.parse(localStorage.getItem('cart'));
    let localProducts = JSON.parse(localStorage.getItem('products'));

    
    function shoppingCart(){
        let addProduct = localProducts.find(product => product.id == localStorage.getItem('productID'));
        if(cart.length == 0){
            localCart.push(addProduct);
        }else{
            let res = localCart.find(element => element.id == localStorage.getItem('productID'));
            if(res === undefined){
                localCart.push(addProduct);
            }
        }
        localStorage.setItem('cart', JSON.stringify(localCart));
    }

   function totalPrice(){
       let totalPrice = 0;
       for (let i = 0; i < localCart.length; i++) {
            totalPrice += localCart[i].price;
       }
       displayPrice.innerHTML = Math.round(totalPrice) + ' SEK';
   }

   
    function deleteItem (id){
        let temparr = localCart.filter(item => item.id != id);
        localStorage.setItem('cart', JSON.stringify(temparr));
        window.location.reload();

    }
           
 

    function renderApp(data){  
            globalData = data;       
            product.innerHTML += renderProductHTML();
            itemNumber.innerHTML = localCart.length;
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', function (){
            window.location.reload();
            cart.classList.remove('hidden'); 
            totalPrice();
            shoppingCart();
            
            showProducts.innerHTML += `
            <div class="flex">
                <img src="${data.image}" alt="productIMG" width = "50" class=" ml-1 mb-3" >
                <div class="flex flex-col pl-2">
                    <p class=" w-full">${data.title}</p>
                    <p class=" text-sm text-gray-400">KR ${data.price} SEK</p>
                    <div class="flex">
                        <button id="delBtn" class=" w-fit"> <i class="fa-solid fa-xmark"></i> </button>
                       
                    </div
                </div>
            </div>
            `
        });
    }


   
   


    function renderProductHTML(){
        let imageURL = globalData.image;
        let titles = globalData.title;
        let price = globalData.price;
       
        return  `  
        <article id="product" class=" flex col items-center justify-center cursor-pointer mb-14">
        <img src="${imageURL}" alt="productIMG" width = "400" class=" w-80 ">
        <div class="flex flex-col pl-10">
        <p class=" w-full">${titles}</p>
        <p class=" text-sm text-gray-400">KR ${price} SEK</p>
        <p class=" text-sm text-gray-400">Rating: ${globalData.rating.rate}</p>
        <p class=" text-sm text-gray-400">Users: ${globalData.rating.count}</p>
        <button class=" mt-10 mb-4 border-2  border-black">Buy Now</button>
        <button id="addToCartBtn" class="border-2  border-black ">Add To Cart</button>
        </div>
        </article>
    
    `
    }

    




    function toggleCart (){
        cart.classList.toggle('hidden');
     }


     function clearCart(){
        localStorage.clear('cart')
     }
 
     //Event Listner
     cartBtn.addEventListener('click', toggleCart);
     


     
     const delBtn = document.getElementById('delBtn');

    
     

 
