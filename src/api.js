import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization:
      "Bearer " +
      "cc67839e13fb0704ac91b7eddc18679aab3154051e7eb35411441ffddebeb2a058d969176dc4e9da075499a0ed19f303950fb1e678ed1eae0576ec96b38b17e74cc9bb11298819184381f25ec4ef554fb07c39ad315fd85048976aa3fe0c55fbbf336c00d8468c515f16038977034459833bd356887c613d1dfed016bee51f89",
  },
});

export default instance;
