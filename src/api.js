import axios from "axios";

const instance = axios.create({
  baseURL: "https://wonderful-passion-8038f75266.media.strapiapp.com/api",
  headers: {
    Authorization:
      "Bearer " +
      "3d88455b557a9ed455d8a8fdeaffd78b2cb3946c64457604faafd861a095e4d61c39a59431c3d804ea47489794812eca0caa91a2cc5c87938b3cdd744b163e6965ec973c4676543df51e5365aef02e252188c1bedf7188b08b8843addd2dcf7346c6f3ea4461a6e842652f7f1c3a9f5ea25aee760cbd299f327fa3455e96d591",
  },
});

export default instance;
