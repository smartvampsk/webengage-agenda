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
                        <button
                            class="btn btn-sm btn-outline-success"
                            @click="exportToCSV()"
                        >Export
                            <b-icon-cloud-download class="ps-1"/>
                        </button>
                        <button
                            class="btn btn-sm btn-outline-success ms-2"
                            @click="openFilePicker"
                        >Import
                            <b-icon-cloud-upload class="ps-1"/>
                            <input type="file" accept=".csv" ref="open_file_picker" @change="importCSV"/>
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
                <tr v-if="!agendas.length">
                    <td colspan="6">No Record Found</td>
                </tr>
                <tr v-for="(item, index) in agendas" :key="item.created_at">
                    <td>{{ ++index }}</td>
                    <td class="title">{{ item.title }}</td>
                    <td>{{ item.date | formatDate }}</td>
                    <td>{{ item.start_time | formatTime }}</td>
                    <td>{{ item.end_time | formatTime }}</td>
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
                        <b-button
                            class="btn btn-sm btn-danger ms-2"
                            @click="deleteData(item)"
                        >Delete
                        </b-button>
                    </td>
                </tr>
                </tbody>

            </table>
        </b-card>

        <ViewAgenda :item="item_data" v-if="view_detail"/>
        <EditAgenda :item_data="edit_data" v-on:getItem="updateItem" v-if="edit_detail"/>

    </div>
</template>

<script>

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
            item_data: {},
            view_detail: false,
            edit_detail: false,
            edit_data: {},
        }
    },
    methods: {
        addItem(value) {
            this.agendas.unshift(value)
            this.message = 'Agenda Added'
        },
        updateItem(value) {
            let index = this.getIndex(value.created_at)
            this.$set(this.agendas, index, value)
            this.message = 'Agenda Updated'
        },
        viewDetail(item) {
            this.view_detail = true
            this.item_data = item
        },
        editDetail(item) {
            this.edit_data = item
            this.edit_detail = true
        },
        deleteData(item) {
            let index = this.getIndex(item.created_at)
            if (this.confirmDelete()) {
                this.agendas.splice(index, 1)
                this.message = 'Agenda Deleted!'
            }
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

input[type="file"] {
    display: none;
}
</style>
