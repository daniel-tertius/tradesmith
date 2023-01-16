<template>
  <li>
    <h2>{{ friend.name }}{{ friend.is_favourite ? " (Favourite)" : "" }}</h2>
    <button @click="toggleDisplayDetails">
      {{ display_details ? "Hide" : "Show" }} Details
    </button>
    <button @click="toggleIsFavourite">Toggle is Favourite</button>
    <div v-if="display_details">
      <ul>
        <li><strong>Contact Number:</strong> {{ friend.contact_number }}</li>
        <li><strong>Email Address:</strong> {{ friend.email_address }}</li>
      </ul>
      <button @click="toggleEditDetails">
        {{ show_edit_contact ? "Hide " : "" }}Edit Contact
      </button>

      <button @click="deleteContact">Delete</button>
      <edit-contact
        @edit-contact="editContact"
        v-if="show_edit_contact"
        :friend="friend"
      />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
  emits: ["toggle-favourite", "edit-contact", "delete-contact"],
  data() {
    return {
      display_details: false,
      show_edit_contact: false,
    };
  },
  methods: {
    toggleDisplayDetails() {
      this.display_details = !this.display_details;
    },
    toggleEditDetails() {
      this.show_edit_contact = !this.show_edit_contact;
    },
    editContact(friend) {
      this.toggleEditDetails();
      this.$emit("edit-contact", friend);
    },
    toggleIsFavourite() {
      this.$emit("toggle-favourite", this.friend.id);
    },
    deleteContact() {
      this.$emit("delete-contact", this.friend);
    },
  },
};
</script>