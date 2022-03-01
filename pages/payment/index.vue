<template>
  <div>
    Hiện tại chỉ hỗ trợ momo
    <span>
        Cú pháp
    </span>
    <span v-if="$auth.user">
        PROXY {{$auth.user.id}}
    </span>
    <span @click="reCheck()">
        Reload
    </span>
  </div>
</template>

<script>
export default {
    data(){
        return {
            model: {
                amount: 0,
                type: 1,
                typeString: "momo"
            },
            result: null,
        }
    },
    methods: {
        async makePayment() {
            try {
                var data = await this.$axios.post("/api/payment/make", this.model)
                this.$notify({
                    title: 'Success',
                    message: 'Order completed',
                    type: 'success'
                });
            }catch (ex){
                this.$notify.error({
                    title: 'Error',
                    message: ex.data.message
                });
            }
        },
        async reCheck(){
            try {
                var data = await this.$axios.get("/api/payment/check");
                console.log(data.data.momoMsg.tranList)
            }
            catch (ex) {

            }
        }
    },
    mounted(){
        var vm = this;
        vm.$nextTick(()=>{
            console.log(vm.$auth)
        })
    }
}
</script>

<style>

</style>