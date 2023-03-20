# nuk_script
簡化你的工作流程

## 獎助生系統時數比對
### 說明
自動比對工讀生填寫系統是否符合標準

符合會標示為綠色格子，不符合會標示為紅色格子

### 安裝
新增一個書籤，名稱任意，網址輸入以下內容
```
javascript:(function(){let js=document.createElement("script");js.src="https://sharteeya.github.io/nuk_script/scripts/workHourCheck.js";document.body.appendChild(js);})();
```

### 使用
時點擊書籤就會啟動腳本，這段程式碼會將腳本注入到網頁中
