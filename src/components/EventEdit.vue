<template>
    <div>
        <br>
        <button type="button" class="btn btn-outline-light"  @click="show = !show">Edit Event</button>
        <br>
        <div v-if="show">
            <br>
            <div class="row"><br>
                <div class="col">
                    <h5>Event Name</h5>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <div class=text-light>
                        <textarea id="event_name" v-model="event_name" placeholder="event_name"></textarea>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <h5>Category</h5>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class=text-light>
                        <v-select 
                            :options="categories" 
                            v-model="categories.name" 
                            item-text="categories.names"
                            item_value="categories.names"
                            label="name">
                        </v-select>
                    </div>
                </div>
            </div>
             <div class="row">
                <div class="col"><br>
                    <h5>Community</h5>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class=text-light>
                        <v-select 
                            :options="communities"
                            v-model="communities.name"
                            item-text="communities.names"
                            label="name">
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <h5>Event Description</h5>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <textarea v-model="eventObject.content" placeholder="content"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <h5>Contact Information</h5>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class=text-light>
                        <textarea id="contact_info" v-model="contact_info" placeholder="contact_info"></textarea>
                        <!-- <h4>For more info contact: {{ eventObject.contact_info }}</h4> -->
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <h5>Event Dates</h5>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <!-- <datepicker placeholder="Select Event End Date" v-model="event_end_date"></datepicker> -->
                    <h4>Date: {{ eventObject.event_start_date }} to {{ eventObject.event_end_date }}</h4>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <h5>Expiry: {{ eventObject.event_expiry_date }}</h5>
                </div>
            </div>
            <div class="row">
                <div class="col"><br>
                    <!-- <textarea v-model="eventObject.created_at" placeholder="created_at"></textarea> -->
                    <h5>Posted: {{ eventObject.created_at }}</h5>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class=text-light><br>
                        <!-- <textarea id="eventId" v-model="eventId" placeholder="eventId"></textarea> -->
                        <h5>Event Id: {{ eventObject.id }}</h5>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col"><br>
                        <button class="btn btn-outline-light" type="button" @click="editEvent()">Submit</button>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import vSelect from "vue-select"
// import Datepicker from 'vuejs-datepicker'

    export default {
        name: 'event-edit',
        components:{
            vSelect
            // Datepicker
        },
        data() {
            return {
                show: false,
                community: "",
                names:"",
                categories: [],
                communities:[],
                content: this.eventObject.content,
                event_name: this.eventObject.event_name,
                category: this.eventObject.catname,
                name: this.eventObject.name,
                contact_info: this.eventObject.contact_info,
                event_start_date: this.eventObject.event_start_date,
                event_end_date: this.eventObject.event_end_date,
                event_expiry_date: this.eventObject.event_expiry_date,
                created_at: this.eventObject.created_at,
                eventId: this.eventObject.id,
                userId: this.eventObject.userId
            }
        },

        props: {
            eventObject: {
                type: Object,
                required: true,
            },
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
                    // console.log("line 130:" + response.data)
                    this.categories = response.data
                    // console.log("categories:" + this.categories)
                }).catch((error) => {
                    console.log(error)
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
                    // console.log("line 177:" + response.data)
                    this.communities = response.data
                    // console.log("communities:" + this.categories)
                }).catch((error) => {
                    console.log(error)
                })
            },

             editEvent: function() {
                axios.request({
                    url: "http://127.0.0.1:5000/api/events",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    }, 
                    data: {
                        loginToken: cookies.get("session"),
                        content: this.content,
                        event_name: this.event_name,
                        category: this.catname,
                        community: this.name,
                        contact_info: this.contact_info,
                        event_start_date: this.event_start_date,
                        event_end_date: this.event_end_date,
                        event_expiry_date: this.event_expiry_date,
                        created_at: this.eventObject.created_at,
                        eventId: this.eventObject.id,
                        userId: this.eventObject.userId
                    },
                     
                }).then((response) => {
                    console.log(response)
                    // this.$emit('update-event', this.eventContent)
                    this.show = false;
                    // window.location.reload()
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>

</style>