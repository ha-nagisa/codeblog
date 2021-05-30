import { getBlogBySlug } from "lib/api";

export default async function enabledPreview(req, res) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const blog = await getBlogBySlug(req.query.slug);

  if (!blog) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // setPreviewData will set cookies into your browsert
  // __prerender_bypass __next_preview_data
  res.setPreviewData({});
  res.writeHead(307, { Location: `/blogs/${blog.slug}` });
  res.end();
}
