# Web Todo

一个基于 Vue 3、Vite、TypeScript、Pinia 和 Vue Router 的本地 Todo 应用。

## 启动

```bash
npm install
npm run dev
```

## 测试

```bash
npm test
```

## 构建

```bash
npm run build
```

## 自动部署

- 推送到 `main` 时会触发 GitHub Actions 自动测试、构建并部署到 GitHub Pages
- Pages 地址按仓库推断为：`https://yeomanye.github.io/todo-test/`
- 如果仓库还没启用 Pages，请在 GitHub 仓库设置里把 Pages 的 Source 切到 `GitHub Actions`

## 功能

- 新增任务
- 编辑任务
- 完成/取消完成
- 删除任务
- 全部、进行中、已完成筛选
- 清空已完成
- `localStorage` 本地持久化
