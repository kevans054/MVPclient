<template>
    <div class="container border">
        <div class="row">
            <div class="col"><br>
                <h1>Delete your account</h1><br>
                <p>Password required:</p>
                <input type="password" id="password" v-model="password" class="standard-input"><br><br>
                <button class="btn btn-danger btn-sm" @click="deleteAccount" placeholder="Password">Confirm Delete</button><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: 'delete-profile',
        data () {
            return {
            password: ""
            }
        },
        methods: {
            deleteAccount: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // "X-Api-Key": "p3JJq3WhdMwT98hN9PTaYDE1lr2p0qKOaLfIdjyDxiorc"
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        password: this.password,
                    }
                }).then(() => {
                    this.$router.push({ name: 'SignupForm' })
                    cookies.delete('session')
                    // cookies.delete('userId')
                    console.log(cookies.get('session'))
                    

                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="scss">
#title {
    h1 {
        font-weight: bold;
        color:rgb(176, 20, 223);
    }
}
    .container {
        background-color: rgb(126, 191, 202);
    }
</style>