<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 用户 -->
      <el-tab-pane label="用户" name="first">
        <!-- 搜索 -->
        <div class="from_control">
          <div class="from_class">
            <el-input placeholder="请输入内容" v-model="input3" :size="size" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width:120px;" placeholder="请选择">
                <el-option label="帐号" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
                <el-option label="手机号码" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
            </el-input>
          </div>
          <div class="from-btns">
            <el-button :size="size" icon="el-icon-plus" @click="adduser" type="primary">添加</el-button>
          </div>
        </div>

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="状态" width="180">
            <template slot-scope="scope">
              <el-tag :size="size" type="success">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="姓名" width="180"></el-table-column>
          <el-table-column prop="name" label="帐号" width="180"></el-table-column>
          <el-table-column prop="address" label="联系电话"></el-table-column>
          <el-table-column prop="address" label="联系电话"></el-table-column>
          <el-table-column prop="address" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" :size="size">编辑</el-button>
              <el-button type="text" :size="size">删除</el-button>
              <el-button type="text" :size="size">停用</el-button>
              <el-button type="text" :size="size">密码初始</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="paginationstyle"
          @size-change="handleSizeChangeuser"
          @current-change="handleCurrentChangeuser"
          :current-page="currentPageuser4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-tab-pane>
      <!-- 部门 -->
      <el-tab-pane label="部门" name="second">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="from_control">
              <div class="from_class">
                <el-input
                  placeholder="请输入内容"
                  v-model="input3"
                  :size="size"
                  class="input-with-select"
                >
                  <el-select v-model="select" slot="prepend" style="width:120px;" placeholder="请选择">
                    <el-option label="帐号" value="1"></el-option>
                    <el-option label="姓名" value="2"></el-option>
                    <el-option label="手机号码" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
                </el-input>
              </div>
              <div class="from-btns">
                <el-button :size="size" icon="el-icon-plus" @click="dialogVisibledepartment = true" type="primary">添加</el-button>
              </div>
            </div>
            <div class="grid-content bg-purple">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="部门名称" width="180">
                  <template slot-scope="scope">
                    <el-tag size="small" type="success">停用</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="date" label="部门编号" width="180"></el-table-column>
                <el-table-column prop="name" label="部门等级" width="180"></el-table-column>
                <el-table-column prop="address" label="添加时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                    <el-button type="text" size="small">停用</el-button>
                    <el-button type="text" size="small">密码初始</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                class="paginationstyle"
                @size-change="handleSizeChangeuser"
                @current-change="handleCurrentChangeuser"
                :current-page="currentPageuser4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 角色 -->
      <el-tab-pane label="角色" name="third">
        <div class="from_control">
          <div class="from_class">
            <el-input placeholder="请输入内容" v-model="input3" :size="size" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width:120px;" placeholder="请选择">
                <el-option label="帐号" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
                <el-option label="手机号码" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
            </el-input>
          </div>
          <div class="from-btns">
            <el-button :size="size" icon="el-icon-delete" @click type="danger">全删</el-button>
            <el-button
              :size="size"
              icon="el-icon-plus"
              @click="dialogVisiblerole = true"
              type="primary"
            >添加</el-button>
          </div>
        </div>
        <el-table :data="tableData" border ref="multipleTable"  tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
            </el-table-column>
          <el-table-column prop="date" label="角色名称" width="180"></el-table-column>
          <el-table-column prop="name" label="角色编号" width="180"></el-table-column>
          <el-table-column prop="address" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">停用</el-button>
              <el-button type="text" size="small">密码初始</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="paginationstyle"
          @size-change="handleSizeChangerole"
          @current-change="handleCurrentChangerole"
          :current-page="currentPagerole4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-tab-pane>
      <!-- 字典 -->
      <el-tab-pane label="字典" name="fourth">
        <div class="from_control">
          <div class="from_class">
            <el-input placeholder="请输入内容" v-model="input3" :size="size" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width:120px;" placeholder="请选择">
                <el-option label="帐号" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
                <el-option label="手机号码" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
            </el-input>
          </div>
          <div class="from-btns">
            <el-button :size="size" icon="el-icon-delete" @click type="danger">全删</el-button>
            <el-button
              :size="size"
              icon="el-icon-plus"
              @click="dialogVisibledictionary = true"
              type="primary"
            >添加</el-button>
          </div>
        </div>
        <el-table :data="tableData" border tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
          <el-table-column prop="date" label="姓名" width="180"></el-table-column>
          <el-table-column prop="name" label="帐号" width="180"></el-table-column>
          <el-table-column prop="address" label="联系电话"></el-table-column>
          <el-table-column prop="address" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">停用</el-button>
              <el-button type="text" size="small">密码初始</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="paginationstyle"
          @size-change="handleSizeChangeuser"
          @current-change="handleCurrentChangeuser"
          :current-page="currentPageuser4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-tab-pane>
      <!-- 日志 -->
      <el-tab-pane label="日志" name="debug">
        <div class="from_control">
          <div class="from_class">
            <el-input placeholder="请输入内容" v-model="input3" :size="size" class="input-with-select">
              <el-select v-model="select" slot="prepend" style="width:120px;" placeholder="请选择">
                <el-option label="帐号" value="1"></el-option>
                <el-option label="姓名" value="2"></el-option>
                <el-option label="手机号码" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
            </el-input>
          </div>
          <!-- <div class="from-btns">
            <el-button :size="size" icon="el-icon-plus" @click="adduser" type="primary">添加</el-button>
          </div>-->
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="状态" width="180">
            <template slot-scope="scope">
              <el-tag size="small" type="success">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="姓名" width="180"></el-table-column>
          <el-table-column prop="name" label="帐号" width="180"></el-table-column>
          <el-table-column prop="address" label="联系电话"></el-table-column>
          <el-table-column prop="address" label="添加时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">停用</el-button>
              <el-button type="text" size="small">密码初始</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="paginationstyle"
          @size-change="handleSizeChangeuser"
          @current-change="handleCurrentChangeuser"
          :current-page="currentPageuser4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- 用户添加弹窗 -->
    <el-dialog
      title="账户基本信息添加"
      :visible.sync="dialogVisibleuser"
      width="620px"
      :before-close="handleCloseuser"
    >
      <div class="addfrom">
        <el-form
          ref="Theuser"
          :model="Theuser"
          :rules="userrules"
          :size="dialogsize"
          label-width="80px"
        >
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="帐号" prop="account">
                  <el-input v-model="Theuser.account" placeholder="6~16位字符（包含字母、数字、符号)，区分大小写"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="Theuser.password" placeholder="6~16位字符（包含字母、数字、符号)，区分大小写"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="姓名" prop="userName">
                  <el-input v-model="Theuser.userName" placeholder="填写真实姓名，最多五个汉字"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="电话" prop="userTel">
                  <el-input v-model="Theuser.userTel" type="number" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 启用时间 -->
          <!-- {{Theuser.Enablingthetime}} -->
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <el-form-item label="启用时间" prop="Enablingthetime">
                  <el-date-picker
                    style="width:100%"
                    v-model="Theuser.Enablingthetime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- 角色 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色" prop="role">
                <el-select v-model="Theuser.role" multiple placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :size="dialogsize" @click="dialogVisibleuser = false">取 消</el-button>
        <el-button :size="dialogsize" type="primary" @click="dialogVisibleuserfnc('Theuser')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 部门 -->
        <el-dialog title="角色基本信息" :visible.sync="dialogVisibledepartment" width="30%">
      <el-form
        :model="departmentForm"
        :rules="departmentrules"
        ref="departmentForm"
        label-width="80px"
        class="demo-departmentForm"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="部门编号" prop="departmentFormnumber">
                <el-input
                  v-model="departmentForm.departmentFormnumber"
                  placeholder="唯一标识，不可重复6~16位字符（包含字母、数字、符号)，区分大小写"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="部门名称" prop="departmentFormnname">
                <el-input v-model="departmentForm.departmentFormnname" placeholder="6~16位字符（包含字母、数字、符号)，区分大小写"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledepartment = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitdepartment('departmentForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色 -->

    <el-dialog title="角色基本信息" :visible.sync="dialogVisiblerole" width="30%">
      <el-form
        :model="roleForm"
        :rules="rolerules"
        ref="roleForm"
        label-width="80px"
        class="demo-roleForm"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="角色编号" prop="Serialnumber">
                <el-input
                  v-model="roleForm.Serialnumber"
                  placeholder="唯一标识，不可重复6~16位字符（包含字母、数字、符号)，区分大小写"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="roleForm.rolename" placeholder="6~16位字符（包含字母、数字、符号)，区分大小写"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblerole = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitrole('roleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 字典弹窗 -->
    <el-dialog title="角色基本信息" :visible.sync="dialogVisibledictionary" width="30%">
      <el-form
        :model="dictionaryForm"
        :rules="dictionaryrole"
        ref="dictionaryForm"
        label-width="80px"
        class="demo-dictionaryForm"
      >
        <el-row type="flex" class="row-bg">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="类别编号" prop="Serial">
                <el-input
                  type="number"
                  v-model="dictionaryForm.Serial"
                  placeholder="唯一标识，不可重复6~16位字符（包含字母、数字、符号)，区分大小写"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="类别名称" prop="classname">
                <el-input
                  v-model="dictionaryForm.classname"
                  placeholder="6~16位字符（包含字母、数字、符号)，区分大小写"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibledictionary = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitdictionary('dictionaryForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { truncate } from "fs";
import { userrules, rolerules, dictionaryrole,departmentrules } from "./rules";
export default {
  data() {
    return {
      size: '', //页面input button大小
      dialogsize: "small", //弹窗input button大小
      dialogVisibleuser: false, //弹窗
      dialogVisiblerole: false,
      dialogVisibledictionary: false,
      dialogVisibledepartment:false,
      activeName: "first", //tabs
      input3: '', //tabsmodel
      select: '',
      currentPageuser4: 1, //用户
      currentPagerole4: 1, //角色
      // 添加用户from
      Theuser: {
        account: '', //帐号
        password: '', //密码
        userName: '', //姓名
        userTel: '', //电话
        Enablingthetime: [], //启用时间
        role: [] //角色
      },
      // 添加角色 from
      roleForm: {
        Serialnumber: '',
        rolename: ''
      },
      // 添加部门 from
      departmentForm:{
          departmentFormnumber:'',
          departmentFormname:''
      },
      //   添加字典
      dictionaryForm: {
        Serial: '',
        rolename: ''
      },
      tableData: [
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
      // 角色下拉
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      // 验证
      userrules: userrules,
      rolerules: rolerules,
      dictionaryrole: dictionaryrole,
      departmentrules:departmentrules,
      // 时间段
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      data: [
        {
          label: "益电工",
          children: [
            {
              label: "技术部",
              children: [
                {
                  label: "前端"
                },
                {
                  label: "后端"
                },
                {
                  label: "测试"
                }
              ]
            },{
              label: "运营部",
              children: [
                {
                  label: "文案"
                },
                {
                  label: "推广"
                },
                {
                  label: "运维"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created(){
    console.log(this.$route)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // *****************
    // *   用户         *
    // *****************
    handleSizeChangeuser(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeuser(val) {
      console.log(`当前页: ${val}`);
    },
    // 弹窗关闭
    handleCloseuser(done) {
      done();
      // 组织关闭弹窗回调
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    // 搜索查询
    onSubmit() {},
    // 添加弹窗
    adduser() {
      this.dialogVisibleuser = true;
    },
    // 提交弹窗from
    dialogVisibleuserfnc(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // *****************
    // *    部门        *
    // *****************
    // 部门树状
    handleNodeClick(data) {
      console.log(data);
    },
    onSubmitdepartment(formName){
        this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!")
        } else {
          console.log("error submit!!")
          return false;
        }
      });
    },
    handleSelectionChange(){

    },
    // *****************
    // *    角色        *
    // *****************
    // 角色from提交

    handleCloserole() {
      this.dialogVisiblerole = true;
    },
    handleSizeChangerole(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangerole(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmitrole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmitdictionary(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.from_control {
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  .addfrom {
    text-align: left;
  }
  .from_class {
    display: flex;
    justify-content: space-between;
  }
  .input-with-select {
    width: 600px;
  }
}
</style>
