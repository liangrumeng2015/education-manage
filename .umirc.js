
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'education-manage',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy:{
    '/api':{
        target:"http://192.168.0.107:7066",
        // target:'http://188.131.169.171:17366',
        // target:'http://39.108.184.152:9001',
        changeOrigin:true,
        "pathRewrite":{
            "^/api":"/"
        }
      },
      // '/api':{
      //   target:"http://localhost:5000/api",
      //   changeOrigin:true,
      //   "pathRewrite":{
      //       "^/api":""
      //   }
      // }
      // '/plus':{
      //   target:"https://api.hellorf.com/plus",
      //   changeOrigin:true,
      //   "pathRewrite":{
      //       "^/plus":""
      //   }
      // }
  }
}
