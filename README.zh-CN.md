# AOE 文档站

AOE 的静态文档与 Package 发现站。AOE 是面向 Agent 的本体引擎，由 Kernary 组织维护。

## 本地开发

当前布局要求 AOE Engine 与 Frontend Design Domain Package 位于：

```text
../aoe-engine
../aoe-frontend-design
```

其他 Checkout 布局可以设置 `AOE_ENGINE_ROOT` 和
`AOE_FRONTEND_DESIGN_ROOT`。

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

所属仓库的文档 Source 缺失时，网站构建会直接失败。站点不再维护 Engine 与
Domain Reference 的手写副本。

## 内容 Owner

- Homepage、About、Package discovery、Blog 与导航由网站仓拥有。
- Engine Guide、Concept 与 Reference 来自 `aoe-engine/docs/`。
- Frontend Design 案例来自 `aoe-frontend-design/docs/overview.zh-CN.md`。
- `data/packages.yaml` 只定位用于检查的公开 Corpus Package，不是 Registry
  Service，也不表示 Package 已发布。

当前站点部署在 `https://kernary-aoe.github.io`；产品名称、Metadata 和公开 Route
均使用 AOE。
