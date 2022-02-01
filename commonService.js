class CommonService {
    getFormmatedProducts(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
                concatenatedProducts += 
                    `<div class="col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4  ">
                        <div class="container " >   
                            <div class="row " >         
                            
                                <div class="container mb-2 ">

                                    <img src="${this.GetUrl(String(product.name))}"class=" card-img-top mt-2 mb-4" alt="Responsive image">

                                    <h2 class="card-title mx-2 col-dm-12" onclick="showProduct(${product.id})" >${product.name}</h2>
                                    <p class="card-text mx-2 col-lg-12 px-2 ">${product.description}</p>
                                    <hr/>
                                    <p class="mx-2 fs-3 col-dm-6 ">${product.price}  Lei</h4>
                                </div>
                                
                                <div class="container col-dm-6 my-0 mb-2 ">
                                    
                                    <input type="button" onclick="removeProduct(${product.id})" class="position-relative w-10 btn btn-sm btn-danger px-50 my-1" value="Remove"/>

                                    <input type="button" onclick="AddProductToFavorites(${product.id})" class="position-relative w-10 btn btn-sm btn-warning px-50 text- my-1" value="Add Favorites"/>
                                    
                                    <input type="button" onclick="AddProductToCart(${product.id})"class="position-relative w-10 btn btn-sm btn-warning px-50 text- my-1" value="Add Cart"/>

                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    `
                    
        }
        return concatenatedProducts;
    }
    

    getProductRating(products){
        var rating = Math.floor(products.avgRating);
        var concatenatedRating= '';
        for (let index = 0; index < rating; index++) {
            concatenatedRating += "AddRating";
            
        }
        return concatenatedRating;
    }


    getFormmatedProductsFromCart(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            if(product){
                concatenatedProducts += 
                `<div class=" col-sm-12 col-md-12  mb-4  ">
                    <div class="container">   
                        <div class=" mw-10">         
                        
                            <div class=" mb-4 ">

                                <img src="${this.GetUrl(String(product.name))}" class="card-img-top mt-2 mb-2 "style="width: 9rem;" >

                                <h3 class=" mx-2 " onclick="showProduct(${product.id})" >${product.name}  </h3>
                                
                                <p class="mx-2 fs-3 float-end ">${product.price}  Lei</h4>
                              
                                
                            </div>
                            <div class="">
                            
                                <input type="button" onclick="removeCart(${product.id})" class="position-relative w-10 btn btn-sm btn-danger px-50 my-1" value="Remove From Cart"/>
                                
                                <input type="button" onclick="AddProductToFavorites(${product.id})"class="position-relative w-10 btn btn-sm btn-warning px-50 text- my-1" value="Add To Favorites"/>

                                <hr/>


                            </div>
                            
                        </div>
                        
                    </div>
                            
                </div>
                
                `
            }
           
        }
        return concatenatedProducts;
    
    }
    
    
    getFormmatedProductsFromFavorites(products){
        var concatenatedProducts ='';
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            if(product){
                concatenatedProducts += 
                `<div class="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-fluid-2 mb-4 ">
                    <div class="container">   
                        <div class="row  ">         
                        
                            <div  class="container mb-4 ">

                                <img src="${this.GetUrl(String(product.name))}"class="card-img-top mt-2 mb-2" >

                                <h2 class="card-title mx-2 col-dm-12" onclick="showProduct(${product.id})" >${product.name}</h2>
                                <p class="card-text mx-2 col-dm-6">${product.description}</p>

                                <hr/>
                                <p class="mx-2 fs-3 col-dm-6">${product.price}  Lei</h4>
                                
                            </div>
                            <div class="container col-dm-6 my-0 mb- ">
                            
                                <input type="button" onclick="removeFavorites(${product.id})" class="position-relative w-10 btn btn-sm btn-danger px-50 my-1" value="Remove From Favorites"/>
                                
                                <input type="button" onclick="AddProductToCart(${product.id})"class="position-relative w-10 btn btn-sm btn-warning px-50 text- my-1" value="Add To Cart"/>

                                

                            </div>
                        </div>
                    </div>
                            
                </div>
                `
            }
        }
        return concatenatedProducts;
    
    }


    getFormmatedProduct(product){
        return `<div class = "container col-lg-12">
                    <div class = "row">
                        <h1>${product.name}</h2>
                        <p>${product.description}</p>
                        <h5>${product.price} Lei </h5>
                        <img src="${this.GetUrl(String(product.name))} "class=" mb-4" style="width: 80rem;" >
                        <div style="row">Rating is ${product.rating.avgRating.toFixed(2)} out of 5 </div>
                            <div class="rate">
                                <input type="radio" id="star5" name="rate" onclick="AddRating(${product.id}, 5)" value="5" />
                                <label for="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" name="rate" onclick="AddRating(${product.id}, 4)" value="4" />
                                <label for="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" name="rate" onclick="AddRating(${product.id}, 3)" value="3" />
                                <label for="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" name="rate" onclick="AddRating(${product.id}, 2)" value="2" />
                                <label for="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" name="rate" onclick="AddRating(${product.id}, 1)" value="1" />
                                <label for="star1" title="text">1 stars</label>
                                
                            </div>
                        
                            ${this.getReviewHtml(product.id)}
                            ${this.getReviewsHtml(product)}
                        </div>
                        
                    </div>
                </div>`
    }

    getReviewsHtml(product){
        var reviews = product.reviews;
        var concatenatedReviews = '';
        for (let index = 0; index < reviews.length; index++) {
            concatenatedReviews+= 
            `
            <div class ="">
                <div class = "col-lg-6">
                    <h4>${reviews[index].title}</h4>
                    <p>${reviews[index].description}</p>
                </div>
            </div>        
            `
        }
        return concatenatedReviews;
    }
    getReviewHtml(productId){
        return ` 
            <div class = "">
                <h4>Review:</h4>
                <label for="reviewTitleId">Title</label>
                <input type="text" class="form-control mb-4" id="reviewTitleId">
                <label for="reviewDescriptionId">Description</label>
                <textarea type="text" class="form-control mb-4 "rows="6" id="reviewDescriptionId"></textarea>
                <input type="button" class="form-control btn-secondary"onclick="addReview(${productId})" value="Add Review">
            </div>
        
        `
    }

    getFormmatedBlogs(blogs){
        var concatenatedBlogs ='';
        for (let index = 0; index < blogs.length; index++) {
            const blog = blogs[index];
            concatenatedBlogs+= 
            `
            <div class="container mb-4 ">
                <div class="row mw-10">
                    <h1>${blog.title}</h1>
                    <p>${blog.body}</p>
                    <img src="${this.GetRandomUrl()} " class="card img-fluid mt-2 mb-2 col-6" style="width: 30rem;"/>
                </div>
            </div>
            `
        } 
        return concatenatedBlogs; 
    }

    showMessage(message){
        $("#messagePanel").addClass("successMessage");
        $("#messagePanel").removeClass("errorMessage");
        $("#messagePanel").html(message);
    }
    showError(error){
        $("#messagePanel").addClass("errorMessage");
        $("#messagePanel").removeClass("successMessage");
        $("#messagePanel").html(error);
    }
    setToStorage(key, value){
        window.localStorage.setItem(key, value);
    }
    getFromStorage(key){
        return window.localStorage.getItem(key);
    }
    removeKey(key, type){
        var array = JSON.parse(window.localStorage.getItem(type));
        var sum = parseFloat(window.localStorage.getItem('sum'))
        console.log(array)
        for(let i = 0; i < array.length; i++){
            
            var element = array[i]
            if(element['id'] == key)
                {
                    array.splice(i, 1);
                    sum = sum - parseFloat(element['price'])
                }
        }
        window.localStorage.setItem(type, JSON.stringify(array))
        window.localStorage.setItem('sum', sum)
        location.reload()
        
    }
    redirect(path){
        window.location.href = path;
    }
    logOut(){
        window.localStorage.removeItem("token");
        this.redirect("login.html");
    }
    Serialize(object){
        return JSON.stringify(object);
    }
    Deserialize(json){
        return JSON.parse(json);
    }



    GetUrl(name){
        var UrlList = [];
        if(name!= null && name.includes("P-45")){
            UrlList = [
            "https://www.soundstudio.ro/poze/pian-digital-yamaha-p-45.jpg",
            "http://www.magazinmuzical.ro/image/cache/produse/cu%20clape/yamaha%20p45-800x800.jpg",
            "https://www.soundstudio.ro/poze/set-pian-digital-yamaha-p-45-set-11569831618.jpg",
            ];
        }else if (name!= null && name.includes("P-515B")){
            UrlList = [
            "https://thumbs.static-thomann.de/thumb/orig/pics/bdb/443118/13689396_800.jpg",
            
            ];
        }else if (name!= null && name.includes("FP-10-BK")){
            UrlList = [
            "https://muzikercdn.com/uploads/products/6454/645402/thumb_d_gallery_base_a9a98d6e.jpg",
            
            ];
        }else if (name!= null && name.includes("CLP-745")){
            UrlList = [
            "https://thumbs.static-thomann.de/thumb/orig/pics/prod/497373.jpg",
            
            ];
        }else if (name!= null && name.includes("CVP 701")){
            UrlList = [
            "https://www.soundstudio.ro/poze/thumb/220-pian-digital-yamaha-cvp-701-pe.jpg",
            
            ];
        }else if (name!= null && name.includes("CDP-S100BK")){
            UrlList = [
            "https://muzikercdn.com/uploads/products/5944/594446/main_c736f5bf.jpg",
            
            ];
        }
        var randomNumber = Math.floor(Math.random(UrlList.length));
        return UrlList[randomNumber];
    }

    GetRandomUrl(){
        var listOfUrls = [
            "https://www.soundstudio.ro/poze/pian-digital-yamaha-p-45.jpg",
            "http://www.magazinmuzical.ro/image/cache/produse/cu%20clape/yamaha%20p45-800x800.jpg",
            "https://www.soundstudio.ro/poze//pian-digital-yamaha-p-45-b1603281682.jpg",
            "https://www.soundstudio.ro/poze/set-pian-digital-yamaha-p-45-set-11569831618.jpg",
            "https://frankfurt.apollo.olxcdn.com/v1/files/rd7nhlo1rwhp1-RO/image;s=1000x700"
        ];

        var randomNumber = Math.floor(Math.random() * 5);
        return listOfUrls[randomNumber];
    }


    searchProducts(searchQuery, products){
        var searchProducts = [];
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                searchProducts.push(product);
            }
        }
        return searchProducts;
    }   

}   

