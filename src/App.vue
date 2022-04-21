<template>
<!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
<router-view />
</template>

<script>
import Parse from "parse";
Parse.serverURL = "http://localhost:1337/api";
Parse.initialize(
    "capp",
    ";9*$KS97:Ru]</umSs5t>^qW9>e)Rf5+0lhx}B20ys0lS?JnFGWCa!a7k=_8M.o",
    "master"
);
Parse.masterKey = "master"
// RUN THIS CODE TO HAVE A TEMPORARY SUPER ADMIN ACCOUNT
// const user = new Parse.User();
// var employeeName = {
//   lastname: "Ched",
//   firstname: "Region V",
//   middleinitial: "N/A",
// };
// user.set("name", employeeName);
// user.set("contact_num", "09123456789");
// user.set("username", "CHEDROV");
// user.set("password", "password");
// user.set("email", "chedrov@gmail.com");
// user.set("access_type", "SUPER ADMIN");
// user.set("designation", "SUPER ADMIN");
// try {
//   user.save();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

// RUN THIS CODE TO HAVE SUPER ADMIN ACCESS TYPE

// const accessType = Parse.Object.extend("AccessTypes");
// const newAccessType = new accessType();
// try {
//     newAccessType.save({
//         name: "SUPER ADMIN",
//         hometype: '/home',
//         privileges: [
//             "/application",
//             "/hei",
//             "/hei/upload",
//             "/employees",
//             "/rqat-assignment",
//             "/evaluationins",
//             "/evaluationins/add",
//             "/app-settings/appTypeView",
//             "/app-settings",
//             "/designations",
//             "/disciplines",
//             "/access-settings",
//             "/app-settings/add",
//             "/reporting",
//             "/evaluationins/view",
//             "/rqat/add",
//             "/employees/add",
//             "/rqat",
//             "/application:id",
//             "/hei/add"
//         ],
//     });
//     if (
//         confirm(
//             "Application Type added. Would you like to add another Application Type?"
//         )
//     ) {
//         document.location.reload();
//     } else {
//         document.location.reload();
//     }
// } catch (error) {
//     alert("Error: " + error.code + " " + error.message);
// }

export default {};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
