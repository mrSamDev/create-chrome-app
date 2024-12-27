import { ExtensionConfig } from "../../config/default";

export function generateWebpackTemplate(config: ExtensionConfig): string {
  return `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
${config.useTailwind ? "const tailwindcss = require('tailwindcss');" : ""}

module.exports = {
  mode: 'development',
  entry: {
    popup: './src/pages/popup/index.tsx',
    options: './src/pages/options/index.tsx',
    background: './src/background/index.ts',
    content: './src/content-scripts/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          ${config.useTailwind ? "'postcss-loader'" : ""}
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: chunk => chunk.name !== 'content'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: './public/options.html',
      filename: 'options.html',
      chunks: ['options']
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/assets", to: "assets" }
      ],
    }),
  ]
};`;
}
