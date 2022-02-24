const socket = io();
let form = document.getElementById("productForm");
form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    console.log('hola');
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val,key)=>sendObj[key]=val);
    socket.emit("sendProduct",sendObj);
    form.reset();
})


socket.on('productLog',(data)=>{
    let products = data.payload;
    let productsTemplate = document.getElementById("productsTemplate");
    fetch('templates/newestProducts.handlebars').then(response=>{
        return response.text();
    }).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({products})
        productsTemplate.innerHTML = html;
    })
})