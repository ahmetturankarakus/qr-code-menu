<template>
    <div class="outer">
        <div class="top-bar">
            <input type="text" class="search" name="search" v-model="searchTerm">
            <button @click="openPopup" class="add-branch-btn"> Add Branch </button>
        </div>
        <div v-if="showPopup" class="popup" ref="popup">
            <div class="popup-content">
                <button class="popup-close" @click="closePopup">×</button>
                <div class="popup-tabs">
                    <button class="popup-tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1">Section 1</button>
                    <button class="popup-tab" :class="{ active: activeTab === 2 }" @click="activeTab = 2">Section 2</button>
                </div>
                <div class="popup-sections">
                    <div class="popup-section scale-left" v-if="activeTab === 1">
                        <h2>Section 1</h2>
                        <div>
                            <label for="branchName">Şube Adı:</label>
                            <input type="text" id="branchName" name="branchName">
                        </div>
                        <div>
                            <label for="phone">Telefon:</label>
                            <input type="text" id="phone" name="phone">
                        </div>
                        <div>
                            <label for="address">Adres:</label>
                            <input type="text" id="address" name="address">
                        </div>
                        <div>
                            <label for="city">Şehir:</label>
                            <input type="text" id="city" name="city">
                        </div>
                        <div class="form-wrapper-left">
                            <div>
                                <label for="tableNumber">Masa Sayısı:</label>
                                <input type="number" id="tableNumber" name="tableNumber" min="1" max="100">

                            </div>
                            <div style="margin-left: 30px;">
                                <label for="logo">Logo:</label>
                                <input type="file" id="logo" name="logo">
                            </div>
                        </div>

                        <div>
                            <button class="save" @click="addBranch" id="saveBranch">Kaydet</button>
                        </div>
                    </div>

                    <div class="popup-section extra" v-if="activeTab === 2">
                        <h2>Section 2</h2>
                        <div class="form-wrapper">
                            <div> <label for="wifiName">Wifi Adı:</label>
                                <input type="text" id="wifiName" name="wifiName">
                            </div>
                            <div> <label for="wifiPassword">Wifi Şifresi:</label>
                                <input type="password" id="wifiPassword" name="wifiPassword">
                            </div>
                        </div>
                        <div class="form-wrapper">
                            <div>
                                <label for="whatsapp">Whatsapp:</label>
                                <input type="text" id="whatsapp" name="whatsapp">
                            </div>
                            <div>
                                <label for="googleMaps">Google Harita Kordinat:</label>
                                <input type="text" id="googleMaps" name="googleMaps">
                            </div>

                        </div>
                        <div class="form-wrapper">

                            <div>
                                <label for="facebook">Facebook:</label>
                                <input type="text" id="facebook" name="facebook">
                            </div>
                            <div>
                                <label for="instagram">Instagram:</label>
                                <input type="text" id="instagram" name="instagram">
                            </div>
                        </div>
                        <div class="form-wrapper">

                            <div>
                                <label for="twitter">Twitter:</label>
                                <input type="text" id="twitter" name="twitter">
                            </div>
                            <div>
                                <label for="youtube">Youtube:</label>
                                <input type="text" id="youtube" name="youtube">
                            </div>
                        </div>

                        <div class="form-wrapper">
                            <div>
                                <label for="tiktok">TikTok:</label>
                                <input type="text" id="tiktok" name="tiktok">
                            </div>
                            <div>
                                <label for="telegram">Telegram:</label>
                                <input type="text" id="telegram" name="telegram">
                            </div>
                        </div>
                        <div class="scale-left">
                            <label for="vk">VK:</label>
                            <input type="text" id="vk" name="vk">
                        </div>
                        <div>
                            <button class="save">Kaydet</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="card-container">
        <div class="card" v-for="(item, index) in filteredItems" :key="index">
            <div class="dropdown">
                <div class="threeDots" @click="toggleDropdown(index)"><b>...</b></div>
                <div class="dropdown-content" :class="{ active: dropdownActive[index] }">
                    <div>
                        <router-link :to="{ name: 'category', params: { id: item.id } }">Create Menu</router-link>
                        <a @click="editBranch(item)">Edit Branch</a>
                        <a @click="showDeletePopup(item)">Delete Branch</a>
                    </div>
                </div>
            </div>
            <p class="status">Open</p>
            <img src="https://via.placeholder.com/50" alt="Logo">
            <div class="card-header">
                <h3>{{ item.name }}</h3>
            </div>
            <div class="card-content">
                <p>{{ item.address }}</p>
                <span> {{ item.phone }} - </span>
                <span> {{ item.tables }} Masa</span>

                <button class="qr-btn"><router-link :to="{ name: 'qr-code', params: { id: item.id } }"
                        target="_blank">Generate QR Code</router-link></button>
            </div>
        </div>
    </div>
    <!-- Confirmation popup for deleting a branch -->
    <div class="delete-branch-popup" v-if="DeletionPopup">
        <div class="delete-branch-popup-content">
            <h2>Confirm Branch Deletion</h2>
            <p>Are you sure you want to delete this branch?</p>
            <div class="popup-buttons">
                <button class="cancel-button" @click="closeDeletePopup">Cancel</button>
                <button class="confirm-button" @click="deleteBranch" id="delete-btn">Delete</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchTerm: "",
            showPopup: false,
            activeTab: 1,
            dropdownActive: [],
            menuItems: [],
            currentBranch: 0,
            DeletionPopup: false,
        };
    },
    computed: {
        filteredItems() {
            return this.menuItems.filter((item) =>
                item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },

    methods: {
        showDeletePopup(branch) {
            this.currentBranch = branch;
            this.DeletionPopup = true;

        },
        closeDeletePopup() {
            this.DeletionPopup = false;
        },
        deleteBranch() {
            document.getElementById('delete-btn').innerHTML = 'Deleting...'
            axios.post('http://localhost:3000/company/delete', { branchId: this.currentBranch.id })
                .then((response) => {
                    if (response.data.status === 'success') {
                        this.setCompanies();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        editBranch(branch) {
            this.openPopup();
            this.$nextTick(() => {
                document.getElementById('branchName').value = branch.name;
                document.getElementById('phone').value = branch.phone;
                document.getElementById('address').value = branch.address;
                document.getElementById('city').value = branch.city;
                document.getElementById('tableNumber').value = branch.tables;
                document.getElementById('saveBranch').innerText = 'Update';
                this.currentBranch = branch.id;
            });
        },
        cleanFields() {
            document.getElementById('branchName').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('address').value = '';
            document.getElementById('city').value = '';
            document.getElementById('tableNumber').value = '';
            document.getElementById('saveBranch').innerText = 'Save';
        },
        openPopup() {
            this.showPopup = true;
        },
        closePopup() {
            this.showPopup = false;
            this.cleanFields();

        },
        toggleDropdown(index) {
            this.dropdownActive[index] = !this.dropdownActive[index];
        },
        setCompanies() {
            axios.post('http://localhost:3000/company/all', { userId: localStorage.getItem('userDetails') })
                .then(response => {
                    this.DeletionPopup = false;
                    if (response.data.status === 'success') {
                        this.menuItems = response.data.companies
                    }
                    else if(response.data.status === 'failure') {
                        this.menuItems = [];
                    }
                });
        },
        addBranch() {
            let branchApi = 'http://localhost:3000/company/add';
            const data = {
                name: document.getElementById('branchName').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                tables: parseInt(document.getElementById('tableNumber').value),
                userId: parseInt(localStorage.getItem('userDetails'))
            };
            if (document.getElementById('saveBranch').innerHTML === 'Update') {
                document.getElementById('saveBranch').innerHTML = 'Updating...';
                document.getElementById('saveBranch').style.pointerEvents = 'none'
                data.branchId = this.currentBranch;
                branchApi = 'http://localhost:3000/company/update';
            }
            axios.post(branchApi, data)
                .then(response => {
                    if (response.data.status === 'success') {
                        this.setCompanies();
                        this.closePopup();
                    }
                    else {
                        console.log('error');
                    }
                });

        }
    },
    created() {
        this.setCompanies();

    }
};
</script>
  
<style scoped>
.extra {
    margin-left: 25px !important;
}

a:hover {
    cursor: pointer;
}

.outer {
    margin-top: 160px;
}

input[type=file] {
    padding: 8px !important;
}

.form-wrapper {
    display: flex;
    flex-direction: row;
}

.form-wrapper-left {
    display: flex;
    flex-direction: row;

}

label {
    margin-bottom: 7px !important;
    display: block !important;
}

.form-wrapper div {

    display: flex;
    flex-direction: column;
    margin-right: 30px;
}

.form-wrapper-left div {
    width: 50%;
    display: flex;
    flex-direction: column;
}

input {
    border: 1px solid #080707;

}

button:hover {
    cursor: pointer;
}

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
}

.popup-content {
    background-color: white;
    padding: 20px;
    width: 500px;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.popup-tabs {
    display: flex;
    margin-bottom: 10px;
}

.popup-tab {
    width: 80%;
    margin-right: 10px;

    background-color: white;
    border: none;
    border-left: 4px solid transparent;
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
}

.popup-tab.active {
    background-color: rgb(255, 5, 22);
    color: #f7f6f6;
}

.popup-sections {
    display: flex;
}

.popup-section {
    flex: 1;
    margin-right: 10px;
}

.scale-left {
    margin-right: 45px;
}

.add-branch-btn {
    display: inline-block;
    background: linear-gradient(to bottom, #fb2331, #ed2143);
    color: #fff;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.add-branch-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.add-branch-btn::before {
    content: "+";
    font-size: 24px;
    margin-right: 8px;
}


.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: start;
    height: 50px;
    padding-left: 50px;
}

.search {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    float: left;
    height: 50px;
}

.add-branch-btn {
    padding: 5px 22px;
    width: 250px;
    height: inherit;
    border-radius: 5px;
    background-color: #008CBA;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    float: right;
    margin-left: 20px;
    margin-bottom: 22px;
}

.save {
    background-color: #18b145;
    border: none;
    border-radius: 3px;
    font-size: 15px;
    font-weight: 500;
    padding: 10px;
    color: #fff;
    outline: none;
}

/* car css*/
.card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 2%;
    margin-bottom: 2%;
    width: 20%;
    overflow: hidden;
}

.card img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin: 10px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f1f1f1;
}

.card-header h2 {
    font-size: 24px;
    margin: 0;
}

.status {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.card-content {
    padding: 10px;
}

.card-content p {
    font-size: 16px;
    margin-bottom: 20px;
}

.qr-btn {
    display: block;
    margin: 0 auto;
    padding: 8px 12px;
    background-color: #0077cc;
    color: #fff;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.qr-btn:hover {
    background-color: #005fa3;
}

.card-container {
    padding: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    ;
}



.dropdown {
    position: absolute;
    display: flex;
    float: right;
    margin-left: 182px;
}



.dropdown-content {
    display: none;
    position: absolute;
    z-index: 1;
}

.dropdown-content.active {
    display: block;
    width: 30%;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 5px;
    margin-right: 30%;
    margin-top: 30px;
    position: inherit;

}

.dropdown-content a {
    color: black;
    padding: 5px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.threeDots {
    background-color: #fff;
    color: #999;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transform: rotate(90deg);
    font-weight: 500;
}

.threeDots:hover {
    color: #000;
}

/* confirm deleltion popup*/
/* Styles for the confirmation popup */
.delete-branch-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.delete-branch-popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 500px;
    width: 100%;
    text-align: center;
}

.delete-branch-popup-content h2 {
    margin-top: 0;
    font-size: 24px;
}

.delete-branch-popup-content p {
    margin-bottom: 20px;
}

.popup-buttons {
    display: flex;
    justify-content: center;
}

.popup-buttons button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.popup-buttons .cancel-button {
    margin-right: 10px;
    background-color: #ccc;
    color: #fff;
    border: none;
}

.popup-buttons .cancel-button:hover {
    background-color: #999;
}

.popup-buttons .confirm-button {
    background-color: #f44336;
    color: #fff;
    border: none;
}

.popup-buttons .confirm-button:hover {
    background-color: #d32f2f;
}
</style>

