import BlockContent from "@sanity/block-content-to-react";
import HilightCode from "components/HighlightCode";
import { urlFor } from "lib/api";

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => {
      return (
        <HilightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HilightCode>
      );
    },
    image: ({ node: { asset, alt, position = "center" } }) => {
      return (
        <div className={`blog-image blog-image-${position}`}>
          <img src={urlFor(asset.url).height(600).fit("max")} />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return <BlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;
