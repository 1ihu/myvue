<template>
  <div class="app-container">
    <el-form ref="ruleForm" :inline="true" :model="formInline" class="demo-form-inline">
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
      <!-- <el-table-column label="操作" align="center" min-width="200px">
        <template slot-scope="scope">
          <template v-if="scope.row.status">
            <el-switch
              v-model="scope.row.userstatus"
              active-color="#ff4949"
              active-text="禁止免单"
              inactive-text="允许免单"
              @change="changeSwitch(scope.row)"
            />
          </template>
        </template>
      </el-table-column> -->
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
    <!-- 弹窗 -->
    <el-dialog
      title="明细"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :rules="rules" label-width="120px" label-position="right" :model="formrefundMsg" class="demo-form-inline">
        <el-form-item label="用户名:">
          李明
        </el-form-item>
        <el-form-item label="联系方式:">
          李明
        </el-form-item>
        <el-form-item label="付款方式:">
          支付宝
        </el-form-item>
        <el-form-item label="付款金额:">
          1234
        </el-form-item>
        <el-form-item label="退款交易码:" prop="code">
          <el-input v-model="formrefundMsg.code" type="password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="formrefundMsg.loading" @click="onrefundSubmit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="明细"
      :visible.sync="ConsumerFormrefundMsg.ConsumedialogVisible"
      width="45%"
      :before-close="ConsumehandleClose"
    >
      <el-form ref="ConsumeruleForm" :rules="rules" label-width="80px" label-position="right" :model="ConsumerFormrefundMsg" class="demo-form-inline">
        <el-form-item label="用户名:">
          <el-input v-model="ConsumerFormrefundMsg.account" />
        </el-form-item>
        <el-form-item label="联系方式:">
          <el-input v-model="ConsumerFormrefundMsg.tel" />
        </el-form-item>
        <el-form-item label="付款方式:">
          <el-radio-group v-model="ConsumerFormrefundMsg.Paytype">
            <el-radio :label="1"><svg-icon icon-class="zfbxf" class="" />支付宝</el-radio>
            <el-radio :label="2"><svg-icon icon-class="wxxf" class="" />微信</el-radio>
            <el-radio :label="3"><svg-icon icon-class="yhkxf" class="" />银行卡</el-radio>
            <el-radio :label="4"><svg-icon icon-class="xjxf" class="" />现金</el-radio>
            <el-radio :label="5"><svg-icon icon-class="qtfs" class="" />其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="付款金额:">
          <el-input v-model="ConsumerFormrefundMsg.Paymoney" />
        </el-form-item>
        <el-form-item label="推荐人:">
          <el-select v-model="ConsumerFormrefundMsg.recommended" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="ConsumerFormrefundMsg.loading" @click="ConsumerOnrefundSubmit('ConsumeruleForm')">确 定</el-button>
      </span>
    </el-dialog>
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
const ConsumerFormrefundMsg = {
  account: '',
  tel: '',
  Paytype: '',
  Paymoney: '',
  loading: false,
  ConsumedialogVisible: false

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
      dialogVisible: false,
      formrefundMsg: {
        code: '',
        loading: false
      },
      ConsumerFormrefundMsg: Object.assign({}, ConsumerFormrefundMsg),
      rules: { code: [{ required: true, message: '请输入退款交易码', trigger: 'blur' }] },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    Downpay() {
      this.ConsumerFormrefundMsg.ConsumedialogVisible = true
    },
    onrefundSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formrefundMsg.loading = true
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ConsumehandleClose(done) {
      this.formrefundMsg.loading = false
      this.$confirm('确认关闭？', { type: 'warning' })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.formrefundMsg.loading = false
      this.$confirm('确认关闭？', { type: 'warning' })
        .then(_ => {
          done()
        })
        .catch(_ => {})
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

