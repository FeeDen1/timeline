import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import ReactRefreshTypeScript from 'react-refresh-typescript'


export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.ts|tsx$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: isDev ? [ReactRefreshTypeScript()] : [],
                    }),
                    transpileOnly: isDev,
                },
            }
        ],
        exclude: /node_modules/,
    }

    const scssLoader = buildCssLoader(isDev);

    return [typescriptLoader, scssLoader];
}
