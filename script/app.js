"use strict";



const itemSection = document.getElementById('items');
const filterButtons = document.getElementById('filter-buttons')
const cartBtn = document.getElementById('cartBtn');
const cart = document.getElementById('cart-wrapper');
const showProducts = document.getElementById('show-products');
const itemNumber = document.getElementById('itemNumber');
const displayPrice = document.getElementById('display-price');

fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then(data => renderApp(data))
       


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

   
    function displayCart(){
        
        
            itemNumber.innerHTML = localCart.length;
        
        
           localCart.forEach(item => {
            showProducts.innerHTML += `
            <div class="flex pb-6">
                <img src="${item.image}" alt="productIMG" width = "50" class=" ml-1 mb-3" >
                <div class="flex flex-col pl-2">
                    <p class=" w-full">${item.title}</p>
                    <p class=" text-sm text-gray-400">KR ${item.price} SEK</p>
                    
                    <div class="flex">
                        <button onclick="deleteItem(${item.id})" id="delBtn" class=" w-fit"> <i class="fa-solid fa-xmark"></i> </button>
                    </div
                </div>
            </div>
            `
           })

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
       
        renderItems(data);
        displayCart();
        renderButtons(data)
        filterItems(data);
       
        
       
        // Save Products To Local Storage
         localStorage.setItem('products', JSON.stringify(data));
        
    }


 //Render Sorted Buttons
 function renderButtons(data) {
    const arr = data;
    const sortedItemCategorys = [...new Set(arr.map(item => item.category))]
    sortedItemCategorys.forEach(element => {
        filterButtons.innerHTML += 
        `<button data-id="${element}" class ="filter-btn mx-10 my-10 px-5 py-3  border-b-2 border-black hover:border-2 hover:bg-black hover:text-white  hover:ease-in" >${element.toUpperCase()}</button>`
        
    });
   

    //Filter Button Functionality
 }
    

 function filterItems (data){
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn)=> {
        btn.addEventListener('click', e =>{
            const category =  e.currentTarget.dataset.id;
            const itemCategory = data.filter(item =>{
                if (item.category === category) {
                    return item
                }
            })
            if (category === "all"){
                renderItems(data)
            } else{
               renderItems(itemCategory);
            }
        });
    });
 }

    function renderItems (test){
        let displayItems = test.map(item =>{
        return `<a href="product.html">
        <article id="product" class=" flex flex-col items-center justify-center w-96 h-96 cursor-pointer mb-14 shadow-sm hover:shadow-black " onclick="testFunc(${item.id})">
        <img src="${item.image}" alt="" width = "200" class=" w-60 h-60">
        <h2 class=" pt-10">${item.title}</h2>
        <h2 class=" text-sm text-gray-400">KR ${item.price} SEK</h2>
        <h2 class=" text-sm text-gray-400">ID ${item.id} </h2>

        </article>
        </a>
    `  
    });
    itemSection.innerHTML = displayItems; 
    }





   //const productEl =  document.getElementById('product');

    function testFunc (id){
        localStorage.setItem("productID",id);
        let test = localStorage.getItem("productID");
        console.log(test);
    

    }




    function toggleCart (){
       cart.classList.toggle('hidden');
    }


    cartBtn.addEventListener('click', toggleCart);


    