import axios from "axios";
import table from "tty-table";

import { config, options } from "./config.js";

export default async (stateId) => {
  try {
    const response = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`,
      config
    );

    const header = [
      {
        value: "district_id",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "District ID",
        width: 20,
      },
      {
        value: "district_name",
        color: "red",
        alias: "District Name",
        width: 40,
      },
    ];
    const out = table(header, response.data.districts, options).render();
    console.log(out);
  } catch (error) {
    console.log(error);
  }
};
