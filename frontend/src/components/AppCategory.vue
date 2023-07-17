<template>
    <div class="outer">
        <div class="category-container">
            <div class="draft-categories">
                <h3>Draft Categories</h3>
                <ul class="col-dir">
                    <li v-for="(category, index) in draftCategories" :key="index">
                        {{ category.name }}
                        <span class="category-buttons">
                            <button class="remove" @click="removeCategory(index, category)">Remove</button>
                            <button class="save" @click="saveCategory(category, index)">Save</button>
                        </span>
                    </li>
                </ul>
            </div>

            <div class="saved-categories">
                <h3>Saved Categories</h3>
                <ul class="col-dir">
                    <li v-for="(category, index) in savedCategories" :key="index">
                        {{ category.name }}
                        <button class="menu-btn"> <router-link to="/products" @click="storeCategory(category,category.categoryId)">Menu</router-link></button>
                    </li>
                </ul>
            </div>
            <div class="universal-categories">
                <h3>Universal Categories</h3>
                <div class="search-container">
                    <input type="text" v-model="search" placeholder="Search..." class="searchBar">
                </div>
                <ul class="col-dir">
                    <li v-for="(category, index) in filteredUniversalCategories" :key="index">
                        <span>{{ category.name }}</span>
                        <button v-if="!category.selected" class="add" @click="addCategory(category,index)">Add</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'AppCategory',
    props: {
        id: { type: Number },
    },
    data() {
        return {
            universalCategories: [],
            draftCategories: [],
            savedCategories: [],
            search: ''
        };
    },
    computed: {
        filteredUniversalCategories() {
            return this.universalCategories.filter((item) =>
                item.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    created() {
        this.getAllCategories();
        this.getSavedCategories();
        localStorage.setItem('companyId', this.id);
    },
    mounted() {
        console.log(this.id);
    },
    methods: {
        storeCategory(cat,categoryId) {
            console.log('care',cat);
            localStorage.setItem('categoryId', categoryId);
        },
        addCategory(category,index) {
            this.draftCategories.push(category);
            this.universalCategories[index].selected = true;
        },
        removeCategory(index, category) {
            this.draftCategories.splice(index, 1);
            this.universalCategories.forEach(element => {
                if (element.name == category.name) {
                    element.selected = false;
                }
            });

        },
        saveCategory(category, index) {
            console.log('consoling............',category,this.savedCategories)
            this.savedCategories.push(category);
            this.draftCategories.splice(index, 1);
            axios.post('http://localhost:3000/category/add', {
                name: category.name,
                companyId: this.id
            })
                .then(response => {
                    console.log(response);
                    this.getSavedCategories();
                })
                .catch(error => {
                    console.log(error);
                });

        },
        deleteCategory(index) {
            this.savedCategories.splice(index, 1);
        },
        getAllCategories() {
            axios.get('http://localhost:3000/category/all')
                .then(response => {
                    if(response.data.categories!==undefined){
                        this.universalCategories = response.data.categories;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getSavedCategories()
        {
            axios.post('http://localhost:3000/category/saved',{companyId:this.id})
                .then(response => {
                    if(response.data.categories!==undefined){
                        this.savedCategories = response.data.categories;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

}
</script>
<style scoped>
.outer {
    margin-top: 50px;
}

.category-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.draft-categories,
.saved-categories {
    width: 32%;
    max-height: 500px;
    overflow-y: auto;
}
.searchBar{
    display: block;
    width: 92%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 2px solid #959595;

}
.draft-categories {
    width: 33%;
    margin-right: 20px;
    max-height: 500px;
    overflow-y: auto;
}

.universal-categories {
    width: 33%;
    max-height: 500px;
    overflow-y: auto;
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
}

.col-dir {

    flex-direction: column;
}

li {
    margin-bottom: 10px;
    display: block;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;


}

li span {
    flex-grow: 1;
    margin-right: 10px;
}

.category-buttons button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    float: right;
}

.add {
    background-color: #4CAF50;
    color: white;
    padding: 5px;
    width: 10%;
    float: right;
    border: none;
}
.menu-btn{
    background-color: #4CAF50;
    color: white;
    padding: 5px;
    width: 10%;
    float: right;
    border: none;
    float:right
}
.menu-btn a{
    color:white;
    text-decoration:none;
}

.delete {
    background-color: #f44336;
    color: white;
}

.remove,
.save {
    background-color: #13ba00;
    color: white;
}

button:hover {
    cursor: pointer;
}
</style>