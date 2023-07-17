
<template>
  <div class="header navbar">
    <img src="../assets/logo.svg" alt="logo" class="logo-image" />
    <nav>
      <ul v-on:click="handleClick">
        <li>
          <a href="#section">Anasayfa</a>
        </li>
        <li>
          <a href="#section2">Özellikler</a>
        </li>
        <!-- <li>
          <a href="#section4">Fiyatlandırma</a>
        </li> -->
        <li>
          <a href="#section3">Nasıl Kullanılır?</a>
        </li>
        <li>
          <a href="#contact">İletişim</a>
        </li>
      </ul>
      <ul v-on:click="hideContent">
        <!-- <li><router-link to="/qr-code" >Menu</router-link></li> -->
        <li><router-link to="/register/signup" >Kayıt Ol</router-link></li>
        <li><router-link to="/register/login" >Giriş Yap</router-link></li>
      </ul>
    </nav>
  </div>

  <div v-if="isHome == 1">
    <div id="section" class="wrapper">
      <div class="image-container">
        <div class="left-container">
          <h2>ÜCRETSİZ DİJİTAL MENÜNÜ HEMEN OLUŞTUR.</h2>
          <img src="../assets/pizzaHome.jpg" id="img-pizza" alt="Image 1">
        </div>
        <img src="../assets/homepage.png" id="img-mobile" alt="Image 1">
      </div>
    </div>

    <div id="section2">
      <div class="section2">
        <div class="image-container">
          <img src="../assets/video-bg.jpg" alt="Image 1">
        </div>
        <div class="text-container">
          <h2>
            ÜCRETSİZ KAREKOD RESTAURANT MENÜ’YE HOŞ GELDİNİZ.
          </h2>
          <p>
            Restaurantınıza özel karekod temassız menü oluşturun. Karekod Restaurant Menü restaurant, hotel ve cafeler
            için
            oluşturulmuş özel bir temassız karekod menü yazılımıdır. Qr Kodlu menünüzü hemen şimdi oluşturup
            müşterilerinize
            temassız menünüzü sunabilirsiniz. Sonsuza kadar ücretsiz sunduğumuz bir yazılımdır.

            Karekod restaurant temassız menünüzü hemen şimdi oluşturarak işletmenizin fiziksel menü maliyetini
            azaltabilirsiniz. Dijital menünüz ile ürün fiyatlarınızı anlık düzenleyebilir, sınırsız kategori ve sınırsız
            ürün ekleyebilirsiniz. Üstelik tüm bunlar ücretsizdir.

            Karekod Restaurant Menü ile temassız menünüzü oluşturduğunuz için teşekkür eder, sağlıklı günler dileriz.
          </p>
        </div>
      </div>
      <!-- <div class="container">
        <div class="box">Sınırsız Karekod Oluşturma</div>
        <div class="box">Sınırsız Karekod Oluşturma</div>
        <div class="box">Sınırsız Karekod Oluşturma</div>
        <div class="box">Sınırsız Karekod Oluşturma</div>
        <div class="box">Sınırsız Karekod Oluşturma</div>
      </div> -->
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">15+</div>
          <div class="stat-label">Ülke</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">5.000+</div>
          <div class="stat-label">Restaurant</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">2.500.000+</div>
          <div class="stat-label">Menü Görüntüleme</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">7.000+</div>
          <div class="stat-label">Menü</div>
        </div>
      </div>


    </div>

    <div id="section3">
      <h2>Restaurant Kare Kod Temassız Menü Paketleri</h2>
      <p>Size özel oluşturulmuş paketlerimizden herhangi birini seçerek restaurantınıza özel kare kod temassız menünüzü
        oluşturmaya başlayın.</p>
      <div class="pricing-container">
        <div class="pricing-card">
          <h3>Ücretsiz Paket</h3>
          <ul>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü Ekleme</li>
          </ul>
          <button>Hemen Başlayın</button>
        </div>

        <div class="pricing-card">
          <h3>Restaurant Silver</h3>
          <ul>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 1 Adet</li>
          </ul>
          <button>SATIN AL</button>
        </div>

        <div class="pricing-card">
          <h3>Restaurant Gold</h3>
          <ul>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 3 Adet</li>
          </ul>
          <button>SATIN AL</button>
        </div>

        <div class="pricing-card">
          <h3>Restaurant Platinum</h3>
          <ul>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 10 Adet</li>
          </ul>
          <button>SATIN AL</button>
        </div>
      </div>
      <h3>
        Bayilik Kare Kod Temassız Menü Paketleri

      </h3>

      <div class="pricing-container">
        <div class="pricing-card">
          <h3>Ajans Silver</h3>
          <ul>
            <li>Paket Süresi 1 Yıl</li>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 25 adet + 5 adet hediye</li>
          </ul>
          <div class="pricing-info">
            <p>2.000,00 TL / yıllık</p>
            <button>SATIN AL</button>
          </div>
        </div>

        <div class="pricing-card">
          <h3>Ajans Gold</h3>
          <ul>
            <li>Paket Süresi 1 Yıl</li>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 50 adet + 10 adet hediye</li>
          </ul>
          <div class="pricing-info">
            <p>3.500,00 TL / yıllık</p>
            <button>SATIN AL</button>
          </div>
        </div>

        <div class="pricing-card">
          <h3>Ajans Platinum</h3>
          <ul>
            <li>Paket Süresi 1 Yıl</li>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Reklamsız Menü: 100 adet + 20 adet hediye</li>
          </ul>
          <div class="pricing-info">
            <p>6.000,00 TL / yıllık</p>
            <button>SATIN AL</button>
          </div>
        </div>

        <div class="pricing-card">
          <h3>Ajans Platinum Sınırsız</h3>
          <ul>
            <li>Sınırsız Reklamlı Menü Oluşturma</li>
            <li>Sınırsız Dil Ekleme</li>
            <li>Sınırsız Kategori Ekleme</li>
            <li>Sınırsız Ürün Ekleme</li>
            <li>Sınırsız Reklamsız Menü</li>
          </ul>
          <div class="pricing-info">
            <p>Fiyat için</p>
            <button>İLETİŞİME GEÇİN</button>
          </div>
        </div>
      </div>

    </div>


    <!-- <div id="section4">
      <h2>Ücretsiz Karekod Restaurant Menü ile Temassız Menü Nasıl Oluşturulur?</h2>
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/IQW0trb36HM" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div> -->
    <div id="contact">
      <h2>Contact Us</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
      <div class="contact-info">
        <h3>Get in Touch</h3>
        <p><i class="fa fa-envelope"></i> Email: <a href="mailto:contact@restaurant.com">contact@restaurant.com</a></p>
        <p><i class="fa fa-map-marker"></i> Address: 123 Main Street, City, Country</p>
        <div class="social-icons">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
          <a href="#"><i class="fa fa-youtube"></i></a>
        </div>
      </div>

    </div>
  </div>
  <div v-else>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      isHome: 1
    }
  },
  methods: {
    hideContent() {
      this.isHome = 0;
    }
    ,
    showContent() {
      this.isHome = 1;
    },
    handleClick() {
      this.isHome = 1;
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style>



.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-container {
  padding: 5px;
  display: flex;
}

#img-mobile {
  margin-top: 5%;
  width: 30%;
  overflow: auto
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  /* other styling */
}

.wrapper {
  padding: 0 50px;
  background-color: rgb(255, 51, 0);
}

.left-container {
  width: 70%;
  padding: 5px;
  margin-top: 8%;
}

#img-pizza {
  width: 80%;
  height: 50%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}

