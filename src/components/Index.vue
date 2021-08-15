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
                <tr v-for="(item, index) in items" :key="item.created_at">
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
                        <b-button
                            v-b-modal.edit-agenda
                            variant="success"
                            class="btn-sm ms-2"
                            @click="editDetail(item)"
                        >Edit
                        </b-button>
                        <button class="btn btn-sm btn-danger ms-2">Delete</button>
                    </td>
                </tr>
                </tbody>

            </table>
        </b-card>

        <ViewAgenda :item="item_data" v-if="view_detail"/>
        <EditAgenda :created_at="unique_time" v-on:getItem="updateItem" v-if="edit_detail"/>

    </div>
</template>

<script>

import moment from 'moment'
import CreateAgenda from "./Create";
import ViewAgenda from "./ViewAgenda";
import EditAgenda from "./EditAgenda";
import {commonMixin} from "../mixins/commonMixin";

export default {
    name: "Index",
    components: {CreateAgenda, ViewAgenda, EditAgenda},
    mixins: [commonMixin],
    data() {
        return {
            message: '',
            item_data: {},
            unique_time: {},
            view_detail: false,
            edit_detail: false,
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
        updateItem(value) {
            let index = this.getIndex(value.created_at)
            this.$set(this.items, index, value)
            this.message = 'Agenda Updated'
        },
        viewDetail(item) {
            this.view_detail = true
            this.item_data = item
        },
        editDetail(item) {
            this.unique_time = item.created_at
            this.edit_detail = true
        },
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
