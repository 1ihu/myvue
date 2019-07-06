<template>
  <div class="app-container">
    <el-form ref="ConsumeruleForm" :rules="rules" label-width="80px" label-position="right" :model="ConsumerFormrefundMsg" class="demo-form-inline">
      <el-form-item label="用户名:">
        <el-input v-model="ConsumerFormrefundMsg.account" />
      </el-form-item>
      <el-form-item label="联系方式:">
        <el-input v-model="ConsumerFormrefundMsg.tel" />
      </el-form-item>
      <el-form-item label="付款方式:">
        <el-radio-group v-model="ConsumerFormrefundMsg.Paytype">
          <el-radio :label="1" border><svg-icon icon-class="zfbxf" class="" />支付宝</el-radio>
          <el-radio :label="2" border><svg-icon icon-class="wxxf" class="" />微信</el-radio>
          <el-radio :label="3" border><svg-icon icon-class="yhkxf" class="" />银行卡</el-radio>
          <el-radio :label="4" border><svg-icon icon-class="xjxf" class="" />现金</el-radio>
          <el-radio :label="5" border><svg-icon icon-class="qtfs" class="" />其他</el-radio>
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
      <el-form-item>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="formrefundMsg.loading" @click="onrefundSubmit('ruleForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const ConsumerFormrefundMsg = {
  account: '',
  tel: '',
  Paytype: '',
  Paymoney: '',
  loading: false,
  ConsumedialogVisible: false
}
export default {
  data() {
    return {
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
      value: '',
      formrefundMsg: {
        code: '',
        loading: false
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
      }
    }
  },
  methods: {
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
    }
  }

}
</script>
<style lang="scss" scoped>
.el-radio{
    margin-bottom: 10px;
}
</style>

