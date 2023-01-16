<template>
  <section>
    <header><h1>My Contacts</h1></header>
    <edit-contact @edit-contact="addContact" />
    <ul>
      <friend-contact
        v-for="friend in friends"
        :key="friend.id"
        :friend="friend"
        @toggle-favourite="toggleFavouriteFriendContact"
        @edit-contact="editContact"
        @delete-contact="deleteContact"
      ></friend-contact>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          id: "manual",
          name: "Manual Lorenz",
          contact_number: "1234567890",
          email_address: "123@example.com",
          is_favourite: false,
        },
        {
          id: "julie",
          name: "Julie Jones",
          contact_number: "0987654321",
          email_address: "098@example.com",
          is_favourite: false,
        },
        {
          id: "tertius",
          name: "Tertius van Niekerk",
          contact_number: "1236547890",
          email_address: "321@example.com",
          is_favourite: false,
        },
      ],
    };
  },
  methods: {
    toggleFavouriteFriendContact(friend_id) {
      const friend = this.friends.find((friend) => friend.id === friend_id);
      friend.is_favourite = !friend.is_favourite;
    },
    addContact(friend) {
      if (!friend) {
        console.error("No Friend Received.");
        return;
      }

      this.friends.push(friend);
    },
    editContact(new_friend) {
      if (!new_friend) {
        console.error("No Friend Received.");
        return;
      }

      const friend = this.friends.find((friend) => friend.id === new_friend.id);
      if (!friend) {
        console.error("Could not find friend with id:", new_friend.id);
        return;
      }

      Object.assign(friend, new_friend);
    },
    deleteContact(friend) {
      if (!friend) {
        console.error("No Friend Received.");
        return;
      }

      this.friends = this.friends.filter((friend) => friend.id !== friend.id);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost&display=swap");
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  margin-inline: 0.5rem;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 8rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}
</style>