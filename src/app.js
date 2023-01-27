"use strict";



const itemSection = document.getElementById('items');
const filterButtons = document.getElementById('filter-buttons')


fetch('https://fakestoreapi.com/products/')
    .then(res => res.json())
    .then(data => renderApp(data));




    function renderApp(data){
        console.log(data)
        const arr = data;
        const sortedItemCategorys = [...new Set(arr.map(item => item.category))]
        console.log(sortedItemCategorys)

        sortedItemCategorys.forEach(element => {
            filterButtons.innerHTML += 
            `<button class =" mx-10 my-10 px-2 py-2  border-2 border-black rounded-lg hover:bg-black hover:text-white">${element.toUpperCase()}</button>`
        })


        for (const item of data) {
            let imageURL = item.image;
            let titles = item.title;
            let price = item.price;
            itemSection.innerHTML +=
            `<article class=" flex flex-col items-center justify-center w-96 h-96">
            <img src="${imageURL}" alt="" width = "200" class=" w-60 h-60">
            <h2 class=" pt-10">${titles}</h2>
            <h2 class=" text-sm text-gray-400">KR ${price} SEK</h2>
            </article>`

            
        } 
    }