import axios from "axios";
import table from "tty-table";
import chalk from "chalk";
import inquirer from "inquirer";
import notifier from "node-notifier";

import { config, options } from "./config.js";

export default async (districtId) => {
  try {
    const currDate = new Date()
      .toLocaleDateString("en-GB")
      .split("/")
      .join("-");

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Please choose age group",
        choices: [
          { name: "All Ages", value: "" },
          { name: "45+", value: "45" },
          { name: "18-45", value: "18" },
        ],
      },
    ]);

    const response = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${currDate}`,
      config
    );

    const header = [
      {
        value: "center",
        headerColor: "cyan",
        color: "white",
        align: "left",
        alias: "Center Name",
        width: 40,
      },
      {
        value: "address",
        color: "red",
        alias: "Center Address",
        width: 40,
      },
      {
        value: "available",
        color: "red",
        alias: "Available Slots",
        width: 20,
      },
      {
        value: "age",
        color: "red",
        alias: "Age",
        width: 10,
      },
      {
        value: "date",
        color: "red",
        alias: "Date",
        width: 20,
      },
    ];

    const centers = [];
    let district = "";
    response.data.centers.forEach((item) => {
      district = item.district_name;
      item.sessions.forEach((session) => {
        if (answer.choice == "") {
          centers.push({
            center: item.name,
            address: item.address,
            available: session.available_capacity,
            age: session.min_age_limit,
            date: session.date,
          });
        } else if (answer.choice == session.min_age_limit) {
          centers.push({
            center: item.name,
            address: item.address,
            available: session.available_capacity,
            age: session.min_age_limit,
            date: session.date,
          });
        }
      });
    });

    if (centers.length == 0) {
      notifier.notify({
        title: "Cowin Slots",
        message: "No available slots found!",
      });
      console.log(chalk.blue.blue("No available slots found!"));
      process.exit(1);
    }

    const out = table(header, centers, options).render();

    console.log(chalk.blue.bold("Date     : ", currDate));
    console.log(chalk.blue.bold("District : ", district));
    console.log(out);
  } catch (error) {
    console.log(error);
  }
};
