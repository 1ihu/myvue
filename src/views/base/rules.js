const userrules = {
    account: [
        { required: true, message: "请输入帐号", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ],
    userName: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 1, max: 5, message: "最多5个汉字", trigger: "blur" }
    ],
    userTel: [
        { required: true, message: "请填写电话号码", trigger: "blur" }
    ],
    Enablingthetime: [
        {
            required: true,
            type: 'array',
            message: "请选择日期",
            trigger: "blur"
        }
    ],
    role: [
        { required: true, type: 'array', message: "请至少选择一个角色", trigger: "change" }
    ]
}

const rolerules = {
    Serialnumber: [
        { required: true, message: "请输入角色编号", trigger: "blur" },
        { min: 6, max: 16, message: "6~16个字符", trigger: "blur" }
    ],
    rolename:[
        { required: true, message: "请输入角色名称", trigger: "blur" },
        { min: 1, max: 5, message: "最多5个汉字", trigger: "blur" }
    ]
}

const dictionaryrole ={
    Serial: [
        { required: true, message: "请输入类别编号", trigger: "blur" },
        { min: 4, max: 6, message: "4~6个数字", trigger: "blur" }
    ],
    classname:[
        { required: true, message: "请输入类别名称", trigger: "blur" },
        { min: 2, max: 10, message: "2~10个字符", trigger: "blur" }
    ]
}

const departmentrules ={
    departmentFormnumber: [
        { required: true, message: "请输入部门编号", trigger: "blur" },
        { min: 6, max: 16, message: "6~16个字符", trigger: "blur" }
    ],
    departmentFormnname:[
        { required: true, message: "请输入部门名称", trigger: "blur" },
        { min: 1, max: 5, message: "最多5个汉字", trigger: "blur" }
    ]
}
export  {
    userrules,//用户
    departmentrules,//部门
    rolerules,//角色
    dictionaryrole,//字典

}