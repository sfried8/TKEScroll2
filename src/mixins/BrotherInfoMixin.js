export default {
    data() {
        return {
            Brothers: [],
            Others: null,
            People: {}
        }
    },
    methods: {
        async onMountedAsync() {
            const brothers = await this.$brothers.getBrothers()
            const others = await this.$brothers.getOthers()
            const people = await this.$brothers.getPeople()
            this.Brothers = brothers;
            this.Others = others;
            this.People = people;
            this.onGetBrothers();

        },
        onGetBrothers() { }
    },
    mounted() {
        this.onMountedAsync();
    },
    computed: {
        SanitizedBrothersList() {
            return this.Brothers.filter(b => b && b.scroll > 0).sort((a, b) => a.scroll - b.scroll);
        }
    }
}