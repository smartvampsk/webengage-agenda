<template>
    <div>
        <b-modal
            id="edit-agenda"
            ref="modal"
            title="Edit Agenda"
            @ok="handleOk"
            ok-title="Submit"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <div v-if="errors.length">
                    <ul class="text-danger">
                        <li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
                    </ul>
                </div>

                <b-form-group
                    label="Agenda Title"
                    label-for="title-input"
                    invalid-feedback="Agenda title is required"
                    :state="titleState"
                    class="mb-2"
                >
                    <b-form-input
                        id="title-input"
                        v-model="item.title"
                        :state="titleState"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label="Content"
                    label-for="content-input"
                    invalid-feedback="Content is required"
                    :state="contentState"
                    class="mb-2"
                >
                    <b-form-textarea
                        id="content-input"
                        v-model="item.content"
                        :state="contentState"
                        rows="4"
                        required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    label="Date"
                    label-for="date-input"
                    invalid-feedback="Date is required"
                    :state="dateState"
                    class="mb-2"
                >
                    <b-form-datepicker
                        id="date-input"
                        v-model="item.date"
                        :state="dateState"
                        required
                    ></b-form-datepicker>
                </b-form-group>
                <b-form-group
                    label="Start Time"
                    label-for="time-input"
                    invalid-feedback="Start Time is required"
                    :state="startTimeState"
                    class="mb-2"
                >
                    <b-form-timepicker
                        id="time-input"
                        v-model="item.start_time"
                        :state="startTimeState"
                        required
                    ></b-form-timepicker>
                </b-form-group>
                <b-form-group
                    label="End Time"
                    label-for="end-time-input"
                    invalid-feedback="End Time is required"
                    :state="endTimeState"
                    class="mb-2"
                >
                    <b-form-timepicker
                        id="end-time-input"
                        v-model="item.end_time"
                        :state="endTimeState"
                        required
                    ></b-form-timepicker>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import {commonMixin} from "../mixins/commonMixin";

export default {
    name: "EditAgenda",
    props: ['created_at'],
    mixins: [commonMixin],
    data() {
        return {
            item: {}
        }
    },
    watch: {
        created_at() {
            this.fetchDetail(this.created_at)
        },
    },
    mounted() {
        this.fetchDetail(this.created_at)
    },
    methods: {
        handleOk(e) {
            e.preventDefault()
            this.handleSubmit()
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            this.setItem()
            this.$nextTick(() => {
                this.$bvModal.hide('edit-agenda')
            })
        },
        setItem() {
            this.$emit('getItem', this.item)
        },
        fetchDetail(time) {
            let index = this.getIndex(time)
            this.item = this.agendas[index]
        }
    }

}
</script>

<style scoped>

</style>
