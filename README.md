## XWAYOS DOCS FRONTEND

### 启动

```
npm start
```

注：node v18.19.0

### build

```
npm run build
```
构建镜像

```bash
docker build -t xwayos-docs-frontend:v0.2 .
```
### DEPLOY
0.查看桥接网络
```bash
docker network ls
```
1.若无，先创建网络
```bash
docker network create -d bridge xwayos-net
```
2.启动容器
```bash
docker run --name xwayos-docs-frontend --restart=always --network xwayos-net -p 9041:9041 -d xwayos-docs-frontend:v0.2
```
3.进入容器
```bash
docker exec -it 4812febf5d87 /bin/bash
```
