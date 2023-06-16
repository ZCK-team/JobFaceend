<template>
  <div class="search">
    <el-table :data="positionData" border style="height: 80vh;">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="job" label="职位"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="salary" label="薪资"></el-table-column>
      <el-table-column prop="education" label="教育"></el-table-column>
      <el-table-column prop="experience" label="经验"></el-table-column>
    </el-table>
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
    };
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
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/searchBg.png");
  background-size: cover;
}
</style>
