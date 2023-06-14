<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside :width="aside_width" style="height: 100vh;background-color: rgb(238, 241, 246);margin-left: -1px;">
            <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>
        <el-container style="height: 100vh; width: 88%;">
            <el-header style="text-align: right;font-size: 12px;height: 6%;border-bottom: rgba(168,168,168,0.3) 1px solid;">
                <Header @doCollapse="doCollapse" :icon="icon"></Header>
            </el-header>
            <el-div style="height: 94%;">
                <router-view></router-view>
            </el-div>
        </el-container>
    </el-container>
</template>

<script>
    import Aside from "../layout/Aside";
    import Header from "../layout/Header";

    export default {
        name: "Index",
        components:{Aside,Header},
        data(){
            return {
                isCollapse:false,
                aside_width:"12%",
                icon:'el-icon-s-fold'
            }
        },
        methods:{
            doCollapse(){
                console.log(1111)
                this.isCollapse = !this.isCollapse
                if(!this.isCollapse){// 展开
                    this.aside_witdh='200px'
                    this.icon='el-icon-s-fold'
                }else{//关起、关闭、收起
                    this.aside_witdh='64px'
                    this.icon='el-icon-s-unfold'
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        #background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-main{
        padding: 5px;
    }
    .el-aside {
        color: #333;
    }
</style>
