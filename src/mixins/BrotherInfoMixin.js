export default {
    data() {
        return {
            Brothers: [],
            Others: null,
        }
    },
    methods: {
        async onMountedAsync() {
            const brothers = await this.$brothers.getBrothers()
            const others = await this.$brothers.getOthers()

            this.Brothers = brothers;
            this.Others = others;
            this.onGetBrothers();

        },
        onGetBrothers() { }
    },
    mounted() {
        this.onMountedAsync();
    },
    computed: {
        SanitizedBrothersList() {
            return this.Brothers.filter(b => b && b.scroll > 0)
        }
    }
}