nav {
  display: flex;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 20px;
}

a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.logo-image {
  width: 130px;
  height: 50px;
  background-color: rgb(255, 34, 0);
}

.section2 {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image-container {
  flex-basis: 50%;
  margin-right: 1rem;
}

.text-container {
  flex-basis: 60%;
}

.container {
  display: flex;
}

.box {
  width: 111px;
  height: 100px;
  background-color: white;
  border: 1px solid black;
  margin-right: 10px;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.stat-box {
  width: 23%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.stat-value {
  font-size: 40px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 18px;
  font-weight: bold;
  color: #777;
  text-align: center;
  margin-top: 10px;
}

/* section 3 */

/* Styling for the pricing container */
.pricing-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f5f5f5;
}

/* Styling for the pricing cards */
.pricing-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 450px;
  width: 250px;
  overflow: hidden;
}


/* Styling for the pricing card titles */
.pricing-card h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Styling for the pricing card lists */
.pricing-card ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

/* Styling for the pricing card list items */
.pricing-card li {
  font-size: 16px;
  padding: 5px 0;
  color: #666;
}

/* Styling for the pricing card buttons */
.pricing-card button {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Hover styling for the pricing card buttons */
.pricing-card button:hover {
  background-color: #666;
}

#section4 {
  background-color: #f7f7f7;
  padding: 50px 0;
}

#section4 h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 32px;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 20;
  left: 40;
  width: 60%;
  height: 80%;
}

/*contact us*/
#section5 {
  background-color: #f2f2f2;
  padding: 50px;
}

#section5 h2 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  max-width: 500px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 10px;
}
h2,h3{
  text-align: center;
}
#section3 p {
  text-align: center;
}
input,
textarea {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
}

button[type="submit"] {
  display: block;
  margin: 0 auto;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.contact-info {
  margin-top: 50px;
}

.contact-info h3 {
  text-align: center;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.contact-info p i {
  margin-right: 10px;
}

.social-icons {
  text-align: center;
}

.social-icons a {
  display: inline-block;
  margin-right: 20px;
}

.social-icons a:last-child {
  margin-right: 0;
}
nav{
  margin-right: 39px;

}
</style>
