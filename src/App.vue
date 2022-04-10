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
// RUN THIS CODE TO HAVE A TEMPORARY SUPER ADMIN ACCOUNT
// const user = new Parse.User();
// user.set("firstname", "MyFirstName");
// user.set("middlename", "MyMidName");
// user.set("lastname", "MyLastName");
// user.set("email", "chedrov@gmail.com");
// user.set("contact_no", "09123456789");
// user.set("username", "CHEDROV");
// user.set("password", "c");
// user.set("employee_type", "super admin");
// user.set("user_type", "super admin");

// try {
//    user.save();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

// RUN THIS CODE TO HAVE A TEMPORARY ADMIN ACCOUNT
// const user = new Parse.User();
// user.set("firstname", "MyFirstName");
// user.set("middlename", "MyMidName");
// user.set("lastname", "MyLastName");
// user.set("email", "admin@gmail.com");
// user.set("contact_no", "09123456789");
// user.set("username", "ADMIN");
// user.set("password", "admin");
// user.set("employee_type", "admin");
// user.set("user_type", "admin");

// try {
//    user.signUp();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

// RUN THIS CODE TO HAVE A TEMPORARY EDUCATION SUPERVISOR ACCOUNT
// const user = new Parse.User();
// user.set("firstname", "MyFirstName");
// user.set("middlename", "MyMidName");
// user.set("lastname", "MyLastName");
// user.set("email", "educsupervisor@gmail.com");
// user.set("contact_no", "09123456789");
// user.set("username", "EDUCATIONSUPERVISOR");
// user.set("password", "educationsupervisor");
// user.set("employee_type", "education supervisor");
// user.set("user_type", "education supervisor");

// try {
//    user.signUp();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

// RUN THIS CODE TO HAVE A TEMPORARY RQAT ACCOUNT
// const user = new Parse.User();
// user.set("firstname", "MyFirstName");
// user.set("middlename", "MyMidName");
// user.set("lastname", "MyLastName");
// user.set("email", "rqat@gmail.com");
// user.set("contact_no", "09123456789");
// user.set("username", "RQAT");
// user.set("password", "rqat");
// user.set("employee_type", "rqat");
// user.set("user_type", "rqat");

// try {
//    user.signUp();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }

// RUN THIS CODE TO HAVE A TEMPORARY REPORTING ACCOUNT
// const user = new Parse.User();
// user.set("firstname", "MyFirstName");
// user.set("middlename", "MyMidName");
// user.set("lastname", "MyLastName");
// user.set("email", "reporting@gmail.com");
// user.set("contact_no", "09123456789");
// user.set("username", "REPORTING");
// user.set("password", "reporting");
// user.set("employee_type", "reporting");
// user.set("user_type", "reporting");

// try {
//    user.signUp();
//   // Hooray! Let them use the app now.
// } catch (error) {
//   // Show the error message somewhere and let the user try again.
//   alert("Error: " + error.code + " " + error.message);
// }


// RUN THIS CODE TO HAVE A TEMPORARY HEI ACCOUNT
// const newHEI = new Parse.User();
// newHEI.set("hei_name", "HEI");
// newHEI.set("username", "HEI");
// newHEI.set("password","hei");
// newHEI.set("email", "hei@gmail.com");
// newHEI.set("address","hei Address");
// newHEI.set("number", "09123456789");
// newHEI.set("inst_code", "7890");
// newHEI.set("hei_type", "heiType");
// newHEI.set("user_type", "hei");

// try {
//    newHEI.save();
// } catch (error) {
//   alert("Error: " + error.code + " " + error.message);
// }
//RUN THIS CODE TO LOGOUT
// Parse.User.logOut();
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
