# 說明

## 必要環境部署
- Nodejs ^10
- Yarn ^1.12.3
- 請參考ArangoDB && Redis部署

## 環境變數設定說明
檔案是在.env裡面做設定
詳細說明請看
[.env](/ENV.md)

## ArangoDB && Redis部署
- 請參考[dev-env](https://git.clctech.co/projects/GP/repos/dev-env/browse)這個repository,先安裝好Redis跟ArangoDB的環境,
是使用Docker來部署


## NODEJS初始化

```
    npm run rebuild
```

## 啟動DEV模式

```
    npm run start:dev
```

## unit test

```
    npm test
```
