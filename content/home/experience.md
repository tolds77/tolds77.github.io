+++
# Experience widget.
widget = "experience"  # Do not modify this line!
active = true  # Activate this widget? true/false

title = "Experience"
subtitle = ""

# Order that this section will appear in.
weight = 40

# Date format for experience
#   Refer to https://sourcethemes.com/academic/docs/customization/#date-format
date_format = "January 2006"

# Experiences.
#   Add/remove as many `[[experience]]` blocks below as you like.
#   Required fields are `title`, `company`, and `date_start`.
#   Leave `date_end` empty if it's your current employer.
#   Begin/end multi-line descriptions with 3 quotes `"""`.
[[experience]]
  title = "Infrastructure Engineer"
  company = "Oden Technologies"
  company_url = "https://oden.io"
  location = "Remote"
  date_start = "2021-11-21"
  date_end = "2022-08-01"
  description = """

- Evaluated multiple solutions and implemented Garden.io to streamline the Kubernetes development cycle, with a goal of reducing merge conflicts and mean time to merge.
- Wrote terraform for and maintained a large scale data analytics deployment on Google Cloud (GCP).
- Migrated Google Cloud Monitoring dashboards to Grafana with jsonnet and terraform, greatly improving the observability and monitoring UX.
- Configured an initial implementation of the Bazel build system to improve the Golang monorepo build and deploy process.
- Configured Statuspage.io to provide customers with up-to-date status of Oden’s major components.
  """

[[experience]]
  title = "Sr DevOps Engineer"
  company = "Ad Hoc"
  company_url = "https://adhoc.team"
  location = "Remote"
  date_start = "2018-06-01"
  date_end = "2021-11-21"
  description = """
- Developed a browser based code evaluation environment with Golang on Google Cloud Platform (GCP) using Identity Aware Proxy (IaP) to enable engineers 1-click access to view and run candidate code reducing a major bottleneck in the recruitment pipeline.
- Migrated Packer / Ansible and ElasticBeanstalk EC2 hosts to ECS Fargate, greatly reducing operational complexity and maintenance requirements while increasing security and deployment velocity.
- Led the migration of Jenkins pipelines to AWS CodeBuild and Github Actions, significantly reducing the operations overhead of managing and troubleshooting self-hosted Jenkins.
- Created and maintained all cloud infrastructure as code (IaC) with Terraform and YAML. Utilized open source Terraform modules where possible, contributing features back upstream.
- Designed technical challenges for engineering candidates including containerizing a Python app fronted by an nginx reverse proxy with docker-compose.
  """

[[experience]]
  title = "Sr Network Administrator"
  company = "Supreme Court of Oklahoma"
  company_url = "http://www.oscn.net/v4"
  location = "Oklahoma City"
  date_start = "2016-06-01"
  date_end = "2018-06-01"
  description = """
- Designed a pipeline for network infrastructure validation using Salt to orchestrate virtual machine deployment to KVM hosts. Utilized Ubuntu MAAS for bare metal and hypervisor provisioning.
- Wrote a web application monitoring service in Python using the Serverless Framework on AWS Lambda.
- Developed a backup rotation service in Rust to maintain rolling backups of network devices for three months.
- Used Microsoft TFS with git for version control and release pipelines.
- Developed a Python library for SilverPeak’s SD-WAN API to automate and validate configuration changes across a large-scale fleet of devices.
- Automated configuration management of Linux hosts using Terraform, Ansible, and Docker containers.
- Created Icinga2 dashboards and alerts for key metrics like HTTP response times and application-layer monitoring of hosted web services.
  """

[[experience]]
  title = "Lead Network Engineer"
  company = "CSC"
  company_url = "https://www.dxc.technology/"
  location = "Manama, Bahrain"
  date_start = "2014-10-01"
  date_end = "2015-10-01"
  description = """
- Automated configuration of a large-scale fleet of network devices using Python and Perl.
- Designed custom SolarWinds compliance reports standardizing network device configuration while ensuring 100% of devices conformed to strict DoD standards.
- Scaled VMware vSphere deployment by configuring Cisco 1000v and Nexus switches for two new hypervisors increasing compute and storage capacity by 40%.
- Modernized network protocols by upgrading to RSTP and DMVPN increasing availability and confidentiality.
- Optimized the layer 2 network to use jumbo frames resulting in a 10% increase in network throughput at zero additional cost.
- Maintained an 8-node virtualized Cisco ISE deployment providing access layer security across two network enclaves for over 5000 endpoints.
- Corrected critical security vulnerabilities by upgrading all network devices to SNMP V3 and migrating VPNs to industry standard encryption algorithms.
  """

[[experience]]
  title = "Information Systems Technician First Class"
  company = "US Navy"
  company_url = "https://www.navy.mil/"
  location = "US"
  date_start = "2009-08-01"
  date_end = "2014-10-01"
  description = """
- Engineered a secure remote access solution that delivered sub-second failover while reducing CapEx costs by 20% on each new site deployment.
- Optimized TCP MSS configuration of in-line network encryption devices reducing fragmentation by 20%.
- Led the migration to multi-area OSPF over DMVPN, securing remote site traffic while providing greater uptime for mission critical networks.
- Upgraded from RIPv2 and static routing to EIGRP over GRE significantly reducing administrative burden.
- Implemented a multicast solution to deliver strategic live video to key decision makers while greatly reducing the bandwidth requirements of real time video.
- Increased Windows 7 migration speed by 50% by configuring EtherChannel trunks at deployment sites.
- Rapidly delivered secure VoIP capabilities to 800 users using Cisco UCM.
- Deployed and maintained Cisco ASA devices to securely extend classified networks to remote locations.
- Mentored junior technicians leading to four CCNA certifications over the course of a year.
- Discovered and corrected improper video teleconferencing configuration using Wireshark for packet analysis. 
- Maintained network documentation and diagrams using Microsoft Visio.
  """

+++
