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

// RUN THIS CODE TO HAVE SUPER ADMIN ACCESS TYPE (Edited - Jeff)

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
//             "/app-settings/view",
//             "/app-settings",
//             "/designations",
//             "/disciplines",
//             "/access-settings",
//             "/heiTypes",
//             "/app-settings/add",
//             "/reporting",
//             "/evaluationins/view",
//             "/rqat/add",
//             "/employees/add",
//             "/rqat",
//             "/application:id",
//             "/hei/add",
//             "/hei/edit",
//             "/rqat/edit",
//             "/employee/edit",
//             "/heiTypes",
//             "/cmo"
//         ],
//     }).then((accesstype) => {
//         const Designations = Parse.Object.extend("Designations");
//         const newDesignation = new Designations();

//         newDesignation.save({
//             name: "SUPER ADMIN",
//         }).then((designation) => {
//             const user = new Parse.User();
//             var employeeName = {
//             lastname: "Ched",
//             firstname: "Region V",
//             middleinitial: "N/A",
//             };
//             user.set("name", employeeName);
//             user.set("contact_num", "09123456789");
//             user.set("username", "CHEDROV");
//             user.set("password", "password");
//             user.set("email", "chedrov@gmail.com");
//             user.set("access_type", accesstype.id);
//             user.set("designation", designation.id);
//             try {
//             user.save();
//             // Hooray! Let them use the app now.
//             } catch (error) {
//             // Show the error message somewhere and let the user try again.
//             alert("Error: " + error.code + " " + error.message);
//             }
//         }, (error) => {
//             console.log('error: ' + error.message)
//         })

//     }, (error) => {
//         console.log('error: ' + error.message);
//     });
// } catch (error) {
//     alert("Error: " + error.code + " " + error.message);
// }

// const accessType1 = Parse.Object.extend("AccessTypes");
// const newAccessType1 = new accessType1();
// try {
//     newAccessType1.save({
//         name: "HEI",
//         hometype: "/hei/home",
//         privileges: ["/hei/apply", "/hei/application", "/hei/application/:id", "/hei/account"],
//     });
// } catch (error) {
//     alert("Error: " + error.code + " " + error.message);
// }
// const accessType2 = Parse.Object.extend("AccessTypes");
// const newAccessType2 = new accessType2();
// try {
//     newAccessType2.save({
//         name: "RQAT",
//         hometype: "/rqat/assignments",
//         privileges: ["/rqat/assignments", "/rqat/history", "/rqat/account"],
//     });
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
