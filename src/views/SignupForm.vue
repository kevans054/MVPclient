<template>
    <div id=signup>
        <div class="row">
            <div class="col">
                <h1>Create your Calgary Connects Account</h1>
            </div>
        </div>
        <div class="container border border-dark rounded">
             <form class="form-signin" @submit.prevent="signupUser">
                <div class="row">
                    <div class="col"><br><br>
                        <input type="text" label="1" id="emailfield" v-model="email" class="starndard-input" placeholder="Email address">
                    </div>
                </div>
                <div class="row">
                    <div class="col"><br>
                        <input type="text" autocomplete="username" id="usernamefield" v-model="username" class="standard-input" placeholder="Username">
                    </div>
                </div>
                <div class="row">
                    <div class="col"><br>
                        <input type="password" autocomplete="password" id="passwordfield" v-model="userpassword" placeholder="Password">
                    </div>
                </div>
                <div class="row">
                    <div class="col"><br>
                        <button class="btn btn-outline-light btn-sm" @click="signupUser">Sign up</button>
                        <br><br>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <button class="btn btn-outline-light btn-sm" @click="redirect">I Already have an Account</button><br>
                        <br>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: 'SignupForm',

        data() {
            return {
                userId: Number,
                email: "",
                username: "",
                password: "",
                loginToken: "",
                userpassword: ""
            }
        },
        methods: {
            signupUser: function() {
                axios.request({
                    method: "POST",
                    url: "http://127.0.0.1:5000/api/user",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        email: this.email,
                        user_name: this.username,
                        password: this.userpassword
                    }
                }).then((response) => {
                    console.log(response)
                    cookies.set('session', response.data.loginToken)
                    cookies.set('userId', response.data.userId)
                    cookies.set('userName', response.data.user_name)
                    cookies.set('Userpassword', "userpassword"),
                    this.$router.push("/feed")
                }).catch((error) => {
                    alert("No account with that email or password found. Please create your account.")
                    console.log(error)
                })
            },

            redirect: function () {
            this.$router.push({ name: 'LoginForm' })
            }
        }
    }
</script>

<style lang="scss">
 
</style>