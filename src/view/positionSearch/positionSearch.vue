<template>
  <div class="search">
    <div class="searchInput">
      <el-input
        style="border-radius: 50px;"
          class="input rainbow-input"
          v-model="searchText"
          placeholder="请输入搜索关键字"
          size="medium"
          @clear="handleClear"
          @keyup.native="handleKeyPress"
      ></el-input>
      <span class="energy-ball" @click="getFullTextSearch">
      <i class="el-icon-search"></i>
    </span>
    </div>
    <div class="tableData" >
      <el-table
          :data="positionData"
          class="table"
          border
          :cell-style="cellStyle"
          :row-style="{height: '6.3vh'}"
          height="520px"
          :style="{width: '92%'}"
          :header-cell-style=" headerCellStyle"
          style="height: 85vh; width: 80%; text-align: center ">
        <el-table-column prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="city" label="城市" width="100px"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="salary" label="薪资"></el-table-column>
        <el-table-column prop="education" label="学历" width="100px"></el-table-column>
        <el-table-column prop="experience" label="工作经验"></el-table-column>
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
import {fullTextSearch, getPositionInformationAll} from "@/api/positionInformation";

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

  },
  mounted() {
    this.fetchPositionData();
    this.getFullTextSearch();
  },
  methods: {
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
    handleKeyPress(event) {
      if (event.keyCode === 13) {
        this.getFullTextSearch();
      }
    },
    getFullTextSearch(){
      fullTextSearch(this.searchText, this.positionData, this.pageSize).then(response =>{
        this.positionData = response.data.records;
        this.totalPositions = response.data.total;
        console.log(this.totalPositions);
      })
    }
  },
};
</script>

<style scoped>
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
 }
.input{
  width: 500px;
  background-color: rgba(72, 14, 143, 0.82);
  cursor: pointer;
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


</style>

<style>
.el-input .el-input__inner{
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 0.9);
  border: none!important;
}
.tableData .table {
  opacity: 0.9;
}
.rainbow-input {
  top: 40px;
  position: relative;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  outline: auto;
}

.rainbow-input::after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 40px;
  box-shadow: 0 0 5px 2px #ff0000,
  0 0 5px 2px #ff7f00,
  0 0 5px 2px #ffff00,
  0 0 5px 2px #00ff00,
  0 0 5px 2px #0000ff,
  0 0 5px 2px #8a2be2,
  0 0 5px 2px #ff1493;
  animation: rainbow-animation 5s linear infinite;
}

@keyframes rainbow-animation {
  0%   { box-shadow:
  0 0 2px 2px #ff7f00,
  0 0 2px 3px #ffff00,
  0 0 2px 5px #0000ff,
  0 0 2px 6px #8a2be2,
  0 0 2px 7px #ff1493; }
  14%  { box-shadow: 0 0 5px 2px #ff1493,
  0 0 2px 3px #ff7f00,
  0 0 2px 4px #ffff00,
  0 0 2px 6px #0000ff,
  0 0 2px 7px #8a2be2; }
}

.rainbow-input::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: energy-ball-animation 2s linear infinite;
}

.energy-ball {
  position: absolute;
  top: 114px;
  right: 394px;
  transform: translateY(-50%);
  width: 19px;
  height: 18px;
  border-radius: 50%;
  background-color: rgba(72, 0, 255, 0.38);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.energy-ball i {
  color: #ffffff;
  font-size: 15px;

}

@keyframes energy-ball-animation {
  0% {
    box-shadow: 0 0 5px #ff0000,
    0 0 10px #ff7f00,
    0 0 15px #ffff00,
    0 0 20px #00ff00,
    0 0 25px #0000ff,
    0 0 30px #8a2be2,
    0 0 35px #ff1493,
    0 0 40px #ff0000,
    0 0 45px #ff7f00,
    0 0 50px #ffff00;
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    box-shadow: 0 0 5px #ff0000,
    0 0 10px #ff7f00,
    0 0 15px #ffff00,
    0 0 20px #00ff00,
    0 0 25px #0000ff,
    0 0 30px #8a2be2,
    0 0 35px #ff1493,
    0 0 40px #ff0000,
    0 0 45px #ff7f00,
    0 0 50px #ffff00;
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
