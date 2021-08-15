<template>
    <div>
        <h4>Agenda</h4>
        <b-card>
            <b-row class="justify-content-center align-items-center" no-gutters>
                <b-col>
                    <button class="btn btn-sm btn-primary">
                        Add New Agenda
                    </button>
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
                    <td>{{ item.title }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.start_time }}</td>
                    <td>{{ item.end_time }}</td>
                    <td>
                        <button class="btn btn-sm btn-primary">View</button>
                        <button class="btn btn-sm btn-success ms-2">Edit</button>
                        <button class="btn btn-sm btn-danger ms-2">Delete</button>
                    </td>
                </tr>
                </tbody>

            </table>
        </b-card>
    </div>
</template>

<script>

export default {
    name: "Index",
    data() {
        return {
            items: [
                {
                    title: 'Dickerson',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: 40,
                    start_time: '10:30 AM',
                    end_time: '11:30 AM'
                },
                {
                    title: 'Larsen',
                    content: 'Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: 21,
                    start_time: '10:30 AM',
                    end_time: '11:30 AM'
                },
            ]
        }
    }
}
</script>

<style scoped>

</style>
