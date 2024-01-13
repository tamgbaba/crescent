import { ipcMain } from 'electron';



export default ipcMain.on("stopRecord", function (event, arg) {
  console.log("stopRecord", arg);
  if (!server) {
    console.log("To HTTPServer didn't exist, so ignore stop command");
    return;
  }
  instance.ffmpegProc.stdin.write("q\n");
  server.shutdown(function(err) {
          if (err) {
              return console.log('shutdown failed', err.message);
          }
          console.log('Everything is cleanly shutdown.');
  });
  server.on('close', function () {
    console.log('子进程关闭了')
  })
  server.on('exit', function () {
    console.log('子进程退出了')
  })
});

