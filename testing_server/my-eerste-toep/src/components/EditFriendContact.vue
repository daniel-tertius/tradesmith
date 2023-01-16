<template>
  <form @submit.prevent="editFriend">
    <header>{{ friend ? "Edit" : "Add" }} Contact Details</header>
    <div>
      <label>Name:</label>
      <input v-model="name" type="text" />
    </div>

    <div>
      <label>Contact Number:</label>
      <input v-model="contact_number" type="tel" />
    </div>

    <div>
      <label>Email Address:</label>
      <input v-model="email_address" type="email" />
    </div>

    <button>Save</button>
  </form>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object || undefined,
      required: false,
      default: null,
    },
  },
  emit: ["edit-contact"],
  data() {
    return {
      name: this.friend?.name || "",
      email_address: this.friend?.email_address || "",
      contact_number: this.friend?.contact_number || "",
    };
  },
  methods: {
    toggleIsFavourite() {
      this.is_favourite = !this.is_favourite;
    },
    editFriend() {
      if (!this.name || !this.contact_number || !this.email_address) {
        console.error("Not all friend info is given!");
        return;
      }

      const friend = {
        id:
          this.friend?.id || this.name.replace(/\s/g, "_").toLowerCase().trim(),
        name: this.name.trim(),
        contact_number: this.contact_number,
        email_address: this.email_address,
        is_favourite: false,
      };
      this.$emit("edit-contact", friend);

      this.name = this.email_address = this.contact_number = null;
    },
  },
};
</script>