# ForClaude

用 Vite + React 做的小示例（计数器 + 待办清单），用来演示「GitHub 仓库 → Netlify 自动部署」流程。

```bash
npm install
npm run dev      # 本地开发
npm run build    # 构建到 dist/
```

Netlify 部署设置：Build command `npm run build`，Publish directory `dist`（已写在 `netlify.toml` 里）。
