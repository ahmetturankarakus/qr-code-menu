
<template>
    <div class="admin-header admin-navbar">
        <img src="../assets/logo.svg" alt="logo" class="logo-image" />
        <nav class="admin-nav">
            <!-- <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul> -->
        </nav>
    </div>
</template>

<script>
export default {
    name: "AdminHeader"
};
</script>

<style scoped>
.admin-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f00707;
}

.admin-nav{
    margin-right: 40px;
}
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f30404;
    height: 5%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-nav {
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
}
</style>