<template>
  <div class="app-container">
    <el-form ref="ruleForm" :inline="true" :model="formInline" label-position="top" class="demo-form-inline">
      <el-form-item label prop="user">
        <el-input v-model="formInline.user" placeholder="用户名" />
      </el-form-item>
      <el-form-item label prop="status">
        <el-select v-model="formInline.freestatus" clearable placeholder="是否免单" style="width:140px">
          <el-option label="已免单" value="1" />
          <el-option label="待免单" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label prop="status">
        <el-select v-model="formInline.status" clearable placeholder="是否允许免单" style="width:140px">
          <el-option label="禁止免单" value="1" />
          <el-option label="允许免单" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label prop="time">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          range-separator="至"
          start-placeholder="免单开始日期"
          end-placeholder="免单结束日期"
        />
      </el-form-item>
      <el-form-item label prop="time">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          range-separator="至"
          start-placeholder="消费开始日期"
          end-placeholder="消费结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="Downpay">下单</el-button>
      </el-form-item>
    </el-form>
    <el-divider><svg-icon icon-class="qd" class="home_icon" /> 当前奖池：¥1231</el-divider>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          <span :class="{'undermine':scope.row.userstatus}">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="消费金额" width="110">
        <template slot-scope="scope">
          <div>
            ¥{{ scope.row.amount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="110" align="center">
        <template slot-scope="scope">
          <div :class="{'undermine underminetext':scope.row.userstatus}">
            {{ scope.$index +1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="免单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTileFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="110" align="center">
        <template>
          <div>
            支付宝
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="免单时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="消费时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template>
          <!-- <span>{{ scope.row.display_time }}</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <!-- 允许免单 且 奖池金额大于消费金额获得免单 -->
          <el-button type="primary" icon="el-icon-coin" @click="refundMsgClick" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
const formInline = {
  user: '',
  time: [],
  status: '',
  freestatus: '',
  recommended: ''
}

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info'
      }
      return statusMap[status]
    },
    statusTileFilter(status) {
      const statusMap = {
        0: '已免单',
        1: '待免单'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: Object.assign({}, formInline),
      dialogVisible: false

    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    Downpay() {
      this.$router.push('/activity/submitgoods')
    },

    refundMsgClick() {
      this.dialogVisible = true
    },
    changeSwitch(row) {
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    statuswitchFilter(status) {
      const statusMap = {
        published: false,
        draft: true,
        deleted: true
      }
      return statusMap[status]
    },
    onSubmit() {},
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          this.$set(v, 'switch', !!v.status)
          // this.$set(v, 'userstatus', !!v.userstatus)
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>
<style  scoped>
.edit-input {
  padding-right: 85px;
}
.cancel {
  position: absolute;
  right: 15px;
  top: 12px;
}
.undermine{
  text-decoration:line-through red;
}
.underminetext{
  position: relative;
}
.underminetext::after{
  content: "已禁免单";
  display: block;
  color: #FC2F39;
  right: 0;
  bottom: 0;
}
</style>

