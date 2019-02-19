# .env設定說明
## PORT
設定這個NodeJs的Port號
## NODE_ENV
宣告使用的開啟模式

可選:
- development
- production

development -> 都是強制開啟console log

## VERSION
宣告目前使用的版本號碼

## HOST
預設都是使用0.0.0.0(本機)

## JWT_ENABLE
要不要開啟JWT(預設關閉)

## JWT_PRIVATEKEY
JWT的密鑰

## HTTP2
是否開啟HTTP2

## LOG_LEVEL
需要LOG的程度

## LOGGER
是否要開啟LOGGER

## DB_USER
ArangoDB的使用者

## DB_PASSWORD
ArangoDb使用者的密碼

## ARANGO_VERSION
ArangoDB要使用的版本

## ARANGODB_CLUSTER
ArangoDB Cluster的Nodes IP:Port

## REDIS_CLUSTERS
Redis Cluster的IP:Port

## HTTPS_KEY
Https的key

## HTTPS_CERT
Https的cert

## ARANGODB_HOST1
預設Arangodb的第一個節點

## ARANGODB_HOST2
預設Arangodb的第二個節點

## ARANGODB_HOST3
預設Arangodb的第三個節點

## REDIS_HOSTS
預設預設Redis的IP