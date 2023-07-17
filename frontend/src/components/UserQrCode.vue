<template>
    <div class="outer" >
        <qrcode-vue :value="qrData" :size="qrSize" :fg-color="qrFgColor" :bg-color="qrBgColor" ref="qrcode" />
        <div>
        </div>
        <button @click="downloadQRCode">Download QR Code</button>
    </div>
    <!-- <ul>
        <li v-for="(category, index) in categories" :key="index">
            <h3>{{ category.name }}</h3>
            <ul>
                <li v-for="(menu, index) in category.menu" :key="index">
                    <div>{{ menu.name }}</div>
                    <div>{{ menu.description }}</div>
                    <div>{{ menu.price }}</div>
                    <img :src="menu.imageUrl" :alt="menu.name" />
                </li>
            </ul>
        </li>
    </ul> -->
</template>
  
<script>
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'
export default {
    name: "UserQrCode",
    props: {
        id: { type: Number },
    },
    components: {
        QrcodeVue,
    },
    data() {
        return {
            qrData: 'http://restuarent/qr-code/'+this.id,
            qrSize: 300,
            qrFgColor: '#000000',
            qrBgColor: '#ffffff',
            categories: null
        }
    },
    computed: {

    },
    methods: {
        downloadQRCode() {
            if (this.$el) {
                const canvas = this.$refs.qrcode.$el;
                const dataURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        ,
        setData() {
            axios.post('http://localhost:3000/company/qr-code', {

                companyId: 1
            })
                .then(response => {
                    this.qrData = JSON.stringify(response.data);
                    this.categories = this.qrData.categories;
                    this.generate = true;

                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    created() {
        // this.setData();
    }
}
</script>
<style scoped>
.outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
  }
  button {
    background-color: #4caf50;
    color: white;
    font-size: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 40px;
  }
  button:hover {
    background-color: #3e8e41;
  }
  
</style>
  