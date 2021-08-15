<template>
    <div>
        <b-modal
            id="view-agenda"
            title="Agenda Detail"
            size="lg"
            ok-only
            ok-title="Close"
        >
            <table class="table table-bordered mb-0">
                <tbody>
                <tr>
                    <th>Agenda Title</th>
                    <td>{{ item.title }}</td>
                </tr>
                <tr>
                    <th>Content</th>
                    <td>{{ item.content }}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{{ item.date }}</td>
                </tr>
                <tr>
                    <th>Start Time</th>
                    <td>{{ item.start_time | formatTime }}</td>
                </tr>
                <tr>
                    <th>End Time</th>
                    <td>{{ item.end_time | formatTime }}</td>
                </tr>
                <tr>
                    <th>Created at</th>
                    <td>{{ item.created_at | createdAt }}</td>
                </tr>
                </tbody>
            </table>
        </b-modal>
    </div>
</template>

<script>
import {commonMixin} from "../mixins/commonMixin";

export default {
    name: "ViewAgenda",
    props: ['item'],
    mixins: [commonMixin],
}
</script>

<style scoped>
table tr th {
    width: 30%;
}
</style>
