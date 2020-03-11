<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex>
          <v-card max-width="450" class="elevation-12 mx-auto">
            <v-card-title>
              <v-spacer />
              <h3 class="color-primary">Home Smart Meter</h3>
              <v-spacer />
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-text>
                <v-alert v-show="error" dense text type="error" icon="warning">{{ error }}</v-alert>
                <v-text-field
                  outlined
                  label="Email"
                  type="text"
                  required
                  :rules="emailRule"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="
										showPassword
											? 'visibility'
											: 'visibility_off'
									"
                  @click:append="showPassword = !showPassword"
                  required
                  :rules="passRule"
                  v-model="password"
                ></v-text-field>
                <v-progress-linear
                  :active="loading"
                  :indeterminate="loading"
                  rounded
                  color="primary"
                ></v-progress-linear>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn width="300" dark rounded large color="primary" @click="signin">Sign in</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-form>
            <v-row justify="space-around" v-if="loading">
              <v-progress-circular indeterminate size="30" color="primary"></v-progress-circular>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AUTH_REQUEST } from "../../store/action/authentication";

export default {
  name: "SignIn",
  data: () => ({
    valid: true,
    showPassword: false,
    loading: false,
    error: "",
    password: undefined,
    passRule: [
      password => !!password || "password is required",
      password =>
        /(?=.{8,})/.test(password) || "password must be at least 8 characters"
    ],
    email: undefined,
    emailRule: [
      email => !!email || "email is required",
      email =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          email
        ) || "email must be valid"
    ]
  }),
  methods: {
    signin() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch(AUTH_REQUEST, {
            email: this.email,
            password: this.password
          })
          .then(() => {
            // this.$router.push("/");
            location.replace("/admin");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

