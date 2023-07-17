<template>
  <div class="outer">
    <div class="registration">
      <div class="tab">
        <button class="tablinks active" v-on:click="openTab('login')" id="login-tab">Önerilen Ürünler</button>
        <button class="tablinks" v-on:click="openTab('signup')" id="signup-tab">Categories</button>
      </div>

      <!-- <div id="login" class="tabcontent" v-if="operation === 'login'">
        <div v-for="(item, index) in products" :key="index">
          {{ item }}
          <button v-on:click="addProductModal(index)">Add product</button>
        </div>
      </div> -->
      <div id="login" class="tabcontent" v-if="operation === 'login'">
        <div class="product-list" v-for="(item, index) in products" :key="index">
          <span class="product-name">{{ item }}</span>
          <button class="add-product-btn" v-on:click="addProductModal(index)">Add product</button>
        </div>
      </div>

      <div id="signup" class="tabcontent" v-if="operation === 'signup'">
        <div v-for="(item, index) in categories" :key="index">
          {{ item }}
        </div>
      </div>
    </div>

    <div v-if="showModal" class="popup">
      <div class="popup-content">
        <button class="popup-close" @click="closePopup">×</button>
        <form v-on:submit.prevent="saveProduct">
          <div>
            <label for="product-name">Ürün Adı :</label>
            <input type="text" id="product-name" v-model="newProduct.name">
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
            <input type="file" id="product-image" v-on:change="handleProductImageUpload">
          </div>
          <button type="submit">Keydat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  mounted() {
    this.openTab(this.id);
  },
  data() {
    return {
      operation: 'login',
      categories: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"],
      products: ['A', 'B', 'C'],
      newProduct: {
        name: "",
        category: "",
        price: 0,
        quantity: 0,
        description: ""
      },
      showModal: false
    }
  },

  methods: {
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

    addProductModal() {
      this.showModal = true;
    }
  },
};
</script>


<style scoped >
.outer {
  margin-top: 150px;
}

.cls-btn {
  float: right;
  margin-left: 5px;

}

.error {
  display: none;
  background-color: red;
  color: white;
  padding: 10px;
  width: fit-content;
  margin: 0 auto;
}



/* product */
.product-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.add-product-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}

.add-product-btn:hover {
  background-color: #3e8e41;
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
}</style>
