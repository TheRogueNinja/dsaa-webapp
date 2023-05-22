suppressMessages(library("caretEnsemble"))
library(ggplot2)
library(dplyr)
library(kknn)
library(Metrics)
library(kknn)
library(jsonlite)
library(reshape2)
library(Rook)

mdl_predict <- function(ip_df){
  
  # The directory for saved models
  MDL_DIR = file.path("./saved_models")
  
  output_dir <- "./dump"
  # File for saving prediction statistics
  prediction_result = file.path(output_dir, "pred_stat.txt")
  
  
  # Function for loading input data
  # load_input_data <- function(input_file_path){
  #   data <- read.csv2(file=input_file_path, sep=",", stringsAsFactors = FALSE)
  #   data <- as.data.frame(apply(data, 2, as.numeric))
  #   return(data)
  # }
  
  # Load the data
  data <- ip_df
  
  real_id = which(colnames(data) == "Zreal")
  imag_id = which(colnames(data) == "Zimag")
  
  real_data <- data[, -imag_id]
  imag_data <- data[, -real_id]
  
  print("#######################")
  print("1. Data loading complete")
  print("#######################")
  
  
  
  print("#######################")
  print("2. Starting model predictions")
  print("#######################")
  
  # Load the model for real impedance
  real_mdl <- readRDS(file.path(MDL_DIR, "real_mdl.rds"))
  
  # Load the model for imaginary impedance
  imag_mdl <- train.kknn(Zimag ~ ., imag_data, ks = c(2),  kernel = "inv", distance = 1)
  
  
  result <- data.frame()
  
  # Save prediction statistics
  if (("Zreal" %in% colnames(data)) & ("Zimag" %in% colnames(data))){
    
    real_preds <- predict(real_mdl, real_data)
    real_rmse <- rmse(real_data$Zreal, real_preds)
    real_mae <- mae(real_data$Zreal, real_preds)
    real_rsq <- (cor(real_data$Zreal, real_preds))^2
    
    imag_preds <- as.numeric(unlist(imag_mdl$fitted.values))
    imag_rmse <- rmse(imag_data$Zimag, imag_preds)
    imag_mae <- mae(imag_data$Zimag, imag_preds)
    imag_rsq <- (cor(imag_data$Zimag, imag_preds))^2
    
    data <- cbind(data, "Zreal_preds"=real_preds, "Zimag_preds"=imag_preds)
    temp <- data.frame("Zreal_rmse"=real_rmse, "Zreal_mae"=real_mae, "Zreal_rsq"=real_rsq, 
                       "Zimag_rmse"=imag_rmse, "Zimag_mae"=imag_mae, "Zimag_rsq"=imag_rsq)
    
  } else if (("Zimag" %in% colnames(data)) & (!"Zreal" %in% colnames(data))){
    
    imag_preds <- fitted(mdl)
    imag_rmse <- rmse(imag_data$Zimag, imag_preds)
    imag_mae <- mae(imag_data$Zimag, imag_preds)
    imag_rsq <- (cor(imag_data$Zimag, imag_preds))^2
    
    data <- cbind(data, "Zimag_preds"=imag_preds)
    temp <- data.frame("Zimag_rmse"=imag_rmse, "Zimag_mae"=imag_mae, "Zimag_rsq"=imag_rsq)
    
  } else if ((!"Zimag" %in% colnames(data)) & ("Zreal" %in% colnames(data))){
    
    real_preds <- predict(real_mdl, data)
    real_rmse <- rmse(real_data$Zreal, real_preds)
    real_mae <- mae(real_data$Zreal, real_preds)
    real_rsq <- (cor(real_data$Zreal, real_preds))^2
    
    data <- cbind(data, "Zreal_preds"=real_preds)
    temp <- data.frame("Zreal_rmse"=real_rmse, "Zreal_mae"=real_mae, "Zreal_rsq"=real_rsq)
    
  }
  
  print("#######################")
  print("3. Model predictions done.")
  print("#######################")
  
  # Save  the regenerated data  
  write.table(data, file=file.path(output_dir, "Regenerated_data.csv"), row.names = FALSE, sep=",")
  
  # Save the stats
  write.table(temp, file=file.path(output_dir, "Pred_stat.csv"), sep=",", row.names = FALSE)
  
  
  print("#######################")
  print("4. Creating the plots")
  print("#######################")
  
  input_data <- data
  grid.lines <- 50
  grid_x <- seq(min(input_data$Volt), max(input_data$Volt), length.out = grid.lines)
  grid_y <- seq(min(input_data$Freq), max(input_data$Freq), length.out = grid.lines)
  gridXY <- expand.grid("Volt" = grid_x, "Freq" = grid_y, KEEP.OUT.ATTRS = F)
  
  gridXY$"Zreal_pred" <- predict(real_mdl, newdata = gridXY)
  gridXY$"Zimag_pred" <- predict(imag_mdl, newdata = gridXY)
  
  gridXYreal <- acast(gridXY, Volt~Freq, value.var = "Zreal_pred")
  gridXYimag <- acast(gridXY, Volt~Freq, value.var = "Zimag_pred")
  
  x_text = c(round(unique(input_data$Volt), 2))
  y_text = c(seq(2000, 10000, 2000))
  zreal_z_text = c(seq(0, 1, 0.2))
  zimag_z_text = c(seq(0, 14, 2))
  
  final_data <- list(
    graph_data = as.data.frame(input_data),
    pred_data = as.data.frame(temp),
    grid_lines = grid.lines,
    grid_x = grid_x,
    grid_y = grid_y,
    gridXYreal = gridXYreal,
    gridXYimag = gridXYimag,
    x_text = x_text,
    y_text = y_text,
    zreal_z_text = zreal_z_text,
    zimag_z_text = zimag_z_text
  )
  print("#######################")
  print("5. Response Returned")
  print("#######################")
  return(final_data)
}



# Define the filter function
#* @filter cors
function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  plumber::forward()
}

#* @param msg
#* @get /test
function (msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}


#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function(a, b) {
  as.numeric(a) + as.numeric(b)
}

#* @post /upload
#* @param file: file The CSV file to upload
#* @serializer unboxedJSON
function(file, res) {
   # Retrieve the filename
  filename <- names(file)[1]
  save_path <- "/Users/apple/Desktop/MLWebApp/DSAA_23/webserver_code/test-shreyas"
  file_target <- file.path(save_path, filename)
  # Retrieve the file contents
  file_contents <- file$raw
  con <- textConnection(file_contents)
  # Read the data from the connection and store it in a data frame
  df <- read.csv(con)
  # Close the connection
  close(con)
  # Perform operations on the file contents
  data <- as.data.frame(apply(df, 2, as.numeric))
  
  # Return a response
  response <- mdl_predict(data)
  res$body <- response
}