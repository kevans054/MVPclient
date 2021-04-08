<template>
    <div class="container border border-light rounded">
        <div class="row">
            <div class="col"><br>
                <h1>Welcome to Calgary Connects!</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <br>
                <log-out></log-out>
                <button class="btn btn-outline-light btn-sm" @click="PostEvent">Post an Event</button>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col"><br>
                    <button class="btn btn-outline-light btn-sm" @click="show = !show">View Your Profile Here</button><br><br>
                        <div v-if="show">
                            <user-profile :userId="userId"></user-profile>
                        </div>
                </div>
            </div>
        </div>
         <div class="row">
            <div class="col">
                <event-search :eventObject="event"></event-search>
            </div>
        </div>
         <div class="row">
            <div class="col"><br>
                <h2 class="text-dark">Current Events</h2>
                <div v-for="event in events" :key = "event.id"><br><br>
                    <event-card :eventObject="event"></event-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
import EventCard from "../components/EventCard.vue"
import EventSearch from "../components/EventSearch.vue"
import UserProfile from "../components/UserProfile.vue"
import LogOut from "../components/LogOut.vue"

    export default {
        name: "feed-page",
        data() {
            return {
                events: [],
                userId: cookies.get('userId'),
                show: false
            }
        },
        components: {
            EventCard,
            UserProfile,
            LogOut,
            EventSearch
        },
        mounted: function() {
            this.getEvents();
        },
        methods: {
            PostEvent: function(){
                this.$router.push({ name: 'EventForm' })
            },
            getEvents: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/events",
                    method: "GET",
                     headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    this.events = response.data
                    cookies.set('events', response.data)
                }).catch((error) => {
                    console.log(error)
                    alert("The events did not display")
                })
            }
        },
    }
</script>

<style lang="scss">

    h1 {
        font-weight: bold;
    }
    textarea {
        width: 95%;
        height: 150px;
    }
    .container {
        background-color: rgb(126, 191, 202);
    }
</style>