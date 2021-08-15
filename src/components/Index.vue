<template>
    <div>
        <h4>Agenda</h4>

        <b-card>
            <b-alert show dismissible v-if="message">
                {{ message }}
            </b-alert>

            <b-row class="justify-content-center align-items-center" no-gutters>
                <b-col>
                    <b-button v-b-modal.create-agenda variant="primary" class="btn-sm">Add New Agenda</b-button>
                    <CreateAgenda v-on:getItem="addItem"/>
                </b-col>
                <b-col>
                    <div class="text-end">
                        <button class="btn btn-sm btn-outline-success">
                            Export
                            <b-icon-cloud-download class="ps-1"/>
                        </button>
                        <button class="btn btn-sm btn-outline-success ms-2">
                            Import
                            <b-icon-cloud-upload class="ps-1"/>
                        </button>
                    </div>
                </b-col>
            </b-row>

            <table class="table table-striped table-bordered table-hover mt-3 mb-0">
                <thead>
                <tr>
                    <th>SN</th>
                    <th>Agenda Title</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(item, index) in items" :key="item._id">
                    <td>{{ ++index }}</td>
                    <td class="title">{{ item.title }}</td>
                    <td>{{ item.date | formatDate }}</td>
                    <td>{{ item.start_time }}</td>
                    <td>{{ item.end_time }}</td>
                    <td>
                        <b-button
                            v-b-modal.view-agenda
                            variant="primary"
                            class="btn-sm"
                            @click="viewDetail(item)"
                        >View
                        </b-button>
                        <button class="btn btn-sm btn-success ms-2">Edit</button>
                        <button class="btn btn-sm btn-danger ms-2">Delete</button>
                    </td>
                </tr>
                </tbody>

            </table>
        </b-card>

        <ViewAgenda :item="item_data" v-if="view_detail"/>

    </div>
</template>

<script>

import moment from 'moment'
import CreateAgenda from "./Create";
import ViewAgenda from "./ViewAgenda";

export default {
    name: "Index",
    components: {CreateAgenda, ViewAgenda},
    data() {
        return {
            message: '',
            item_data: {},
            view_detail: false,
            items: [
                {
                    title: 'There is only one corner of the universe you can be certain of improving, and that\'s your own self.',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: "2021-08-15",
                    start_time: '10:30 AM',
                    end_time: '11:30 AM',
                    created_at: 1629014765010
                },
                {
                    title: 'So long as a person is capable of self-renewal they are a living being.',
                    content: 'Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: "2021-08-16",
                    start_time: '10:30 AM',
                    end_time: '11:30 AM',
                    created_at: 1629014779514
                },
            ]
        }
    },
    filters: {
        formatDate(date) {
            return moment(date).format("YYYY-MM-DD")
        }
    },
    methods: {
        addItem(value) {
            this.items.unshift(value)
            this.message = 'Agenda Added'
        },
        viewDetail(item) {
            this.view_detail = true
            this.item_data = item;
        }
    }
}
</script>

<style>
td.title {
    width: 25%;
}

.alert-dismissible button {
    background: transparent;
    float: right;
    border: 0;
}
</style>
