import Axios from "axios";

const Login = async (req, res) => {
  if (req.method === "POST") {
    await Axios.post("https://buildbrothers.com/enenu/api/login", req.body)
      .then((response) => {
        res
          .status(response.status)
          .json(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

export default Login;
