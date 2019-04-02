<template>
  <a-table :columns="columns" :dataSource="data" bordered :scroll="{ x: 2000 }">
    <template
      v-for="col in ['UserName', 'Password', 'Name','EMail','Mobile']"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>{{text}}</template>
      </div>
    </template>
    <template slot="IsActive" slot-scope="IsActive">{{IsActive?"是":"否"}}</template>
    <template slot="IsSuperuser" slot-scope="IsSuperuser">{{IsSuperuser?"是":"否"}}</template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a class="edit-a" @click="() => edit(record.key)">编辑</a>
          <a class="edit-a" @click="() => toggleIsSuperuser(record.key)">{{getIsSuperuser(record.key)?"取消管理员":"提升为管理员"}}</a>
          <a class="edit-a" @click="() => toggleIsActive(record.key)">{{getIsActive(record.key)?"失效":"激活"}}</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "账号",
    dataIndex: "UserName",

    scopedSlots: { customRender: "UserName" }
  },
  {
    title: "密码",
    dataIndex: "Password",

    scopedSlots: { customRender: "Password" }
  },
  {
    title: "姓名",
    dataIndex: "Name",
    scopedSlots: { customRender: "Name" }
  },
  {
    title: "邮箱",
    dataIndex: "EMail",
    scopedSlots: { customRender: "EMail" }
  },
  {
    title: "手机",
    dataIndex: "Mobile",
    scopedSlots: { customRender: "Mobile" }
  },
  {
    title: "是否激活",
    dataIndex: "IsActive",
    scopedSlots: { customRender: "IsActive" }
  },
  {
    title: "是否管理员",
    dataIndex: "IsSuperuser",
    scopedSlots: { customRender: "IsSuperuser" }
  },
  {
    title: "上次访问",
    dataIndex: "LastVisit"
  },
  {
    title: "创建人员",
    dataIndex: "AuditInfo.Creator"
  },
  {
    title: "创建时间",
    dataIndex: "AuditInfo.CreateTime"
  },
  {
    title: "更新人员",
    dataIndex: "AuditInfo.Updater"
  },
  {
    title: "更新时间",
    dataIndex: "AuditInfo.UpdateTime"
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [
  {
    key: "1",
    UserName: "ylwbl",
    Password: 32,
    Name: "123",
    DeptCode: [1, 2, 3],
    EMail: "1144951039@QQ.COM  ",
    Mobile: "17805804790",
    IsActive: true,
    IsSuperuser: true,
    LastVisit: "19960827",
    AuditInfo: {
      Creator: "YLWBL",
      CreateTime: "12313",
      Updater: "YLWBL",
      UpdateTime: "19960827"
    }
  }
];
export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns
    };
  },
  methods: {
    handleChange(value, key, column) {
    console.log(value,key,column)
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
    console.log(key)
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    toggleIsSuperuser(key){
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.IsSuperuser=!target.IsSuperuser;
            this.data = newData;
        }
    },
    toggleIsActive(key){
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.IsActive=!target.IsActive;
            this.data = newData;
        }
    },
    getIsSuperuser(key){
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if(target){
            return target.IsSuperuser
        }
    },
    getIsActive(key){
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        if(target){
            return target.IsActive
        }
    }
  }
};
</script>
<style scoped>
    .editable-row-operations a {
        margin-right: 8px;
    }
    .toggleIs {
        color: #1890ff;
    }
    .toggleIs:hover {
        cursor: pointer;
    }
    .edit-a{
        user-select: none;
    }
</style>




