<template>
  <div class="app-container">
    <el-form ref="ruleForm" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label prop="user">
        <el-input v-model="formInline.user" placeholder="用户名" />
      </el-form-item>
      <el-form-item label prop="status">
        <el-select v-model="formInline.status" clearable placeholder="请选择状态" style="width:140px">
          <el-option label="正常" value="1" />
          <el-option label="注销" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label prop="time">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" width="50" align="center" />
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="免单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusTileFilter }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="改变状态" width="110" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.switch"
            active-color="#ff4949"
            @change="changeSwitch(scope.row)"
          />
        </template>
      </el-table-column> -->
      <el-table-column align="center" prop="created_at" label="免单时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="消费时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="备注" min-width="300px">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.title" size="small" class="edit-input" />
            <el-button
              type="warning"
              icon="el-icon-refresh"
              size="small"
              class="cancel"
              @click="cancelEdit(scope.row)"
            >取消</el-button>
          </template>
          <span v-else v-html="scope.row.title" />
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="120px">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >保存</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
const formInline = {
  user: '',
  time: [],
  status: ''
}
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info'
      }
      return statusMap[status]
    },
    statusTileFilter(status) {
      const statusMap = {
        0: '正常',
        1: '注销'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: Object.assign({}, formInline)
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    changeSwitch(row) {
      row.status = row.status ? 0 : 1
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    statuswitchFilter(status) {
      const statusMap = {
        published: false,
        draft: true,
        deleted: true
      }
      return statusMap[status]
    },
    onSubmit() {},
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          this.$set(v, 'switch', !!v.status)
          v.originalTitle = v.title //  will be used when user click the cancel botton

          return v
        })
        this.listLoading = false
      })
    }
  }
}
</script>
<style  scoped>
.edit-input {
  padding-right: 85px;
}
.cancel {
  position: absolute;
  right: 15px;
  top: 12px;
}
</style>

