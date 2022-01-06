const express = require("express");
const app = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running at port no. :${PORT}`));

/*
create a basic html page, write an inline script, internal script,
import 1 external javascript file,

use javascript display methods(innerHTML, document.write, alert(), print(), console.log()
*/