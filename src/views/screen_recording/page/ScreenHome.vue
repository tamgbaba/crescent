
<template>
  <div class="control">
    <el-select v-model="selectWinsoureId" class="m-2" placeholder="Select" size="large" style="width: 240px"
      @change="winChange(selectWinsoureId)">
      <el-option v-for="win in winSources" :key="win.id" :label="win.label" :value="win.id" />
    </el-select>
    <video controls preload="auto" ref="screenVdeo"></video>
    <el-switch v-model="isTranscribe" @click="transcribe(isTranscribe)" />
  </div>
</template>
  
<script >
import { reactive, ref } from "vue";
const { ipcRenderer, Notification, desktopCapturer } = require("electron");
export default {
  name: "control",
  setup() {
    const winSources = reactive([]);
    const selectWinsoureId = ref(null);
    const screenVdeo = ref(null);
    const isTranscribe = ref(false)
    const streamScreen = ref(null);


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

      //停止录制
      streamScreen.value.addEventListener('stop', () => {
        console.log('stop')
      })

      //暂停录制
      streamScreen.value.addEventListener('pause', () => {
        console.log('pause')
      })

      //恢复录制
      streamScreen.value.addEventListener('resume', () => {
        console.log('resume')
      })

      //录制错误
      streamScreen.value.addEventListener('error', (err) => {
        console.log('error')
      })

      //录制错误
      streamScreen.value.addEventListener('start', () => {
        console.log('start')
      })

      //开始录制
      streamScreen.value.start()
    };
    const blobToFileSave = (blobData, { type }) => {

    }

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
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => devices.filter((d) => d.kind === "videoinput"))
        .then((devices) => console.log(devices)); // devices 为摄像头数组);
    };

    // 是否打开录制，true开启，false关闭


    const transcribe = (is) => {

      console.log(streamScreen)
      if (!is) {
        streamScreen.value.resume()
      } {
        streamScreen.value.pause()
      }
    };
    // const getVideoDom = (el, id) => {
    //   screenVdeo.value.push({
    //     id: id,
    //     el: el,
    //   });
    // };

    //获取电脑屏幕
    return {
      getMediaDevices,
      getWindowScreen,
      winSources,
      winChange,
      selectWinsoureId,
      screenVdeo,
      isTranscribe,
      streamScreen,
      transcribe
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
  