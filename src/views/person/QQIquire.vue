<template>
  <div id="qq">
    <el-container>
      <el-header style="background-color: teal">@广告招商中。。。。</el-header>
      <el-main>
        <el-input
          v-model="input3"
          :placeholder="callWord"
          class="input-with-select"
          style="width: 555px; text-align: center; margin: 0 auto"
        >
          <template #prepend>
            <el-select
              v-model="select"
              style="width: 150px"
              @change="input3 = ''"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="text-align: center; margin: 0 auto"
              />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="searchData(select, input3)" />
          </template>
        </el-input>

        <br />
        <br />
        <br />

        <el-card class="box-card" v-if="resultData.type">
          <template #header>
            <div class="card-header">
              <span>成功了</span>
            </div>
          </template>
          <div  v-for="o in resultData" :key="o" class="text item">

          <label>{{ o.label }}</label> <label > {{ o.value }}</label>
          </div>
          <template #footer>@广告招商中。。。。</template>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
let { proxy } = getCurrentInstance();
const typeList = reactive([
  { label: "QQ", value: 1 },
  { label: "Microblog", value: 2 },
  { label: "LOLName", value: 3 },
  { label: "Phone", value: 4 },
]);


const input3 = ref("");
const select = ref(1);
const callWord = ref("请选择查询方式");

const resultData= reactive({
  qq:{value:"",label:"QQ号:"},
  phone:{value:"",label:"手机号:"},
  phonediqu:{value:"",label:"号码归属地:"},
  type: false
})

watch(select, (newValue, oldValue) => {
  newValue;
  switch (newValue) {
    case 1:
      callWord.value = "输入QQ账号";
      break;
    case 2:
      callWord.value = "输入微博ID";
      break;

    case 3:
      callWord.value = "输入英雄联盟名称";
      break;

    case 4:
      callWord.value = "输入手机号";
      break;
  }
});

const searchData = (pitchOn, data) => {
  switch (pitchOn) {
    case 1: //根据qq账号查询
      qqClick(data);
      break;
    case 2: //根据微博id
      microblogClick(data);
      break;
    case 3: //根据lol名称
      lolClick(data);
      break;
    case 4: //根据手机号
      phoneClick(data);
      break;
  }
};

const qqClick = (searchData) => {
  proxy.$http
    .get("https://zy.xywlapi.cc/qqapi", {
      params: {
        qq: searchData,
      },
    })
    .then((res) => {
        if(res.status =="200"){
          resultData.type =true;
          resultData.phone.value = res.data.phone;
          resultData.qq.value = res.data.qq;
          resultData.phonediqu.value = res.data.phonediqu;
        }
    });
};

const phoneClick = (searchData) => {
  proxy.$http
    .get("https://zy.xywlapi.cc/qqphone", {
      params: {
        phone: searchData,
      },
    })
    .then((res) => {
      if(res.status =="200"){
          resultData.type =true;
          resultData.phone.value = res.data.phone;
          resultData.qq.value = res.data.qq;
          resultData.phonediqu.value = res.data.phonediqu;
        }
    });
};
const microblogClick = (searchData) => {
  proxy.$http
    .get("https://zy.xywlapi.cc/wbapi", {
      params: {
        id: searchData,
      },
    })
    .then((res) => {
      console.log(res);
    });
};

const lolClick = (searchData) => {
  proxy.$http
    .get("https://zy.xywlapi.cc/lolname", {
      params: {
        name: searchData,
      },
    })
    .then((res) => {
      console.log(res);
    });
};
</script>
  





<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
  