# Kernary 文档站

Kernary 的静态文档与 Package 发现站。Kernary 是模型驱动的本体引擎。

## 本地开发

当前兼容布局要求 Kernary Engine 与 Frontend Design Domain Package 位于：

```text
../prime-system
../prime-frontend-design
```

其他 Checkout 布局可以设置 `KERNARY_ENGINE_ROOT` 和
`KERNARY_FRONTEND_DESIGN_ROOT`。

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

所属仓库的文档 Source 缺失时，网站构建会直接失败。站点不再维护 Engine 与
Domain Reference 的手写副本。

## 内容 Owner

- Homepage、About、Package discovery、Blog 与导航由网站仓拥有。
- Engine Guide、Concept 与 Reference 来自 `prime-system/docs/`。
- Frontend Design 案例来自 `prime-frontend-design/docs/overview.zh-CN.md`。
- `data/packages.yaml` 只定位用于检查的兼容 Corpus Snapshot，不是 Registry
  Service，也不表示 Package 已发布。
- 旧 Skill Wiki / Prime v1 Route 保留兼容提示和 `noindex`，不再出现在当前导航。

外部域名与 GitHub Pages 迁移完成前，配置的站点地址仍是
`https://skill-wiki.github.io`。
