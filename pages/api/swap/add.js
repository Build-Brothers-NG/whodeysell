import Axios from "axios";
const Add = async (req, res) => {
  if (req.method === "POST") {
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${req.body.token}`,
    };
    await Axios.post(
      "https://buildbrothers.com/enenu/api/swap/add",
      req.body.value
    )
      .then((response) => {
        // res.send(req.body)
        res.status(200).json(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

export default Add;
