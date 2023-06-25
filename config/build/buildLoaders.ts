import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import webpack from 'webpack';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.(ico|svg)$/i,
    use: ['@svgr/webpack'],
  };
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: options.isDev
              ? '[path][name]__[local]'
              : '[hash:base64:5]',
            auto: (resPath: string) => resPath.includes('.module.'),
          },
          sourceMap: options.isDev,
        },
      },
      'sass-loader',
    ],
  };
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff|webp)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };
  return [typescriptLoader, cssLoader, fileLoader, svgLoader];
}