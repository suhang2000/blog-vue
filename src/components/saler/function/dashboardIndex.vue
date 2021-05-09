<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <line-chart :chart-data="lineChartData" />
  </div>
</template>

<script>
import PanelGroup from '../dashboard/PanelGroup'
import LineChart from '../dashboard/DataLineChart'

const lineChartData = {
  customernum: {
    expectedData: [1, 10, 20, 40, 80, 160, 250],
    actualData: [0, 1, 3, 5, 5, 10, 10]
  },
  productnum: {
    expectedData: [1, 5, 10, 20, 30, 40, 50],
    actualData: [0, 0, 3, 5, 6, 7, 8]
  },
  ordernum: {
    expectedData: [1, 8, 16, 30, 60, 100, 150],
    actualData: [0, 0, 0, 1, 1, 4, 7]
  }
}

export default {
  name: 'DashboardSaler',
  components: {
    PanelGroup,
    LineChart
  },
  data () {
    return {
      lineChartData: lineChartData.customernum
    }
  },
  methods: {
    handleSetLineChartData (type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: #f6f6f6;
    position: relative;
    margin: -48px 0 0 -32px;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 16px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
