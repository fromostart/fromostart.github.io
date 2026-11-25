# 个人主页

## 修改文字

| 内容 | 中文 | English |
| --- | --- | --- |
| 个人介绍、技能、项目、竞赛、经历和导航 | [主页文字.toml](content/主页文字.toml) | [主页文字.toml](content_en/主页文字.toml) |
| 随笔标题和正文 | [随笔.md](content/随笔.md) | [随笔.md](content_en/随笔.md) |

首页与项目页共用 `[[projects.items]]`。竞赛在 `[[awards.items]]`，个人荣誉在 `[[awards.sections.items]]`，经历在 `[[experience.sections]]`。首页动态放在 TOML 末尾的 `[[news.news]]`，最新条目放最上面。技能卡片在 `[about.profile].skills`，中英文格言共用中文 TOML 的 `[site].signature`。

随笔第一行 `# 标题` 会显示为页面标题，正文写在下面。插图格式为 `![图片说明](/images/moments/图片文件.webp)`。

## 图片和相册

- `public/images/profile/` 放头像，`public/images/honors/` 放荣誉图片，`public/images/site/` 放站点图标。
- 相册原片放在 `.private/moments/`，可使用 JPG、PNG、WebP、AVIF 和 TIFF，也可放在子目录。该目录由 Git 忽略。
- 运行 `npm run photos` 生成 `public/images/moments/` 下的高斯模糊 WebP 副本和索引。公开副本去除 EXIF、定位信息和原始文件名。构建也会处理相册，无原片时沿用已有副本。
- 在中文 TOML 的 `[moments]` 中修改 `blur_sigma`，默认 24，可填 8–100。保存后重新运行 `npm run photos`。

## 本地预览和发布

首次运行时用 Node.js 22 或更新版本执行 `npm ci`。运行 `npm run dev -- --hostname 127.0.0.1 --port 4174`，打开 [本地预览](http://127.0.0.1:4174/)。

`src/` 存放页面组件和样式。`npm run build` 将站点导出至 `out/`。推送至 `main` 后，GitHub Actions 构建并把静态文件发布到 [线上主页](https://fromostart.github.io/)。
