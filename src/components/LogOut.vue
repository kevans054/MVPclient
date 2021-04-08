<template>
    <div id="logout">
        <button class="btn btn-outline-light btn-sm" @click="logout()">Logout</button>
        <br><br>
    </div>
            
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: 'log-out',
        data() {
            return{
            loginToken: cookies.get('session'),
            }
        },
        methods: {
            logout: function() {
                console.log(this.loginToken)
                axios.request({
                    method: "DELETE",
                    url: "http://127.0.0.1:5000/api/login",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {

                        loginToken: cookies.get('session')
                        
                    }
                }).then((response) => {
                    console.log(response)
                    this.$router.push({ name: 'LoginForm' })
                }).catch((error) => {
                    console.log(error)
                    this.loginStatus = "Error"
                    alert("No account with that email or password found. Please create your account.")
                    this.$router.push({ name: 'SignupForm' })
                })
            },
        }
    }
    
</script>

<style lang="scss">

    // h1 {
    //     font-weight: bold;
    //     color:rgb(176, 20, 223);
    // }

    .container {
        background-color: rgb(126, 191, 202);
    }
</style>

