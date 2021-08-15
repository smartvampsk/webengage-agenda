<template>
    <div>
        <b-modal
            id="create-agenda"
            ref="modal"
            title="Add New Agenda"
            @show="resetModal"
            @hidden="resetModal"
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
export default {
    name: "Create",
    data() {
        return {
            item: {
                title: '',
                content: '',
                date: '',
                start_time: '',
                end_time: ''
            },
            errors: [],
            titleState: null,
            contentState: null,
            dateState: null,
            startTimeState: null,
            endTimeState: null,
            isValidStartAndEndTime: false,
        }
    },
    methods: {
        checkFormValidity() {
            this.errors = []
            this.resetState()

            if (!this.item.title) {
                this.titleState = false
                this.errors.push('Title is required.');
            }
            if (!this.item.content) {
                this.contentState = false
                this.errors.push('Content is required.');
            }
            if (!this.item.date) {
                this.dateState = false
                this.errors.push('Date is required.');
            }
            if (!this.item.start_time) {
                this.startTimeState = false
                this.errors.push('Start Time is required.');
            }
            if (!this.item.end_time) {
                this.endTimeState = false
                this.errors.push('End Time is required.');
            }

            if (this.item.start_time && this.item.end_time) {
                if (this.item.start_time > this.item.end_time) {
                    this.endTimeState = false
                    this.errors.push('End Time must be greater than Start Time')
                }
            }

            if (!this.errors.length) {
                return true
            }
        },
        resetModal() {
            this.item = {}
            this.resetState()
        },
        resetState() {
            this.titleState = null
            this.contentState = null
            this.dateState = null
            this.startTimeState = null
            this.endTimeState = null
        },
        handleOk(e) {
            e.preventDefault()
            this.handleSubmit()
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return
            }
            this.item.created_at = Date.now()
            this.setItem()
            this.resetModal()
            this.$nextTick(() => {
                this.$bvModal.hide('create-agenda')
            })
        },
        setItem() {
            this.$emit('getItem', this.item)
        }
    }

}
</script>

<style scoped>

</style>
