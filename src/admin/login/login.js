const app = {
  name: 'Login',
  data() {
    return {
      form: {
        accout: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      this.$api.post('/admin/Xlogin', this.form, rep => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.errno == "0" && rep.data.msg == "登录成功") {
            const token = rep.data.data.token;
            localStorage.setItem("porToken", token);
            this.$message.success( rep.data.msg);
            this.$router.push({ name: "control" });

          }else{
            this.$message.error( rep.data.msg);
          }
        }
      })
    }
  }
}
module.exports = app
