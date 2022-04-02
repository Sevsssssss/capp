<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script>





import Parse from "parse";
Parse.serverURL = "http://localhost:1337/api";
Parse.initialize(
  "capp",
  ";9*$KS97:Ru]</umSs5t>^qW9>e)Rf5+0lhx}B20ys0lS?JnFGWCa!a7k=_8M.o","master"
);

// const GameScore2 = Parse.Object.extend("GameScore2");
// const gameScore = new GameScore2();

// gameScore.set("score", 1337);
// gameScore.set("playerName", "Sean Plott");
// gameScore.set("cheatMode", false);

// gameScore.save().then(
//   (gameScore) => {
//     // Execute any logic that should take place after the object is saved.
//     alert("New object created with objectId: " + gameScore.id);
//   },
//   (error) => {
//     // Execute any logic that should take place if the save fails.
//     // error is a Parse.Error with an error code and message.
//     alert("Failed to create new object, with error code: " + error.message);
//   }
// );

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
