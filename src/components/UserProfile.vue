<template>
    <div class="container border border-light rounded">
        <div class="row">
            <div class="col">
                <h1>User Profile</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div>
                    <p>Email: {{ users.email }}</p>
                    <p>Username: {{ users.user_name }}</p>
                    <p> userId: {{users.id}}</p><br>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <delete-profile></delete-profile>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import DeleteProfile from './DeleteProfile.vue'

    export default {
        name: "user-profile",
        components: {
            DeleteProfile
        },
         data() {
            return {
                users: [],
                loginToken: "",
                password: "",
                show: false,
                }
            },
            mounted: function() {
            this.getUser();
        },
            methods: {
                getUser: function() {
                    axios.request({
                    url: "http://127.0.0.1:5000/api/user",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        userId: cookies.get("userId"),
                    }
                    }).then((response) => {
                        console.log("response:" + response)
                        this.users = response.data
                        console.log("line 66 in UserProfile:" + this.users.email)

                    }).catch((error) => {
                        console.log(error)
                    })
                },
                saveUser: function() {
                    axios.request({
                        method: "PATCH",
                        url: "http://127.0.0.1:5000/api/user",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: {
                            loginToken: cookies.get('session'),
                        }
                    }).then((response) => {
                        window.location.reload()
                        console.log(response)
                        
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    .container {
        background-color: rgb(126, 191, 202);
    }
</style>