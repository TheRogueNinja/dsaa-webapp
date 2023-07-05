# start from the ubuntu image
FROM ubuntu:22.04

# Set the DEBIAN_FRONTEND environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# install the linux libraries needed for plumber
RUN apt-get update -qq && apt-get install -y \
r-base libsodium-dev libcurl4-openssl-dev libxml2-dev r-cran-rcppeigen

RUN apt-get update && apt-get upgrade -y

# install plumber
RUN R -e "packages <- c('RcppEigen','ranger','plumber','ggplot2','dplyr','kknn','Metrics','jsonlite','reshape2','caretEnsemble', 'Rook', 'Rborist'); install.packages(packages)"

# copy everything from the current directory into the container
COPY / /

# # open port 80 to traffic
EXPOSE 9001

# when the container starts, start the main.R script
ENTRYPOINT ["Rscript", "server.R"]