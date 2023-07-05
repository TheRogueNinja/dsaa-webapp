library(plumber)

pr("controllers.R")|>
  pr_run(port=9001, host="0.0.0.0")