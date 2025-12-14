import { dirname, sep } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const repoPlugin = {
  rules: {
    "stories-in-stories-folder": {
      meta: {
        type: "problem",
        docs: {
          description: "Ensure Storybook stories live inside a __stories__ folder",
        },
        schema: [],
        messages: {
          default: "Storybook stories must be placed inside a __stories__ folder.",
        },
      },
      create(context) {
        return {
          Program(node) {
            const filename = context.getFilename();
            if (filename === "<input>") return;

            const isStory = /\.stories\.(?:[jt]sx?|mdx)$/.test(filename);
            const inStoriesFolder = filename.split(sep).includes("__stories__");

            if (isStory && !inStoriesFolder) {
              context.report({ node, messageId: "default" });
            }
          },
        };
      },
    },
  },
};

const eslintConfig = [
  { ignores: ["test-results/**", "playwright-report/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      repo: repoPlugin,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "repo/stories-in-stories-folder": "error",
    },
  },
];

export default eslintConfig;
