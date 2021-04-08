<template>
    <div>
        <div class="row">
            <div class="col">
                <div class=text-light>
                    <br>
                    <h3>{{ eventObject.event_name }}</h3>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class=text-light>
                    <h6> Category: {{ eventObject.category }}</h6>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class=text-light>
                    <h6> Location: {{ eventObject.name }}</h6>
                </div>
            </div>
        </div>
        <div class="row">
                <div class="col">
                    <h5>"{{ content }}"</h5>
                </div>
        </div>
        <div class="row">
            <div class="col">
                <div class=text-light>
                    <h4>For more info contact: {{ eventObject.contact_info }}</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class=text-light>
                    <h3>Date: {{ eventObject.event_start_date }} to {{ eventObject.event_end_date }}</h3>
                </div>
            </div>
        </div>
        <div class="row">
                <div class="col"><br>
                    <h6>Posted: {{ eventObject.created_at }}</h6>
                </div>
            </div>
        <div>
            <div class="row">
                <div class="col"><br>
                    <div v-if="isOwned">
                        <event-edit class="col" @update-event="updateEvent" v-if="isOwned" :eventObject="eventObject"></event-edit>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EventEdit from './EventEdit.vue'
import cookies from 'vue-cookies'
    export default {
        name: "event-card",
        components: {
            EventEdit,
        },
        props: {
            eventObject: {
                type: Object,
                required: true,
                },
            },
        data() {
            return {
                isOwned: cookies.get('userId') == this.eventObject.userId,
                content: this.eventObject.content,
                show: false
            }
        },
    methods:{
            redirect: function() {
                this.$emit(this.eventObject.id)
                this.$router.push({ name: 'EventEdit' })
            },
            updateEvent(newContent) {
                this.content = newContent;
            },
        }
    }
</script>

<style lang="scss">

    // h1 {
    //     font-weight: bold;
    //     // color:rgb(176, 20, 223);
    // }
    p {
         font-size: 12px;
    }
    .container {
        background-color: rgb(126, 191, 202);
    }
</style>
