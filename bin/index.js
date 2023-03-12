#! /usr/bin/env node

import { Command } from "commander";

import district from "../util/district.js";
import slots from "../util/slots.js";
import states from "../util/states.js";

const program = new Command();

// states();
// district(12);
// slots(512);

program
  .command("states")
  .description("list down all the states")
  .action(states);

program
  .command("district [state_id]")
  .description("get all district for a state using State Id")
  .action(district);

program
  .command("slots [district_id]")
  .description("get all slots for a district using District ID")
  .action(slots);

program.parse();
