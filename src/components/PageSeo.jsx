import { useEffect } from "react";

export default function PageSeo({
  title,
  description,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}