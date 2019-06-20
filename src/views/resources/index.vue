<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 平台 -->
      <el-tab-pane label="平台" name="first">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-tree
                :data="dataplatform"
                :props="defaultPropsplatform"
                @node-click="handleNodeClickplatform"
              ></el-tree>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <div class="from_control">
                <div class="from_class">
                  <el-input
                    placeholder="请输入内容"
                    v-model="input3"
                    :size="size"
                    class="input-with-select"
                  >
                    <el-select
                      v-model="select"
                      slot="prepend"
                      style="width:120px;"
                      placeholder="请选择"
                    >
                      <el-option label="帐号" value="1"></el-option>
                      <el-option label="姓名" value="2"></el-option>
                      <el-option label="手机号码" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
                  </el-input>
                </div>
                <div class="from-btns">
                  <el-button
                    :size="size"
                    icon="el-icon-plus"
                    @click="dialogVisibleplatform = true"
                    type="primary"
                  >添加</el-button>
                  <el-button
                    :size="size"
                    icon="el-icon-delete"
                    @click="dialogVisibleplatform = true"
                    type="danger"
                  >添加</el-button>
                </div>
              </div>
              <el-table
                :data="tableDataplatform"
                tooltip-effect="dark"
                @selection-change="handleSelectionChangeplatform"
                border
                style="width: 100%"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 运营 -->
      <el-tab-pane label="运营" name="second"></el-tab-pane>
      <!-- 组织 -->
      <el-tab-pane label="组织" name="third"></el-tab-pane>
    </el-tabs>

    <!-- 平台弹窗 -->

    <el-dialog
      title="菜单基本信息"
      :visible.sync="dialogVisibleplatform"
      width="30%"
    >
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleplatform = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleplatform = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "",
      input3: "",
      activeName: "first",
      select: "",
      dialogVisibleplatform: false,
      tableDataplatform: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dataplatform: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultPropsplatform: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClickplatform(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChangeplatform() {}
  }
};
</script>

<style lang="scss" scoped>
.from_control {
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
