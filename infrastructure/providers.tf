terraform {
  required_providers {
    aws = {
        version = "5.26.0"
    }
    kubernetes = {
        version = "2.23.0"
    }
  }
}


provider "kubernetes" {
    host                   = data.aws_eks_cluster.dev-cluster.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.dev-cluster.certificate_authority.0.data)
    token                  = data.aws_eks_cluster_auth.dev-cluster.token
    #load_config_file       = false
}

provider "aws" {
    region = var.aws_region
}