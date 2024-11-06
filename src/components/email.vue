<template>
  <v-container
    data-aos="fade-in"
    data-aos-offset="1"
    data-aos-delay="50"
    data-aos-duration="600"
    data-aos-easing="ease-in-out"
    data-aos-once="true"
  >
    <div class="mt-5 d-flex justify-center">
      <v-col cols="12" md="4" sm="12">
        <form
          target="_blank"
          action="https://formsubmit.co/nimit.190410107143@gmail.com"
          method="POST"
          class="bg-grey-darken-4"
        >
          <div class="form-group">
            <div class="form-row">
              <v-text-field label="Label"></v-text-field>
              <v-text-field
                type="email"
                name="email"
                label="Email Address"
                filled
                dense
                flat
                dark
                outlined
              ></v-text-field>
            </div>
          </div>
          <div class="form-group">
            <v-textarea
              v-model="value"
              dark
              background="#202022"
              label="Message"
              name="message"
              filled
              color="#536DFE"
              dense
              flat
            ></v-textarea>
          </div>
          <v-btn
            id="buttonMain"
            type="submit"
            class="hvr-glow activeState pa-2 px-16 mt-10"
            target="_blank"
            outlined
            ripple
            color="indigo accent-2"
          >Send Message</v-btn>
        </form>
      </v-col>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "email",
  data: () => ({
    value: ""
  }),
};
</script>

<style scoped>
textarea {
  padding: 4px 20px;
}
form {
  padding: 10px 10px 30px 10px;
  height: auto;
  border: #202022 solid 3px;
  /* color: hsl(240, 13%, 34%); */
}
textarea:focus,
input:focus {
  outline: none;
}
#errorMsg {
  color: #d32f2f;
  font-size: 13px;
}
.activeState:active {
  transform: translateY(2px);
}
.theme--light.v-text-field--outline:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover {
  border-width: 1px;
  border-style: solid;
  border-color: #6fbd44;
}
</style>
