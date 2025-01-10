# wsproxy
### 웹소켓 프록시 서버  
Tarui native 웹소켓 플러그인에서서 오류(Protocol error) 발생   
내장 웹소켓 서버와 클라이언트를 통해 메시지를 릴레이합니다.  
Tauri 플러그인 없이 브라우저 Websocket API를 통해 웹소켓 처리를 할 수 있습니다.   

### Usage 
```powershell
#target은 타깃 서버 주소이며, 필수 입력값입니다.
#port는 프록시 서버 포트번호이며, 생략가능합니다.(생략 시 9090)
./wsproxy.exe --target="wss://api.tiingo.com/iex" --port=9090
```

### Build
실행가능 바이너리 파일로 빌드하여 [Tauri sidecar](https://v2.tauri.app/develop/sidecar/)로 사용되도록 합니다.  
Bun 환경을 통해 [Single-file executable](https://bun.sh/docs/bundler/executables)형태로 빌드합니다.  
```powershell
bun run build
```
