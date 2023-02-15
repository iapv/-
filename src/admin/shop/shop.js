
const app = {
  data() {
    return {
      Isselection: false,
      // imageurl: global.imageurl,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  created() {
    this.hoqu()
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    roterAdshop() {
      this.$router.push({
        name: "admin_add_shop",
      });
    },
    hoqu() {
      this.$api.post('/getBusdata',{},rep => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data.data
        }
      })
    },
    edit(row) {
      this.$router.push({
        name: "editShop",
        params: { id: row.id },
      });
    }
  },
}

module.exports = app
