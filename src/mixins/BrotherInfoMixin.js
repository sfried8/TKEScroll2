export default {
    data() {
        return {
            Brothers: []
        }
    },
    methods: {
        onGetBrothers() { }
    },
    mounted() {
        this.$brothers.getBrothers().then(data => { this.Brothers = data; this.onGetBrothers(); })
    }
}