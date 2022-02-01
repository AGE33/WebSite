var commonService = new CommonService();
var httpService = new HttpService();

function isAuthenticated(){
    var token = this.commonService.getFromStorage('token');
    if(token){
        $('#authenticatedUser').show();
        $('#notAuthenticatedUser').hide();
    } else{
        $('#notAuthenticatedUser').show();
        $('#authenticatedUser').hide();
    }
    
    
}
isAuthenticated();

CookieConsent()
function CookieConsent(){
    var accepted = commonService.getFromStorage('CookieConsent')
    if(accepted) {
        $('#CookieConsent').hide();
        commonService.setToStorage('CookieConsent', ture);
    }else {
        $('#CookieConsent').show();
    }
    //html +css pentru modal https://freefrontend.com/bootstrap-cookie-consent/
    //verificam in storage daca utilizatorul o dat agree la cookie
    //daca o dat nu afisam panoul cu cookie si buton
    //daca nu o dat afisam panoul
    //cand user-ul da click, salvam in storage ca userul o fost de acord
    //si urmatoarea data cand o sa intre pe pagina si o sa reia de la pasul 1 nu o sa 
    //se afiseze panoul
}
//modificati 
function register() {
    var name = $("#registerNameId").val();
    var email = $("#registerEmailId").val();
    var pass = $("#registerPassId").val();

    httpService.register(new User(name, email, pass));
}

function login(){
    var email = $("#loginEmailId").val();
    var pass = $("#loginPassId").val();

    if(email && pass){
        httpService.login(new User("",email,pass));
    }else{
        commonService.showError("You need to fill in credentials");
    }

    
}

function logOut(){
    commonService.logOut();
}

function getProducts(){
    var products = httpService.getProducts();
    if(products){
        var html = commonService.getFormmatedProducts(products);
        $("#productList").html(html);
    } else {
        commonService.showError("No products exist");
    }
}

function getProducts(){
    var products = httpService.getProducts();
    if(products){
        var html = commonService.getFormmatedProducts(products);
        $("#productList").html(html);
    } else {
        commonService.showError("No products exist");
    }
}

function addProduct(){
    var name = $("#productNameId").val();
    var description = $("#productDescriptionId").val();
    var price = $("#productPriceId").val();
    var productImg = $("#productImgId").val();

    httpService.addProduct(new Product(name, description, price, productImg));
}

function removeProduct(id){
    httpService.removeProduct(id);
    getProducts();
}



function changePassword(){
    var newPass = $("#changePasswordId").val();

    httpService.changePassword(newPass);
}

function changeName(){
    var newName = $('#changeNameIds').val();

    httpService.changeName(newName);
}

function removeAccount(){
    var response = confirm("Are you sure ?");
    if(response){
        httpService.removeAccount();
    }
}

function showProduct(productId){
    var product = httpService.getProductById(productId);
    var productDetailHtml = commonService.getFormmatedProduct(product);
    commonService.setToStorage("productId", productDetailHtml);

    commonService.redirect("productDetails.html");
}

function setProductDetails(){
    var productDetailHtml = commonService.getFromStorage("productId");
    $("#productDetailsId").html(productDetailHtml);
}

function addReview(productId){
    var title = $('#reviewTitleId').val();
    var description = $('#reviewDescriptionId').val();

    var review = new Review(title, description);
    httpService.addReview(productId, review);
}

function AddProductToFavorites(id){
    var product = httpService.getProductById(id);

    var favoriteProductsJson = commonService.getFromStorage('favorites');
    var favoriteProducts = commonService.Deserialize(favoriteProductsJson);
    if(!favoriteProducts){
        favoriteProducts = [];
    } 
    favoriteProducts.push(product);
    var productListJson  = commonService.Serialize(favoriteProducts);
    commonService.setToStorage('favorites', productListJson);
    commonService.showMessage('Product was added');
    commonService.redirect("favorites.html");
}

