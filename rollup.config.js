import commonjs from "@rollup/plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import cleaner from "rollup-plugin-cleaner";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";

export default {
    input: "src/vNotif.ts",
    dest: "dist",
    output: [
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        },
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.unpkg,
            format: "umd",
            name: "vNotif",
            sourcemap: true,
            globals: {
                vue: "Vue"
            }
        }
    ],
    plugins: [
        cleaner({
            targets: ["./dist/"]
        }),
        copy({
            targets: [
                { src: "src/termeh.scss", dest: "dist", rename: "style.scss" }
            ]
        }),
        scss({
            output: "./dist/style.css",
            sass: require("sass")
        }),
        typescript({
            tsconfig: "./tsconfig.json"
        }),
        VuePlugin(),
        commonjs()
    ],
    external: ["vue", "animejs", "shortid"]
};
