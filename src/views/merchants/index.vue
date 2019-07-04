<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="关键字" />
      </el-form-item>
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="审核人" />
      </el-form-item>
      <el-form-item label>
        <el-select v-model="formInline.region" placeholder="区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="inmerchants">商家入驻</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="商家" width="180" align="center" />
      <el-table-column prop="name" label="姓名" width="180" align="center" />
      <el-table-column prop="address" label="联系方式" align="center" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column prop="address" label="入驻时间" align="center" />
      <el-table-column prop="address" label="到期时间" align="center" />
      <el-table-column prop="address" label="审核人" align="center" />
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="40%"
    >
      <mdialog @closeDialog="dialogVisible = false" />
    </el-dialog>
  </div>
</template>
<script>
import Mdialog from './dialog'
export default {
  components: {
    Mdialog
  },
  data() {
    return {

      dialogVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    inmerchants() {
      this.dialogVisible = true
    }

  }
}
</script>
