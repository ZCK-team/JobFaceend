<template>
  <div class="search">
    <div class="searchInput">
      <input
          v-model="searchText"
          class="search-input"
          placeholder="请输入搜索内容"
          @keyup.enter="handleKeyPress"

      >
      <button  @click="getFullTextSearch" class="search-button">搜索</button>
    </div>
    <div class="tableData" >
      <el-table
          :data="positionData"
          class="table"
          border
          :cell-style="cellStyle"
          :row-style="{height: '6.3vh'}"
          height="510px"
          :style="{width: '92%'}"
          :header-cell-style=" headerCellStyle"
          style="height: 85vh; width: 80%; text-align: center ">
        <el-table-column type="index" :index="typeIndex" label="序号" width="70px"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="city" label="城市" width="100px"></el-table-column>
        <el-table-column prop="company_name" label="公司名称"></el-table-column>
        <el-table-column prop="salary" label="薪资"></el-table-column>
        <el-table-column prop="education" label="学历" width="100px"></el-table-column>
        <el-table-column prop="experience" label="工作经验"></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
            style="color:red;"
            :total="totalPositions"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, total, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {fullTextSearch, getPositionInformationAll} from "@/api/positionInformation";

export default {
  name: "PositionSearch",
  data() {
    return {
      isSearched: false,
      positionData: [], // 保存获取到的职位信息数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的条数
      totalPositions: 0, // 总职位数量
      pageSizeOptions: [10, 20, 30, 50], // 分页选择项
      searchText: '', // 搜索关键字
    };
  },
  computed: {

  },
  mounted() {
    this.fetchPositionData();
  },
  methods: {
    typeIndex(index){
      return index+(this.currentPage-1)*this.pageSize + 1
    },
    //设置表头样式
    headerCellStyle(){
      return "background: #409eff; color: white; text-align: center";
    },
    //设置表格里的内容样式
    cellStyle(){
      return "background: #3ae6de40;text-align:center"
    },
    // 获取职位信息数据
    fetchPositionData() {
      getPositionInformationAll(this.currentPage, this.pageSize).then(response =>{
        this.totalPositions = response.data.total;
        console.log("总数据条数",this.totalPositions)
        this.positionData = response.data.records;
      })
    },
    // 当每页显示的条数改变时触发
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1; // 重置当前页码为第一页
      if (this.isSearched) {
        this.getFullTextSearch();
      } else {
        this.fetchPositionData();
      }
    },
    // 当当前页码改变时触发
    handleCurrentPageChange(page) {
      this.currentPage = page;
      if (this.isSearched) {
        this.getFullTextSearch();
      } else {
        this.fetchPositionData();
      }
    },
    handleClear() {
      // 清空搜索关键字的处理逻辑
      // 可以将搜索关键字清空，重新获取数据等
    },
    handleKeyPress(event) {
      if (event.keyCode === 13) {
        if (this.searchText.trim() === "") {
          // 输入框为空，重新获取数据
          this.fetchPositionData();
        } else {
          this.isSearched = true; // 设置为搜索状态
          console.log(this.searchText);
          this.getFullTextSearch();
        }
      }
    },
    getFullTextSearch(){
      fullTextSearch(this.searchText, this.currentPage, this.pageSize).then(response =>{
        this.totalPositions = response.data.total;
        this.positionData = response.data.records;
      })
    }
  },
};
</script>

<style scoped>
.search-container {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

/* 搜索框样式 */
.search-input {
  width: 40%;
  height: 30px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 5px;
}

/* 搜索按钮样式 */
.search-button {
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  border: none;
  border-radius: 0 5px 5px 0;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

/* 搜索按钮悬停样式 */
.search-button:hover {
  background-color: #0056b3;
}
.search {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/searchBg.png");
  background-color: #0e4d8f;
  background-size: cover;
}
.searchInput{
   height: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
 }

.tableData {
  height: 80%;
  width: 100%;
  align-items: center;
  opacity:  0.7;
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


</style>

<style>
.el-input__inner{
  color: red;
}

.el-pagination__total{
  color: red;
}

.el-pagination__jump{
  color: red;
}
</style>