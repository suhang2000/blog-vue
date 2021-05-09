<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './resize'
require('echarts/theme/macarons')

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          // 坐标轴指示器，坐标轴触发有效
          axisPointer: {
            // 默认为直线，可选为：'line' | 'shadow'
            type: 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'user',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, 1, 3, 5, 5, 10, 10],
          animationDuration
        }, {
          name: 'saler',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, 0, 3, 5, 7, 9, 9],
          animationDuration
        }, {
          name: 'order',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [0, 0, 0, 1, 1, 4, 7],
          animationDuration
        }]
      })
    }
  }
}
</script>
