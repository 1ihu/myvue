<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-row :gutter="12">
      <el-col :xs="24" :sm="8" :md="6">
        <el-card shadow="never">
          <div class="dw">
            <monthly-income
              :chart-data="jcdata"
              :options="optionsjc"
            />
            <div class="chartbox">
              <svg-icon icon-class="jc" class="home_icon" />
              <div class="people"><countTo :start-val="startVal" :end-val="endVal" :duration="3000" /></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :md="6">
        <el-card shadow="never">
          <div class="dw">
            <monthly-income
              :chart-data="data"
              :options="oneself"
            />
            <div class="chartbox">
              <svg-icon icon-class="h5__icon_4" class="home_icon" />
              <div class="people"><countTo :start-val="startVal" :end-val="endVal" :duration="3000" /></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :md="6">
        <el-card shadow="never">
          <div class="dw">
            <monthly-income
              :chart-data="data"
              :options="optionspeople"
            />
            <div class="chartbox">
              <svg-icon icon-class="yh" class="home_icon" />
              <div class="people"><countTo :start-val="startVal" :end-val="endVal" :duration="3000" /></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :md="6">
        <el-card shadow="never">
          <div class="dw">
            <monthly-income
              :chart-data="jcdata"
              :options="optionsmoney"
            />
            <div class="chartbox">
              <svg-icon icon-class="qd" class="home_icon" />
              <div class="money"><countTo :start-val="startVal" :end-val="endVal" :duration="3000" /></div>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
const _ = require('lodash')
import { mapGetters } from 'vuex'
import MonthlyIncome from '@/components/MonthlyIncome'
import Dayline from '@/components/LineChart'
import countTo from 'vue-count-to'
const data = {
  title: {
    display: true, // 是否显示
    position: 'center', // 标题位置
    text: '123213' // 标题名
  },
  datasets: [{
    data: [10],
    backgroundColor: '#2D8FE6',
    borderWidth: 0
  }],
  labels: [
    '活动营业额'
  ]
}
const options = {
  legend: {
    display: false
  },
  animation: {
    animateRotate: false
  },
  title: {
    display: true,
    text: 'Custom Chart Title'
  },
  cutoutPercentage: 80
}
// <dayline :chart-data="daydata" />
export default {
  name: 'Dashboard',
  components: { MonthlyIncome, Dayline, countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2017,
      postForm: {
        content: ''
      },
      discount: '10',
      unitsNumber: 10,
      unitsdisabled: true,
      daydata: Object.assign({}, data),
      data: Object.assign({}, data),
      optionspeople: _.merge({}, options, { title: { text: '免单数（单）' }}),
      optionsmoney: _.merge({}, options, { title: { text: '免单金额（元）' }}),
      optionsjc: _.merge({}, options, { title: { text: '奖池（元）' }}),
      oneself: _.merge({}, options, { title: { text: '排名（位）' }}),
      jcdata: _.merge({}, data, { datasets: [{ backgroundColor: '#FC4971' }], labels: ['免单奖池'] }),
      pa: '<p>asdasas</p>'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    btntype: function() {
      return this.unitsdisabled ? { type: 'warning', text: '修改' } : { type: 'primary', text: '确定' }
    }
  },

  methods: {
    changeChart() {
      this.data = _.merge({}, data, { datasets: [{ data: [Math.random() * 100, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11] }] })
    },
    Sunbmitedit() {
      this.unitsdisabled = !this.unitsdisabled
      if (this.unitsdisabled) {
        this.unitsNumber = this.discount
      }
    }
  }
}
</script>
<style>
  .el-col{
    margin-bottom: 20px;
  }
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
 .discount{
    min-height: 400px;
     .unitsbox{
      position: absolute;
      left: 50%;
      top: 54%;
      transform: translate(-50%,-50%);
      text-align: center;
      .units{
        position: absolute;
        right: -2em;
        top: 54%;
        transform: translate(-50%,-50%);
        text-align: center;
        color: #E10A1D;
        font-weight: 500;
        font-size: 22px;
      }

    }
    .unitsNumber{
      font-size: 64px;
      font-weight: 500;
    }
    .submitClick{
        display: flex;
        justify-content: flex-start;
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
 }
 .dw{
    position: relative;
    height: 100%;
    width: 100%;
     max-width: 400px;
      max-height: 400px;

    .chartbox{
      position: absolute;
      left: 50%;
      top: 54%;
      transform: translate(-50%,-50%);
      text-align: center;

      div{
        margin-top: 1rem;
        font-size: 1.8rem;
        font-weight: 500;

      }
      .home_icon{
        width: 4rem;
        height:  4rem;
       }
    }

  }
</style>
