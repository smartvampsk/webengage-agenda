import moment from "moment";

export const commonMixin = {
    data() {
        return {
            agendas: [
                {
                    title: 'There is only one corner of the universe you can be certain of improving, and that\'s your own self.',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: "2021-08-15",
                    start_time: '10:30:00',
                    end_time: '11:30:00',
                    created_at: 1629014765010
                },
                {
                    title: 'So long as a person is capable of self-renewal they are a living being.',
                    content: 'Alias aliquam aliquid amet dicta dolore, dolorem dolorum id iure laborum nihil nostrum numquam, placeat quia rem sed sunt vel! Dolorem, maxime.',
                    date: "2021-08-16",
                    start_time: '13:30:00',
                    end_time: '14:00:00',
                    created_at: 1628882688000
                },
            ],
            errors: [],
            titleState: null,
            contentState: null,
            dateState: null,
            startTimeState: null,
            endTimeState: null,
            headers: ['Agenda title', 'Content', 'Date', 'Start Time', 'End time', 'Created At'],
        }
    },

    filters: {
        formatDate(date) {
            return moment(date).format("YYYY-MM-DD")
        },
        createdAt(date) {
            return moment(date).format("dddd, MMMM Do YYYY")
        },
        formatTime(time) {
            return moment(time, ["HH.mm"]).format("hh:mm a");

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
        getIndex(c) {
            let index = this.agendas.findIndex(item => item.created_at == c)
            return index
        },
        confirmDelete() {
            return confirm('Are you sure to delete this?')
        },

        exportToCSV() {
            let arrData = this.agendas
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
                this.headers.join(';'),
                // ...arrData.map(item => Object.values(item).join(";"))
                ...arrData.map(item =>
                    item.title + ";" +
                    item.content + ";" +
                    item.date + ";" +
                    item.start_time + ";" +
                    item.end_time + ";" +
                    moment(item.created_at).format('YYYY-MM-DD hh:mm:ss') + ";"
                )
            ]
                .join("\n")
                .replace(/(^\[)|(\]$)/gm, "");
            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "agendas.csv");
            link.click();
        }
    }
}
