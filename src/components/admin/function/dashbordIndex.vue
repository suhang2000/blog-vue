<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff" class="chart-wrapper">
      <el-col :xs="24" :sm="24" :lg="8">
        <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" push="2">
        <div>
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="64">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from '../dashboard/PanelGroup'
import PieChart from '../dashboard/CodenumPieChart'
import LineChart from '../dashboard/DataLineChart'
import BarChart from '../dashboard/UsernumBarChart'
import TodoList from '../dashboard/TodoList'
import BoxCard from '../dashboard/CodeCoverCard'

const lineChartData = {
  usernum: {
    expectedData: [1, 10, 20, 40, 80, 160, 250],
    actualData: [0, 1, 3, 5, 5, 10, 10]
  },
  salernum: {
    expectedData: [1, 5, 10, 20, 20, 40, 80],
    actualData: [0, 0, 3, 5, 7, 9, 9]
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
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data () {
    return {
      lineChartData: lineChartData.usernum
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
