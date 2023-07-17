<template>
  <div class="registration top">
    <div class="tab">
      <button class="tablinks active" v-on:click="openTab('login')" id="login-tab">Login</button>
      <button class="tablinks" v-on:click="openTab('signup')" id="signup-tab">Sign Up</button>
    </div>

    <div id="login" class="tabcontent" v-if="operation === 'login'">
      <h2>Login Form</h2>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" v-on:click.prevent="login">
      </form>
    </div>

    <div id="signup" class="tabcontent" v-if="operation === 'signup'">
      <h2>Sign Up Form</h2>
      <form>
        <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname"><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" v-on:click.prevent="signup">
      </form>
    </div>

  </div>


  <div id="failure" class="error">
    <span id="failure-msg">signup failed</span>
    <button onclick="document.getElementById('failure').style.display = 'none';" class="cls-btn">X</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterUser',
  address: 'http://localhost:3000',
  props: ['id'],
  mounted() {
    this.openTab(this.id);
  },
  data() {
    return {
      operation: 'login'
    }
  },
  methods: {
    login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      axios.post('http://localhost:3000/user/login', {
        email: username,
        password: password
      })
        .then(response => {
          console.log(response);
          if (response.data.message) {
            document.getElementById('failure').style.display = 'block';
            document.getElementById('failure-msg').innerText = response.data.message;
            return;
          }
          localStorage.setItem('userDetails', response.data.id); 
          this.$router.push({ name: 'branch' });
        })
        .catch(error => {
          console.log(error);
        });
    },
    signup() {

      const username = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      axios.post('http://localhost:3000/user/signup', {
        name: username,
        password: password,
        email: email
      })
        .then(response => {
          console.log(response);
          localStorage.setItem('userDetails', response.data.id); 
          this.$router.push({ name: 'branch' });
          
        })
        .catch(error => {
          console.log(error);
        });
    }
    ,
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
    }
  }
}
</script>
<style scoped>
.top{
  margin-top: 150px;
}
  /* Tabs */
  .tab {
    overflow: hidden;
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  .tab button {
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 18px;
    width: 50%;
    transition: background-color 0.3s;
  }

  .tab button:hover {
    background-color: #ddd;
  }

  .tab button.active {
    background-color: #ccc;
  }

  /* Form */
  form {
    margin: 20px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #c5c5c5 !important;
  }

  input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    width: 105%;
    transition: background-color 0.3s;
  }

  input[type="submit"]:hover {
    background-color: #3e8e41;
  }

  /* Error message */
  .error {
    background-color: #f44336;
    color: white;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    display: none;
    position: relative;
    width: 12%;
    margin-left: 44%;
  }

  .error #failure-msg {
    margin-right: 20px;
  }

  .cls-btn {
    position: absolute;
    top: 0;
    right: 0;
    background-color: inherit;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 20px;
    padding: 0 10px;
  }

  .cls-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* Registration container */
  .registration {
    max-width: 600px;
    padding: 20px;
    margin-left: 30%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  /* Form header */
  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
</style>

<!-- <style>
.cls-btn{
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

.registration {
  width: 50%;
  margin: 0 auto;
  margin-top: 150px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: #ccc;
}
.tablinks{
  width: 50%;
}
input{
  border-color: black;
}

input[type='submit']:hover{
  background-color: #fc3939;
  color: white;
  cursor: pointer;
}


</style> -->
