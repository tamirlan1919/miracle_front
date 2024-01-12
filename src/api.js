import axios from "axios";

const instance = axios.create({
  baseURL: "http://5.35.90.79:1337/api",
  headers: {
    Authorization:
      "Bearer " +
      "14c67d4867dad12b96b2be0964ec47a3d37ce383188f9d3217be288d24f4d38c5709b6ae355cbfa7708861a7bb2ccfbbd66f3c38f2d163e5d30e67c4e83ab2c2b6785f0db93fe73d1fb5780d20113846b09e4cc47ce87687cd3052468fcff95add33c1f169594e84f3e004e5f26999833bc1f80996780bebc65a6e66d4406b5a",
  },
});

export default instance;
