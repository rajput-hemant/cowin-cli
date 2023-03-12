import axios from "axios";
import table from "tty-table";

import { config, options } from "./config.js";

export default async () => {
  try {
    const response = await axios.get(
      "https://cdn-api.co-vin.in/api/v2/admin/location/states",
      config
    );

    const header = [
      {
        value: "state_id",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "State ID",
        width: 20,
      },
      { value: "state_name", color: "red", alias: "State Name", width: 40 },
    ];
    const out = table(header, response.data.states, options).render();
    console.log(out);
  } catch (error) {
    console.log(error);
  }
};