function AddProductToCart(id){
    var product = httpService.getProductById(id);
    if(window.localStorage.getItem('sum') == null)
        window.localStorage.setItem('sum', 0);
    var sum = window.localStorage.getItem('sum');
    
    sum = parseFloat(sum) + parseFloat(product['price'])
    window.localStorage.setItem('sum', sum)
    var cartProductsJson = commonService.getFromStorage('cart');
    var cartProducts = commonService.Deserialize(cartProductsJson);
    if(!cartProducts){
        cartProducts = [];
    } 
    cartProducts.push(product);
    var productListJson  = commonService.Serialize(cartProducts);
    commonService.setToStorage('cart', productListJson);
    commonService.showMessage('Product was added');
    commonService.redirect("cart.html");
}

function showCart(){
    var productsJson = commonService.getFromStorage('cart');
    var productList = commonService.Deserialize(productsJson);
    // console.log (localStorage.getItem('cart'))

    if(productList){
        var html = commonService.getFormmatedProductsFromCart(productList);
        $("#cartProductsId").html(html);
        
        var totalSum = window.localStorage.getItem('sum'); 
        for(let index = 0; index < productList.lenght; index++){
            const product =  productList[index]
            totalSum += Number(product.price);
            
        }
        var TVA = totalSum * 0.2;
        $("#totalSum").text(totalSum);
        $("#TVA").text(TVA.toFixed(2));
        
    } else {
        localStorage.setItem('sum',0);
        commonService.showError("No products exist");
        
    }
    
    //modificati aceasta functie sa calculeze suma produselor din cosul de cumparaturi
    //adaugati un buton de buy care iti afiseaza un mesaj ca produsele au fost cumparate
    //stergem datele din cart () cu ajutorul functiei removeKey() din commonService;
}
function Buy(){
    
    window.localStorage.setItem('cart', null)
    location.reload()
    alert("Thank you for your choice!");
    // commonService.redirect("products.html");
}
function removeCart(id){
    commonService.removeKey(id, 'cart');
}


function showFavorites(){
    var productsJson = commonService.getFromStorage('favorites');
    var productList = commonService.Deserialize(productsJson);
    if(productList){
        var html = commonService.getFormmatedProductsFromFavorites(productList);
        $("#favoriteProductsId").html(html);
    } else {
        commonService.showError("No products exist");
    }
}
function removeFavorites(id){
    commonService.removeKey(id, 'favorites');
    
    
}

function sendMessage(){
    var name = $('#contactPageNameId').val();
    var message = $('#contactMessageNameId').val();

    var message = new Message(name, message);
    httpService.sendMessage(message);
}

function AddRating(productId, rating){
    var product = httpService.getProductById(productId);
    httpService.addRating(product, rating);
}
function getBlogPosts(){
    var blogs = httpService.getBlogPosts();
    var blogsHtml = commonService.getFormmatedBlogs(blogs);
    $("#blogPostsId").html(blogsHtml);
}
function setCurrentDate(){
    var currentDate = new Date().toLocaleString();
    $('#currentDateId').text(currentDate);
}
function subscribeEmail(){ 
    var email = $('#subscribeEmailid').val();
    var emailListJson = commonService.getFromStorage('emailSubscribe');
    if(emailListJson){
        var emailList = commonService.Deserialize(emailListJson);
        emailList.push(email);
        var emailListUpdatedJson = commonService.Serialize(emailList);
        commonService.setToStorage('emailSubscribe', emailListUpdatedJson);
    }else{
        var emptyEmailList = [];
        emptyEmailList.push(email);
        var emailListUpdatedJson = commonService.Serialize(emptyEmailList);
        commonService.setToStorage('emailSubscribe', emailListUpdatedJson);
    }
}

function search() {
    var searchQuery = $('#searchBarId').val();
    var products = httpService.getProducts();
    var filteredProducts = commonService.searchProducts(searchQuery,products);
    if(filteredProducts){
        var html = commonService.getFormmatedProducts(filteredProducts);
        $("#productList").html(html);
    } else {
        commonService.showError("Not found!");
    }
}