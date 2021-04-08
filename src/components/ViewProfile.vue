<template>
    <div class="container" id="profile">
        <button class="btn btn-outline-light btn-sm" @click="show = !show">View User Profile</button>
        <div v-if="show"><br>
            <div class="container border">
                <h1>User Profile</h1>
                <div class="row">
                    <div class="col" v-for="user in users" :key="user.id">
                        <p>userId: {{ user.id }}</p>
                        <p>username: {{ user.user_name }}</p>
                        <p>email: {{user.email}}</p><br>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'


    export default {
        name: "view-profile",

         data() {
            return {
                users: [],
                loginToken: "",
                show: false,
                userId: cookies.get("userId")
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
                        userId: this.userId
                    },
                    }).then((response) => {
                        console.log("line 53 in ViewProfile:" + response)
                        this.users = response.data
                        console.log("line 55 in ViewProfile:" + this.users.id)
                    }).catch((error) => {
                        console.log(error)
                    })
                },
        }
    }
</script>

<style scoped>
 
</style>