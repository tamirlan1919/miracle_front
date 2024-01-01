import axios from "axios";

const instance = axios.create({
  baseURL: "https://strapi-demo-63hg.onrender.com/api",
  headers: {
    Authorization:
      "Bearer " +
      "9817aae259f3c0627233879b497fb3399af0e776e4c3ebd1e7d37c5a2996e1de757ab56c3b1a3a9fcb6589ccc57540fd7557ccdea73ec18a22ee9dba7b0585e9543230ad416b9e300630df1a2cc7b54fb3bebd687938ce619cbdc77dbdf118755c058c15ac447198c9baaa064b99d6d567308eedcbe9f98fdb64e3104f20ee40",
  },
});

export default instance;
