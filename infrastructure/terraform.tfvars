# ------------------------------------------------------------
# Networking Settings
# ------------------------------------------------------------
aws_region = "eu-central-1"
vpc_cidr_block = "10.0.0.0/16"
dev1_subnet_az = "eu-central-1a"
dev1_subnet_cidr_block = "10.0.1.0/24"
dev2_subnet_az = "eu-central-1b"
dev2_subnet_cidr_block = "10.0.2.0/24"
# ------------------------------------------------------------
# EKS Cluster Settings
# ------------------------------------------------------------
cluster_name = "demo-cluster"
cluster_version = "1.28"
worker_group_name = "dev-worker-group-1"
worker_group_instance_type = [ "t2.small" ]
autoscaling_group_min_size = 1
autoscaling_group_max_size = 1
autoscaling_group_desired_capacity = 1