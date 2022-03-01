<template>
  <div class="w-full flex flex-wrap">
    <div v-if="proxyType" class="w-1/5 py-3">
      <div class="grid grid-cols-1 w-full gap-3 bg-white rounded-lg p-3 shadow-md">
        <div @click="packageSelect(item)" class="cursor-pointer py-2" :class="{'border-b border-blue-400 text-blue-400' : item == proxyTypeSelected}" v-for="(item,index) in proxyType" :key="index">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="w-4/5">
      <div class="flex flex-wrap w-full pl-3">
        <div class="flex flex-wrap w-full py-3 bg-white rounded-lg p-3 shadow-md my-3">
            <el-button @click="renewPackage()">
              Buy new package
            </el-button>
        </div>
        <div v-if="dataModel != null" class="flex flex-wrap w-full mb-3">
          <el-table
            :data="dataModel"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="proxy.proxy"
              label="Proxy"
              width="180">
            </el-table-column>
            <el-table-column
              label="Bandwidth"
              width="180">
              <template slot-scope="scope">
                {{Math.round(scope.row.bandWidth/1024,2)}} / 1024Mb
              </template>
            </el-table-column>
            <el-table-column
              label="Status">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.proxy.isUsed" type="success">Working</el-tag>
                <el-tag v-else type="danger">Stopped</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="right"
              label="Action">
              <template slot-scope="">
                <el-button size="mini" @click="newProxy()" type="info" plain>
                  <i class='bx bx-refresh'></i>
                </el-button>
                <el-button size="mini" @click="newProxy()" type="alert" plain>Remove</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dataModel: null,
      multipleSelection: [],
      proxyType: null,
      proxyTypeSelected: null,
      isRenew: false,
    }
  },
  methods: {
    async newProxy(){
      var data = null;
      try {
        data = await this.$axios.get("/api/proxy/new?type=" + this.proxyTypeSelected.id);
        this.$notify({
          title: 'Success',
          message: 'Get new proxy completed',
          type: 'success'
        });
        await this.refresh();
      }catch (ex){
        this.$notify.error({
          title: 'Error',
          message: ex.response.data.message
        });
      }
    },
    async refresh() {
      try {
        let data = await this.$axios.get("/api/proxy/all?type=" + this.proxyTypeSelected.id);
        this.dataModel = data.data;
        this.isRenew = false;
      }
      catch(ex){
        if(ex.response.data.message == "No Package") {
          this.isRenew = true;
          this.dataModel = [];
        }
      }
    },
    packageSelect(item) {
      this.proxyTypeSelected = item;
      this.refresh();
    },
    async renewPackage(){
       this.$confirm('You will pay 50.000vnđ for this packge. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
          try {
            var data = await this.$axios.get("/api/proxy/buy?packageid=" + this.proxyTypeSelected.id)
            this.$message({
              type: 'success',
              message: 'Buy completed'
            });
            
            this.refresh();
          }catch (ex){
            this.$notify.error({
              title: 'Error',
              message: ex.response.data.message
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted(){
    var vm = this;
    vm.$nextTick(async()=> {
      var data = await vm.$axios.get("/api/proxy/package");
      vm.proxyType = data.data;
      vm.proxyTypeSelected = vm.proxyType[0];
      try {
        data = await vm.$axios.get("/api/proxy/all?type=" + vm.proxyTypeSelected.id);
        vm.dataModel = data.data;
        vm.isRenew = false;
      }
      catch(ex){
        if(ex.response.data.message == "No Package") {
          vm.isRenew = true;
          vm.dataModel = []
        }
      }
    })
  }
}
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>