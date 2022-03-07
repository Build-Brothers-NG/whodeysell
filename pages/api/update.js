import Axios from "axios";
const Add = async (req, res) => {
  if (req.method === "POST") {
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${req.body.token}`,
    };
    await Axios.post(
      `https://buildbrothers.com/enenu/api/update/${req.body.value.id}`,
      req.body.value
    )
      .then((response) => {
        console.log("item updated");
        res.status(200).json(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((err) => {
        console.log("item not updated");
        console.log(err);
        res.send(err);
      });
  }
};

export default Add;
