import axios from "axios";

const instance = axios.create({
  baseURL: "http://5.35.90.79:1338/api",
  headers: {
    Authorization:
      "Bearer " +
      "010737886ab309d194936e1485a5cea4a5cf419c4cb0277de765d2fb0903300cee3ba264a455fd4d3d0d1b646dfc55654f031443bd0fdabaf49aa321c9516cf168861df96b83eccb97a9211d842f5166f431484dc0f110b2c653e478db9d764a1b50d9372ea03050b2fec09157d67b07bc4da3aee78d09373e48c7c5af2e0a65",
  },
});

export default instance;
