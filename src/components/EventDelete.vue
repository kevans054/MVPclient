<template>
    <div>
        <div class="col">
        </div>
        <!-- add alert to confirm delete before -->
        <button class="btn btn-outline-light btn-lg btn-block" @click="deleteEvent()">Delete Event</button>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"

    export default {
        name: "event-delete",
        
        props: {
            eventId: {
                type: Number,
                required: true
            }
        },
        methods: {
            deleteEvent: function() {
                axios.request({
                   url: "http://127.0.0.1:5000/api/events",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        // "X-Api-Key": "p3JJq3WhdMwT98hN9PTaYDE1lr2p0qKOaLfIdjyDxiorc"
                    }, 
                    data: {
                        loginToken: cookies.get("session"),
                        eventId: this.eventId
                    },
                }).then((response) => {
                    console.log(response)
                    window.location.reload()

                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>

</style>