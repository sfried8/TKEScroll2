export default {
    data() {
        return {
            Members: {},
            Scroll: [],
        }
    },
    methods: {
        async onMountedAsync() {
            const members = await this.$members.getMembers()
            const scroll = await this.$members.getScroll()
            this.Members = members;
            this.Scroll = scroll;
            this.onGetData();

        },
        onGetData() { }
    },
    mounted() {
        this.onMountedAsync();
    },
}