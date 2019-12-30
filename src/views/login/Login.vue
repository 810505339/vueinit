<template>

    <div>
        <van-nav-bar
                title="登录"
                left-text="返回"
                right-text="按钮"
                left-arrow

        />
        <van-cell-group>
            <van-field
                    v-model="model.username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('question')"
            />

            <van-field
                    v-model="model.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <div>

            <van-row type="flex" justify="center">
                <van-col span="6"> <van-button type="default" @click="login()">登录</van-button></van-col>
                <van-col span="6"> <van-button type="default" @click="getApi()">注册</van-button></van-col>
                <van-col span="6"> <van-button type="default" @click="loginout()">登出</van-button></van-col>
            </van-row>



        </div>
    </div>
</template>

<script>
    import {LoginApi ,GetApi,out } from "utils/api"
    export default {
        name: "Login",
        data(){
            return{
                res:{},
                model:{
                    EmployeeNo:"G003",
                    FristName:"Mary",
                    LastName:"King"
                }
            }
        },
        methods:{
            login(){
                let data={
                    "EmployeeNo":this.model.EmployeeNo,
                    "FristName":this.model.FristName,
                    "LastName":this.model.LastName,
                    "LoginName":this.model.username,
                    "PassWord":this.model.password
                }
                LoginApi(data).then(res=>{
                    this.res=res;
                    this.$store.commit('set_token', this.res["token"]);
                    console.log(this.res["token"])

                }).catch(err=>this.$toast('错误'))



            },
            getApi(){
                GetApi().then(res=>console.log(res)).catch(err=>this.$toast(err))
            },
            loginout(){
                out().then(res=>{
                    console.log("登出");

                })

            }
        }
    }
</script>

<style scoped>

</style>