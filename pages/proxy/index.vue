<template>
  <div class="flex flex-wrap w-full p-3">
    <div class="grid grid-cols-5 w-full gap-4">
        <div class="flex-noshink">
            <div class="grid grid-cols-1 w-full gap-3 bg-white rounded-lg p-3 shadow-md">
                <div @click="packageSelect(item)" class="cursor-pointer py-2" :class="{'border-b border-blue-400 text-blue-400' : item == proxyTypeSelected}" v-for="(item,index) in packageModel" :key="index">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="flex flex-wrap w-full col-span-4">
            <el-button type="text" :loading="isAdding" @click="dialogVisible = true">Thêm proxy mới</el-button>
            <a-table :columns="columns" :data-source="model" class="bg-white rounded-lg w-full shadow-md">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <span slot="action" slot-scope="item">
                    <el-button size="small" type="info" icon="el-icon-refresh" circle>  </el-button>
                    <el-button @click="killProxy(item)" :loading="item.isDeleting" size="small" type="danger" icon="el-icon-delete" circle></el-button>
                </span>
            </a-table>
        </div>
    </div>
    <el-dialog
        title="Thêm proxy mới"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Please input"
                v-model="modalInput">
            </el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">Hủy</el-button>
            <el-button type="primary" @click="confirm()">Đồng ý</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'packageID',
    key: 'packageID',
    // slots: { title: 'customTitle' },
    title:'Package',
    scopedSlots: { customRender: 'name' },
  },
  {
    dataIndex: 'upstreamProxies',
    key: 'upstreamProxies',
    // slots: { title: 'customTitle' },
    title:'upstreamProxies',
    scopedSlots: { customRender: 'upstreamProxies' },
  },
  {
    dataIndex: 'auth_Username',
    key: 'auth_Username',
    // slots: { title: 'customTitle' },
    title:'auth_Username',
    scopedSlots: { customRender: 'auth_Username' },
  },
  {
    dataIndex: 'auth_Password',
    key: 'auth_Password',
    // slots: { title: 'customTitle' },
    title:'auth_Password',
    scopedSlots: { customRender: 'auth_Password' },
  },
  
  {
    dataIndex: 'host',
    key: 'host',
    // slots: { title: 'customTitle' },
    title:'host',
    scopedSlots: { customRender: 'host' },
  },
  {
    dataIndex: 'port',
    key: 'port',
    // slots: { title: 'customTitle' },
    title:'port',
    scopedSlots: { customRender: 'port' },
  },
  {
    dataIndex: 'bytes',
    key: 'bytes',
    // slots: { title: 'customTitle' },
    title:'bytes',
    scopedSlots: { customRender: 'bytes' },
  },
  {
    // slots: { title: 'customTitle' },
    title:'Action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
    data() {
        return {
            columns,
            model: [],
            proxyTypeSelected: null,
            dialogVisible: false,
            modalInput: '',
            isAdding: false,
        };
    },
    computed: { 
        packageModel(){
            this.proxyTypeSelected = this.$store.state.package.model[0];
            return this.$store.state.package.model;
        }
    },
    watch: {
        dialogVisible(val){
            if(!val) this.modelInput = "";
        }
    },
    methods: {
        packageSelect(item) {
            this.proxyTypeSelected = item;
        },
        handleClose(done) {
            this.$confirm('Are you sure to close this dialog?')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        cancel(){
            this.dialogVisible = false
        },
        confirm(){
            this.dialogVisible = false;
            this.addProxy();
        },
        async reload(){
            var vm = this;
            await this.$store.dispatch("proxy/fetchData");
            vm.model = JSON.parse(JSON.stringify(vm.$store.state.proxy.model));
            vm.model.forEach(p=> {vm.$set(p,"isDeleting", false)})
        },
        async addProxy(){
            var vm = this;
            vm.isAdding = true;
            const postModel = {
                packageID: this.proxyTypeSelected.id,
                proxys: []
            }
            postModel.proxys = this.modalInput.split('\n');
            var result = await this.$axios.post('/api/proxy/addList', postModel);
            await vm.reload();
            vm.isAdding = false;
        },
        async killProxy(item){
            var vm = this;
            item.isDeleting = true;
            const port = item.port;
            var result = await this.$axios.get('/api/proxy/kill?port='+port);
            vm.reload();
            item.isDeleting = false;
        }
    },
    async mounted(){
        var vm = this;
        await vm.$store.dispatch("proxy/fetchData");
        await vm.$store.dispatch("package/fetchData");
        vm.model = JSON.parse(JSON.stringify(vm.$store.state.proxy.model))
        vm.model.forEach(p=> {vm.$set(p,"isDeleting", false)})
    }
}
</script>

<style>

</style>