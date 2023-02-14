"use strict";






// HTML ELEMENTS
    const displayCartItems = document.getElementById('display-cart-items');
    const payNowBtn = document.getElementById('pay-now-btn');
    const mainWrapper = document.getElementById('display-wrapper');
    const wrapper = document.getElementById('main-wrapper');
    const totalAmount = document.querySelectorAll('.amount');
    const itemImage = document.getElementById('item-image');
    const itemTitle = document.getElementById('item-title');
    const itemPrice = document.getElementById('item-price');
    const shipping = document.getElementById('shipping');
    const shippingAlert = document.getElementById('shipping-alert');


    let localCart = JSON.parse(localStorage.getItem('cart'));
    

    
//OnLoad 
    window.addEventListener('load',() =>{
        displayCart();
        renderTotalPrice();

    })


    
 let storage = JSON.parse(localStorage.getItem('cart'));


 // Functions
    function displayCart(){
       
        
            console.log(storage);
           storage.forEach(item => {
            displayCartItems.innerHTML += `
            <div class="flex mb-5 pt-5">
                <img id="item-image" src="${item.image}" alt="productIMG" width = "50" class=" ml-1 mb-3" >
                <div class="flex flex-col pl-2">
                    <p id="item-title" class=" w-full">${item.title}</p>
                    <p id="item-price" class=" text-sm text-gray-400">KR ${item.price} SEK</p>
                    <div class="flex">
                        <button onclick="deleteItem(${item.id})" id="delBtn" class=" w-fit"> <i class="fa-solid fa-xmark"></i> </button>
                        <select onchange="renderTotalPrice()" id="amount" class=" amount ml-2" name="option" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    </div>
                </div>
            </div>
            `

           })
           
    }




    function deleteItem (id){
        let temparr = localCart.filter(item => item.id != id);
        localStorage.setItem('cart', JSON.stringify(temparr));
        window.location.reload();

    }
    

 
    function displayShippingAlert (totalPrice) {
        if(totalPrice > 500){
            shipping.innerHTML = "You Have Free Shipping!";
        } else {
            let difference = 500 - totalPrice;
            shipping.innerHTML ="You have " + difference +"KR left for free shipping!";
            shippingAlert.classList.remove("bg-green-200");
            shippingAlert.classList.remove("text-green-600");
            shippingAlert.classList.add("text-red-600");
            shippingAlert.classList.add("bg-red-200");

        }

    }
   




    
    function renderTotalPrice (){
    const amount = document.querySelectorAll('.amount');
    
    let totalPrice = 0;
    for (let i = 0; i < localCart.length; i++) {
        totalPrice += localCart[i].price * amount[i].value;
        
    }
        totalAmount.forEach(el =>{      
        el.innerHTML = Math.round(totalPrice) + ' SEK';
        })
    
        displayShippingAlert(totalPrice);
    }
    




    function toPayment(){
        mainWrapper.innerHTML = `
        <div class=" w-2/4 pt-16">
        <form id="form">
            <div class="flex justify-between">
            <input id="name" required class="w-full h-8 text-white pl-2 mb-3 mr-1 bg-black placeholder:text-white" placeholder="Name" type="text">
            <input id="number" required class="w-full h-8 text-white pl-2 mb-3  bg-black placeholder:text-white" placeholder="Phone Number" type="number">
            </div>
            <input id="email" required class="w-full h-8 text-white pl-2 mb-3  bg-black placeholder:text-white" placeholder="Email" type="text">
            <div class="flex justify-between">
                <input id="postal-code" required class="w-full h-8 text-white pl-2 mb-3 mr-1 bg-black placeholder:text-white" placeholder="Postal Code" type="number">
                <input id="city" required class="w-full h-8 text-white pl-2 mb-3  bg-black placeholder:text-white" placeholder="City" type="text">
            </div> 
            <input id="adress" required class="w-full h-8 text-white pl-2 mb-3 bg-black placeholder:text-white" placeholder="Adress" type="text">
            <br>
            <input class=" mb-3 w-5 h-5" type="radio" name="shipping-method" id="postnord" value="postnord-home-delivery">
            <label class=" text-lg " for="postnord">PostNord Home Delivery 1-5 Days</label>
            <br>
            <input class=" mb-3 mt-3 w-5 h-5" type="radio" name="shipping-method" id="postnord-pickup" value="postnord-pickup">
            <label class=" text-lg " for="postnord">PostNord Pick Up 1-5 Days</label>
            <br>
            <input class=" mb-3 mt-3 w-5 h-5"   type="radio" name="shipping-method" id="bring-home-delivery" value="bring-home-delivery">
            <label class=" text-lg " for="bring-home-delivery">Bring Home Delivery 1-5 Days</label>
           
            <input class=" mt-3 bg-black text-white w-full h-10 text-lg cursor-pointer" type="submit" value="ORDER">
        </form>
    </div>
        `
        const form = document.getElementById('form');
        form.addEventListener('submit', function(event){
            event.preventDefault();
            newOrder();
        });
        

    }

 

    function newOrder(){
        const nameEl = document.getElementById('name');
        const numberEl = document.getElementById('number');
        const emailEl = document.getElementById('email');
        const adressEl = document.getElementById('adress');
        const postalCodeEl = document.getElementById('postal-code');
        const cityEl = document.getElementById('city');
        const shippingEl = document.querySelector('input[name="shipping-method"]:checked');
        
        let order = localCart.map(el => el.id)

        let body = JSON.stringify({
            "fields": {
                "orderItems": {
                    "stringValue": JSON.stringify(order),
                },
                "name": {
                    "stringValue": nameEl.value,
                },
                "number":{
                    "stringValue": numberEl.value,
                },
                "email": {
                    "stringValue": emailEl.value
                } ,
                "shippingMethod":{
                    "stringValue": shippingEl.value
                },
                "shippingAdress": {
                    "mapValue":{
                        "fields": {
                            "adress": { 
                                "stringValue": adressEl.value,
                            },
                            "postalCode":{
                                "stringValue": postalCodeEl.value,
                            },
                            "city":{
                                "stringValue": cityEl.value,
                            }
                        }
                    }
                },

            }
           
        })
        
       

        fetch('https://firestore.googleapis.com/v1/projects/fir-demo-99463/databases/(default)/documents/orders/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if(res.ok){
                    console.log('great')
                } else{
                    console.log('bad')
                }
            })
            
        
    // Order Completed
      wrapper.innerHTML = 
            ` <h1 class="text-3xl font-semibold mt-40 ">Thank You For Your Order! </h1>
                <h2>Your Order is being processed. Check your email for order confirmation.</h2>
                <a class=" px-3 py-3 mt-5 bg-black text-white" href="index.html">Back To HomePage </a>
            `

       
    // Reset Cart 
    localStorage.setItem('cart','[]');
        

    }

   
  

    payNowBtn.addEventListener('click', toPayment);