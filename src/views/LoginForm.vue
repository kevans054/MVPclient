<template>
    <div id="login">
        <div><br>
            <h1>Welcome to Calgary Connects!</h1>
            <br>
        </div>
        <div class="container border border-dark rounded"><br>
            <form class="form-signin" @submit.prevent="loginUser">
            <h2 class="form-signin-heading">Please sign in</h2><br>
            <input type="username" autocomplete="username" id="inputUsername" class="form-control" v-model="username" placeholder="username"><br>
            <input type="password" autocomplete="password" id="inputPassword" class="form-control" v-model="password" placeholder="password">
            <div><br>
                <button  class="btn btn-outline-light btn-sm" type="submit">Sign in</button>
                <br><br>
            </div>
            <div>
                <button class="btn btn-outline-light btn-sm" @click="signup">I don't have a User account</button>
                <br><br>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: "LoginForm",
    
        data() {
            return {
                username: "",
                password: "",
                loginStatus: "",
            }
        },
        methods: {
            loginUser: function() {
                this.loginStatus = "Loading",
                
                axios.request({
                    method: "POST",
                    url: "http://127.0.0.1:5000/api/login",
                    headers: {
                        "Content-Type": "application/json"
                        // "X-Api-Key": "p3JJq3WhdMwT98hN9PTaYDE1lr2p0qKOaLfIdjyDxiorc"
                    },
                    data: {
                        user_name: this.username,
                        password: this.password,
                        loginStatus: this.loginStatus
                    }
                }).then((response) => {
                    console.log(response.data.userId)
                    this.loginStatus = "Success"
                    cookies.set('userId', response.data.userId),
                    cookies.set('username', response.data.user_name),
                    cookies.set('userpassword', "password"),
                    cookies.set('session', response.data.loginToken)
                    console.log("logintoken:" + response.data.loginToken)
                    console.log("UserId cookie:" + cookies.get('userId'))
                    this.$router.push("/feed")
                }).catch((error) => {
                    console.log(error)
                    this.loginStatus = "Error"
                    alert("No account with that email or password found. Please create your account.")
                    this.$router.push({ name: 'SignupForm' })
                })
            },

            signup: function(){
            this.$router.push({ name: 'SignupForm' })
            }
        }
    }
    
</script>

<style lang="scss">

    // h1 {
    //     font-weight: bold;
    //     // color:rgb(176, 20, 223);
    // }

    .container {
        background-color: rgb(126, 191, 202);
    }
</style>

