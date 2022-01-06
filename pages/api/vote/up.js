import Axios from "axios";

const Vote = async (req, res) => {
  if (req.method === "POST") {
    Axios.defaults.headers.common = {
      Authorization: `Bearer ${req.body.token}`,
    };
    await Axios.post(`https://buildbrothers.com/enenu/api/vote/${req.body.id}`)
      .then((response) => {
        Axios.post(
          `https://buildbrothers.com/enenu/api/item/${req.body.id}`
        ).then((itemRes) => {
          res.status(200).json(JSON.parse(JSON.stringify(itemRes.data)));
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

export default Vote;
