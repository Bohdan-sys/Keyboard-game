import webpackStream from "webpack-stream";
import path from "path";

export const scripts = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.plumber())
        .pipe(webpackStream({
            entry: {
                script: './src/js/script.js',
                home: './src/js/home.js',
            },
            output: {
                path: path.resolve(path.dirname(`${app.path.build.js}`), `${app.path.build}`),
                filename: '[name].min.js'
            },
            mode: 'development',
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        exclude: '/node_modules/',
                        loader: 'ts-loader'
                    },
                ],
            },
            resolve: {
                extensions: ['.ts', '.js'],
                extensionAlias: {
                    ".js": [".js", ".ts"]
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream())
};