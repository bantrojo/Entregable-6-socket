//const { path } = require('express/lib/application');
const fs = require('fs')
const pathToProducts = __dirname + '/../files/products.json'

// class productContainer {

//     get = async () => {
//         if (fs.existsSync(pathToProducts)) {
//             try {
//                 let data = await fs.promises.readFile(pathToProducts, 'utf-8');
//                 let products = JSON.parse(data);
//                 // if(products)return products;
//                 return { status: "success", products:products}
//             } catch (error) {
//                 return { status: "error", error: error }
//             }
//         } else {
//             return { status: "error no items", products: [] }
//         }
//     }

//     add = async (product) => {
//         if (fs.existsSync(pathToProducts)) {
//             try {
//                 let data = await fs.promises.readFile(pathToProducts)
//                 let products = JSON.parse(data);
//                 if (products.length === 0) {
//                     product.id = 1;
//                     products.push(product);
//                     await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
//                     return { status: "success", message: "product created" }
//                 }
//                 product.id = products[products.length - 1].id + 1;
//                 products.push(product);
//                 await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
//                 return { status: "success", message: "Product created" }
//             }
//             catch (error) {
//                 return { status: "error", error: error }
//             }
//         } else {
//             try {
//                 product.id = 1;
//                 await fs.promises.writeFile(pathToProducts, JSON.stringify(product, null, 2))
//                 return { status: "success", message: "product created" }
//             } catch (error) {
//                 return { status: "error", error: error }
//             }
//         }
//     }
   
// }


const fetch = async() =>{
    let data = await fs.promises.readFile(pathToProducts,'utf-8');
    let products = JSON.parse(data);
    return products;
}

class productContainer{
    get = async() =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let products = await fetch();
                return {status:"success",payload:products}

            }catch(error){
                return {status:"error",error:error}
            }
        }
    }
    add = async(product) =>{
        if(fs.existsSync(pathToProducts)){
            try{
                let products = await fetch();
                if(products.length===0){
                    product.id = 1;
                    await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                    return {status:"success",message:"Product added"}
                }
                product.id = products[products.length-1].id+1;
                products.push(product);
                await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))
                return {status:"success",message:"Product added"}

            }catch(error){
                return {status:"error",error:error}
            }
        }
        product.id = 1;
        await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
        return {status:"success",message:"Product added"}
    }
}


module.exports = productContainer;