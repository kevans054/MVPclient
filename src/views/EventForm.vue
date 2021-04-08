<template>
    <div>
        <div class="row">
            <div class="col">
                <h4 class="text-black">New Event</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <br>
                <h5>Event Description</h5><br>
                <textarea id="eventbox" class="col" v-model="eventContent" placeholder="Enter your event description here"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
            </div>
            <div class="col"><br>
                <h5>Event Details</h5>
            </div>
            <div class="col"><br>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
                <h6>Choose your event category</h6>
            </div>
            <div class="col"><br>
            </div>
            <div class="col"><br>
            </div>
        </div>
        <div class="row" id="category">
            <div class="col"><br>
                <v-select 
                            :options="categories"
                            v-model="categories.name"
                            item-text="categories.names"
                            label="name">
                        </v-select>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
                <h6>Choose your event community</h6>
            </div>
            <div class="col"><br>
            </div>
            <div class="col"><br>
            </div>
        </div>
        <div class="row" id="community">
            <div class="col"><br>
                <v-select 
                            :options="communities"
                            v-model="communities.name"
                            item-text="communities.names"
                            label="name">
                        </v-select>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
                <h6>Choose your event start date</h6>
            </div>
            <div class="col">
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row" id="start">
            <div class="col"><br>
                <datepicker placeholder="Select Event Start Date" v-model="startDate"></datepicker>
            </div>
        </div>
         <div class="row">
            <div class="col"><br>
                <h6>Choose your event end date</h6>
            </div>
            <div class="col">
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row" id="end">
            <div class="col"><br>
                <datepicker placeholder="Select Event End Date" v-model="endDate"></datepicker>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
                <h6>Choose your event expiry date</h6>
            </div>
            <div class="col"><br>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row" id="expiry">
            <div class="col"><br>
                <datepicker placeholder="Select Event Expiry Date" v-model="expiryDate"></datepicker>
            </div>
        </div>
         
        <div class="row">
            <div class="col"><br>
                <button class="btn btn-outline-light btn-sm" @click="postEvent()">Post</button>
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col"><br>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import Datepicker from 'vuejs-datepicker'

    export default {
        name: 'event-form',
        data() {
            return {
                categories: [],
                communities: [],
                eventContent: "",
                mycategory: "",
                mycommunity: "",
                startDate: "",
                endDate: "",
                expiryDate: "",
                name: "",
            }
        },
        components: {
                Datepicker
            },
        mounted: function() {
            this.getCategories();
            this.getCommunities();
        },
        methods: {
            getCategories: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/categories",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    this.categories = response.data
                }).catch((error) => {
                        console.log(error)
                        alert("Categories not found")
                })
            },

            getCommunities: function() {
                    axios.request({
                        url: "http://127.0.0.1:5000/api/communities",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        this.communities = response.data
                    }).catch((error) => {
                            console.log(error)
                            alert("Communities not found")
                    })
                },

            postEvent: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/events",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    data: {
                        loginToken: cookies.get("session"),
                        content: this.eventContent
                    }
                }).then((response) => {
                    console.log(response)
                    // window.location.reload()
                    
                }).catch((error) => {
                        console.log(error)
                        alert("Failed to post!")

                })
            }
        }
            
    }
</script>

<style>
    .container {
            background-color: rgb(126, 191, 202);
    }
    .style-chooser{
        color: rgb(4, 0, 14);
        /* border: floralwhite; */
        background: #dfe5fb;
        /* border-width: thick; */
        padding-left: 20px;
    }
    #eventbox{
        width: 95%;
    }

    #start{
        padding-left: 20px;
    }
    #end{
        padding-left: 20px;
    }
    #expiry{
        padding-left: 20px;
    }
    #category{
        padding-left: 20px;
    }
    #community{
        padding-left: 20px;
    }

</style>