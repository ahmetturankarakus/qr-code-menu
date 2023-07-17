<template>
    <div class="outer">
        <div class="company-info">
            <div class="company">
                <span><img src="https://via.placeholder.com/120" alt="Logo"></span>
                <span class="top-text company-name">Company Name</span>
                <div
                class="branch-link"
                > <router-link :to="{ name: 'branch' }">Branches</router-link></div>
            </div>
        </div>
        <div class="registration">
            <div class="tab">
                <button class="tablinks active" v-on:click="openTab('login')" id="login-tab">Products</button>
                <button class="tablinks" v-on:click="openTab('signup')" id="signup-tab">Categories</button>
            </div>

            <div id="login" class="tabcontent" v-if="operation === 'login'">
                <div v-for="(item, index) in products" :key="index" class="products">
                    <span style="font-size: 17px;">{{ item }}</span>
                    <button v-on:click="addProductModal(index, item)" class="add-product-btn">Ürünü Ekle</button>
                </div>
            </div>

            <div id="signup" class="tabcontent" v-if="operation === 'signup'">
                <div v-for="(item, index) in categories" :key="index"
                    style="display: flex; align-items: center; padding: 10px;" class="cat-item"
                    @click="setCurrentCategory(item)">
                    <img src="https://via.placeholder.com/100" alt="Logo" style="margin-right: 20px;" class="cat-image">
                    <span class="top-text cat-name" style="font-size: 18px;">{{ item.name }}</span>
                </div>
            </div>
        </div>
        <div v-if="showModal" class="popup">
            <div class="popup-content">
                <button class="cls-btn" @click="closePopup()" id="close-btn">×</button>
                <form v-on:submit.prevent="saveProduct">
                    <div class="input-container">
                        <input type="text" id="product-Name" v-model="selectedProduct" @click="toggleDropdown" />
                        <div class="dropdown-menu" v-show="isDropdownOpen">
                            <div v-for="(product, index) in products" :key="index" @click="selectProduct(product)">
                                {{ product }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="product-price">Price:</label>
                        <input type="number" id="product-price" v-model="newProduct.price">
                    </div>
                    <div>
                        <label for="product-description">Ürün Açıklaması:</label>
                        <textarea id="product-description" v-model="newProduct.description"></textarea>
                    </div>
                    <div>
                        <label for="product-image">Image:</label>
                        <input type="file" id="product-image" v-on:change="handleProductImageUpload($event)">
                    </div>
                    <button type="submit" @click="saveMenu()" id="save-menu">Keydat</button>
                </form>
            </div>
        </div>
        <div style="display:flex;justify-content:space-between">
            <div style="width:70%">
                <div class="menu-list" v-for="(item, index) in currentMenus" :key="index">
                    <ul>
                        <li>
                            <div class="menu-item">
                                <div class="menu-image">
                                    <img :src="item.imageUrl" alt="Menu Image">
                                </div>
                                <div class="menu-details">
                                    <h3 class="menu-name">{{ item.name }}</h3>
                                    <p class="menu-description">{{ item.description }}</p>
                                    <span class="menu-price">{{ item.price + ' TL' }}</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>

            <div style="width:30%">
                <button class="add-product" @click="showAddModal()"> Add Product </button>
            </div>
        </div>


    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'AppProduct',
    mounted() {
        this.setSavedCategories();
        this.setGeneralProducts();
    },
    data() {
        return {
            operation: 'login',
            categories: [],
            isDropdownOpen: false,
            selectedProduct: '',
            products: [],
            menu: [],
            currentMenus: [],
            newProduct: {
                name: "",
                category: "",
                price: 0,
                quantity: 0,
                description: ""
            },
            showModal: false,
            image: '',
            imageUrl: "https://storage.googleapis.com/restaurant-c72af.appspot.com/arch.jpeg"
        }
    },
    created() {
        this.getMenusByCategory();
    },
    methods: {
        showAddModal() {
            this.showModal = true;
        },
        saveMenu() {
            const formData = new FormData()
            formData.append('image', this.image);
            formData.append('name', this.selectedProduct);
            formData.append('price', document.getElementById('product-price').value);
            formData.append('description', document.getElementById('product-description').value);
            formData.append('categoryId', localStorage.getItem('categoryId'));
            formData.append('companyId', localStorage.getItem('companyId'));
            document.getElementById('save-menu').innerHTML = 'Adding....'
            axios.post('http://localhost:3000/menu/add', formData)
                .then(response => {
                    console.log(response.data);
                    this.getMenusByCategory();
                    this.showModal = false;
                })
                .catch(error => {
                    console.log(error);
                });

        },
        handleProductImageUpload(event) {
            const files = event.target.files;
            this.image = files[0];
            console.log(this.image);
        },
        setGeneralProducts() {
            axios.get('http://localhost:3000/menu/get-general-products')
                .then(response => {
                    this.menu = response.data.menu;
                    this.menu.forEach(
                        (item) => {
                            this.products.push(item.name);
                        }
                    )
                })
                .catch(error => {
                    console.log(error);
                });
        },
        setSavedCategories() {
            axios.post('http://localhost:3000/category/saved', { companyId: localStorage.getItem('companyId') })
                .then(response => {
                    console.log(response.data);
                    this.categories = response.data.categories;
                })
                .catch(error => {
                    console.log(error);
                });

        },

        openTab(tabName) {
            this.operation = tabName;
            if (this.operation == 'login') {
                document.getElementById("login-tab").classList.add("active");
                document.getElementById("signup-tab").classList.remove("active");
            }
            else {
                document.getElementById("login-tab").classList.remove("active");
                document.getElementById("signup-tab").classList.add("active");
            }
        },
        closePopup() {
            this.showModal = false;
        },
        removeCategory(index) {
            this.categories.splice(index, 1);
        },

        saveCategory(index) {
            console.log("Save category", index);
        },

        addProduct() {
            this.products.push(this.newProduct);
            this.newProduct = {
                name: "",
                category: "",
                price: 0,
                quantity: 0,
                description: ""
            };
            this.showModal = false;
        },

        addProductModal(index, name) {
            this.showModal = true;
            setTimeout(
                () => {
                    document.getElementById("product-Name").value = name;
                }, 1000);


        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectProduct(product) {
            this.selectedProduct = product;
            this.isDropdownOpen = false;
        },
        getMenusByCategory() {

            axios.post('http://localhost:3000/menu/get-menus', {

                companyId: localStorage.getItem('companyId'),
                categoryId: localStorage.getItem('categoryId')
            })
                .then(response => {
                    console.log("getMenusByCategory", response)
                    this.currentMenus = response.data.menus;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        setCurrentCategory(category) {
            localStorage.setItem('categoryId', category.categoryId);
            this.getMenusByCategory();

        }
    },

};
</script>
  
  
<style scoped >
.top-text {

    z-index: 2;
    font-size: 16px;
    font-weight: bold;
    color: #050505;
}

.outer {
    margin-top: 30px;
}

.cls-btn {
    pointer-events: all !important;
    float: right;
    position: relative;
    z-index: 9999;
}

button:hover {
    cursor: pointer;
}

.error {
    display: none;
    background-color: red;
    color: white;
    padding: 10px;
    width: fit-content;
    margin: 0 auto;
}

/*tabs*/
.registration {
    width: 18%;
    margin: 0 auto;
    margin-top: 7px;
    padding: 2px;
    border-radius: 5px;
    float: left;
}

.tab {
    overflow: hidden;
    border: 1px solid #ccc;
    width: 100%;
}

.tab button {
    float: left;
    border: none;
    cursor: pointer;
    padding: 10px 10px;
    transition: 0.3s;
    width: 50%;
    font-size: 17px;
}

.tab button.active {
    border-bottom: 2px solid #d60404;
}

.tab button:hover {
    background-color: #ddd;
}



.add-product-btn {
    font-size: 13px;
    border-radius: 3px;
    background-color: #4CAF50;
    color: white;
    padding: 5px;
    border: none;
    cursor: pointer;
}

.products {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;

}

.company-info {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.company {
    width: 98%;
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
}

.company-name {
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
}

.cat-image {
    width: 100%;
    height: 100px;
    background-color: #ccc;
}

.cat-name {
    position: absolute;
    margin-left: 80px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
}

.cat-item:hover {
    cursor: pointer;
}

/* Popup modal */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    padding: 10px;
}


.popup-content {
    background-color: #fff;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .1);
    position: relative;
    z-index: 2;
    width: 90%;
    max-width: 500px;
}

.popup-content label {
    display: block;
    margin-bottom: 5px;
}

input,
select,
textarea {
    width: 90%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

form button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 8px;
    margin: 8px 0;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    width: 20%;
}

/*dropdown */
.dropdown-menu {
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 10;
    background-color: white;
    border: 1px solid #ccc;
    padding: 5px;
}

.dropdown-menu div {
    cursor: pointer;
    padding: 5px;
}

.input-container {
    position: relative;
}

input {
    padding-right: 20px;
}

/*menu*/
.menu-list {
    max-width: 800px;
    margin: 0 auto;
    margin-right: 50px;
}

.menu-item {
    display: flex;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
}

.menu-image {
    width: 25%;
    height: 50px;
}

.menu-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.menu-details {
    width: 70%;
    padding: 10px;
}

.menu-details h3 {
    font-size: 24px;
    margin: 0;
    padding: 0;
}

.menu-description {
    font-size: 16px;
    margin: 5px 0;
}

.menu-price {
    font-size: 20px;
    margin: 10px 0;
    font-weight: bold;
}

.add-product {
    padding: 12px 22px;
    width: 100%;
    border-radius: 5px;
    margin-top: 7px;
    background-color: #f00707;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    float: right;
}
.branch-link{
    position: absolute;right: 50px;
    padding: 5px;
    background-color: #f6f0f0;
    border-radius: 2px;
    margin-bottom: 100px;
}
</style>
  