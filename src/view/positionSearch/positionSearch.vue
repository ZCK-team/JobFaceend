<template>
  <div class="search">
    <div class="searchInput">
      <el-input
          class="input animated-input"
          v-model="searchText"
          placeholder="请输入搜索关键字"
          clearable
          size="medium"
          suffix-icon="el-icon-search"
          @clear="handleClear"
          @search="handleSearch"
      ></el-input>
    </div>
    <div class="tableData" >
      <el-table
          :data="positionData"
          class="table"
          border
          cell-style="text-align:center"
          :row-style="{height: '6.75vh'}"
          height="600px"
          :style="{
    'max-height': tableHeight,
    'overflow-y': shouldShowScrollbar ? 'auto' : 'initial'
  }"
          header-cell-style="background-color: #409eff; color: white ;  textAlign: center"
          style="height: 85vh; width: 80%; text-align: center ">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="salary" label="薪资"></el-table-column>
        <el-table-column prop="education" label="教育"></el-table-column>
        <el-table-column prop="experience" label="经验"></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            :total="totalPositions"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getPositionInformationAll} from "@/api/positionInformation";

export default {
  name: "PositionSearch",
  data() {
    return {
      positionData: [], // 保存获取到的职位信息数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的条数
      totalPositions: 0, // 总职位数量
      pageSizeOptions: [10, 20, 30, 50], // 分页选择项
      searchText: '', // 搜索关键字
    };
  },
  computed: {
    tableHeight() {
      if (this.pageSize >= 20) {
        return '800px'; // 设置表格最大高度为 400px
      } else {
        return 'auto'; // 表格高度自适应内容
      }
    },
    shouldShowScrollbar() {
      return this.positionData.length > this.pageSizeOptions[this.pageSizeOptions.length - 1];
    },
  },
  mounted() {
    this.fetchPositionData();
  },
  methods: {
    // 获取职位信息数据
    fetchPositionData() {
      getPositionInformationAll(this.currentPage, this.pageSize).then(response =>{
        console.log("12323",response)
        this.positionData = response.data.records;
        this.totalPositions = response.data.total;
      })
    },
    // 当每页显示的条数改变时触发
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1; // 重置当前页码为第一页
      this.fetchPositionData();
    },
    // 当当前页码改变时触发
    handleCurrentPageChange(page) {
      this.currentPage = page;
      this.fetchPositionData();
    },
    handleClear() {
      // 清空搜索关键字的处理逻辑
      // 可以将搜索关键字清空，重新获取数据等
    },
    handleSearch() {
      // 执行搜索的处理逻辑
      // 可以根据搜索关键字进行数据过滤、重新获取数据等
    },
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/searchBg6.png");
  background-color: #0e4d8f;
  background-size: cover;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}
.searchInput{
   height: 25%;
  text-align: center;
  line-height: 100px;
 }
.input{
  width: 500px;


}
.tableData {
  height: 80%;
  width: 100%;
  align-items: center;
}

.table {
  margin: 0 auto;
}
.pagination-container {
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.animated-input {
  animation: pulse 1s infinite;
}

/*@keyframes pulse {*/
/*  0% {*/
/*    transform: scale(1);*/
/*  }*/
/*  50% {*/
/*    transform: scale(1.2);*/
/*  }*/
/*  100% {*/
/*    transform: scale(1);*/
/*  }*/
/*}*/
</style>
