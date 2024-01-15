
<template>
  <div class="control">
    <el-select v-model="selectWinsoureId" class="m-2" placeholder="Select" size="large" style="width: 240px"
      @change="winChange(selectWinsoureId)">
      <el-option v-for="win in winSources" :key="win.id" :label="win.label" :value="win.id" />
    </el-select>
    <video controls preload="auto" ref="screenVdeo"></video>
    <el-switch v-model="isTranscribe" @click="transcribe(isTranscribe)" />
    <br>
    <button @click="streamScreen.stop()">停止录制</button>
    <span @click="openFile">
      <el-input v-model="selectPath" disabled placeholder="Please input" />
    </span>
  </div>
</template>
  
<script >
import { reactive, ref } from "vue";
const fs = require('fs');
const path = require('path');
const { dialog, desktopCapturer, ipcRenderer } = require("electron");

export default {
  name: "control",
  setup() {
    const winSources = reactive([]);
    const selectWinsoureId = ref(null);
    const screenVdeo = ref(null);
    const isTranscribe = ref(false)
    const streamScreen = ref(null);
    const chunks = [];
    const selectPath = ref('C:\\Users\\Default\\Videos');

    //当tab切换时
    const winChange = async (sourceId) => {
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height,
          },
        },
      });
      const video = screenVdeo.value;
      video.srcObject = stream;

      streamScreen.value = new MediaRecorder(stream)
      video.onloadedmetadata = (e) => video.play();

      streamScreen.value.addEventListener("dataavailable", function (e) {
        chunks.push(e.data);
      });
      //停止录制
      streamScreen.value.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: 'video/map4' });
        blob.arrayBuffer().then((arrayBuffer) => {
          const buffer = Buffer.from(arrayBuffer);
          // 生成一个唯一的文件名，这里使用当前时间戳
          const date = new Date();
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
          const fileName = `明月录屏-${formattedDate}.mp4`
          const filePath = path.join(selectPath.value, fileName); s
          const fileStream = fs.createWriteStream(filePath);
          fileStream.write(buffer);
          fileStream.end();
        })

        //保存成功后消息提醒
        isTranscribe.value = false
      })

      //暂停录制
      streamScreen.value.addEventListener('pause', () => {
        console.log('pause')
        isTranscribe.value = false
      })

      //恢复录制
      streamScreen.value.addEventListener('resume', () => {
        console.log('resume')
        isTranscribe.value = true
      })

      //录制错误
      streamScreen.value.addEventListener('error', (err) => {
        console.log('error')
        isTranscribe.value = false
      })

      //开始录制
      streamScreen.value.addEventListener('start', () => {
        isTranscribe.value = true
      })

      //开始录制
      streamScreen.value.start()
    };

    //获取电脑屏幕窗口信息
    const getWindowScreen = async () => {
      desktopCapturer
        .getSources({
          types: ["window", "screen"],
          thumbnailSize: {
            height: 300, // 窗口或屏幕的截图快照高度
            width: 300, // 窗口或屏幕的截图快照宽度
          },
          fetchWindowIcons: true, // 如果视频源是窗口且有图标，则设置该值可以捕获到的窗口图标
        })
        .then(async (sources) => {
          selectWinsoureId.value = sources[0].id;
          for (const source of sources) {
            winSources.push({
              id: source.id,
              label: source.name,
            });
          }
          winChange(sources[0].id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //获取摄像头组
    const getMediaDevices = () => {
      huifu
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => devices.filter((d) => d.kind === "videoinput"))
        .then((devices) => console.log(devices)); // devices 为摄像头数组);
    };

    // 恢复和暂停录制
    const transcribe = (is) => {
      if (!is) {
        streamScreen.value.resume()
      } {
        streamScreen.value.pause()
      }
    };

    //打开本地文件选择文件路径
    const openFile = async () => {

    }

    return {
      getMediaDevices,
      getWindowScreen,
      winSources,
      winChange,
      selectWinsoureId,
      screenVdeo,
      isTranscribe,
      streamScreen,
      transcribe,
      selectPath,
      openFile
    };
  },
  mounted() {
    this.getWindowScreen();
  },

  beforeUnmount() { },
};
</script>
  
<style >
.control {
  display: flex;
}

video {
  width: 50%;
  height: 100%;
}
</style>
  