import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import {
  DocsLink,
  ExternalLink,
  GitHubLink,
  LivePreviewLink,
  MotokoLink,
  RustLink,
  YoutubeLink,
} from "@site/src/components/Common/CardIcons";
import Link from "@docusaurus/Link";

function formatLanguages(languages: (string | null)[]): string {
  if (
    languages.length === 0 ||
    languages[0] === null ||
    (languages[0] === "none" && languages.length === 1)
  ) {
    return "\u00A0"; //empty space
  }
  const uniqueLanguages = [
    ...new Set(languages.filter((language) => language !== "none")),
  ];
  return uniqueLanguages
    .map((language) =>
      language ? language.charAt(0).toUpperCase() + language.slice(1) : ""
    )
    .join(", ");
}

function Index({ title, body, languages, tags, link }) {
  const [showTags, setShowTags] = useState(false);
  const tagsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (tagsRef.current && !tagsRef.current.contains(event.target)) {
      setShowTags(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Link
      href={link}
      className="link-primary link-with-icon no-underline cursor-pointer hover:-translate-y-2 transition-transform text-black"
    >
      <article className="flex flex-col px-4 py-6 rounded-2xl border-0 border-razzmatazz border-solid bg-white border-t-[4px] h-full overflow-hidden">
        <div className="">
          <p className={styles.title}>{title}</p>
          <p className="tw-paragraph font-medium text-razzmatazz">
            {formatLanguages(languages)}
          </p>
          <p className="tw-paragraph-sm text-black-60 line-clamp-4">{body}</p>
          <p
            ref={tagsRef}
            className="flex flex-wrap space-x-1 transition-all duration-500 mt-auto"
          >
            {tags.slice(0, 2).map((tag) => (
              <span className="text-[11px] mt-1 text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px] ">
                {tag}
              </span>
            ))}
            {tags.length > 2 && !showTags && (
              <span
                onClick={(event) => {
                  event.preventDefault();
                  setShowTags(!showTags);
                }}
                className="text-[11px] mt-1 text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px]  hover:border-black/60"
              >
                + {tags.slice(2).length}
              </span>
            )}
            {showTags &&
              tags
                .slice(2)
                .map((tag) => (
                  <span className="text-[11px] mt-1  text-black/60  border-solid border border-black/20 justify-center px-2 rounded-[100px] ">
                    {tag}
                  </span>
                ))}
          </p>
        </div>
      </article>{" "}
    </Link>
  );
}

export default Index;
