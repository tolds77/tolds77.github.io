---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Evaluating Kubernetes Development Tooling"
subtitle: ""
summary: ""
authors:
  - jamesolds
tags: []
categories: []
date: 2022-08-05T13:39:07-04:00
lastmod: 2022-08-05T13:39:07-04:00
featured: true
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

Application development with microservices is typically a bit different and at times more complicated than more traditional monolithic architectures. When writing a feature against a single service, you may find that you depend on another running service to test API calls. Debugging and observability can be more difficult as well, due to needing to aggregate logs and traces across multiple services.

Microservices help solve some of the scaling problems inherent with monolithic designs, and Kubernetes helps solve some of the problems with deploying and scaling these microservices. But staying agile when developing microservices can be challenging. With a monolith like Rails, the entire application runs and deploys as one making it straightforward to run locally to develop against, at least for smaller applications. When developing a microservice like in a Golang monorepo, you'll usually need to manually run other services locally or somehow forward requests to a remote (usually shared) instance of the other services.

Putting aside questions of monolith vs microservices and assuming you're already working with microservices on k8s, the question becomes: what is the best way to develop software in this environment? "Best" can of course mean a lot of things to a lot of people, but I'll mostly focus on these criteria:

- Developer experience
    - Setting up and configuring the development environment should be easy. It should not take long for new members of the team to land their first commit. 
    - Testing and committing code regularly should be a pleasant experience.
    - Fast feedback loops: you should be able to run your code as close to immediately as possible after making changes.
- Scalability
    - Will this solution work for 10 engineers? What about 100?

 There are a lot of great tools in the Kubernetes development space, ranging from a primarily local development workflow, to hybrid, to fully remote development.

## Local

### Native

Continuing with the Golang monorepo example, it's fairly straightforward to compile and run Go code natively on your host with go build / go run. 
This is pretty much the ideal development environment: native integration with the IDE of your choosing, very fast feedback loops and native debugging. This works great until you need more than one service running at a time or need to configure other dependencies like databases. If you do need to interact with other services, you can use a tool like Docker Compose to orchestrate multiple services locally, or [kubefwd](https://github.com/txn2/kubefwd) to forward traffic to services running in a development or staging cluster environment. kubefwd can be annoying to work with though and require frequent restarts. Additionally, shared environments only work well if they are read-only, it won't scale to have multiple engineers deploying to and modifying a single shared development environment.

### [Docker-compose](https://docs.docker.com/compose/)

Docker-compose is great for "composing" multiple services to run together locally and is likely to serve many teams well, but there are a few drawbacks to consider.

**Strengths**
- Most familiar solution to a lot of engineers.
- Easy to set up multiple services in a single YAML file.

**Weaknesses**
- Docker Desktop for Mac has some pretty serious performance issues I won't dive into here (I know they are making progress, but I didn't find the latest experimental features to help much).
- If you need to access services in a remote cluster, you can't just use kubefwd on your host, you'll have to install and configure it inside your app's container.
- It's up to you to configure hot-reloading with third party tooling for a reasonable feedback loop.


### [Tilt](https://tilt.dev/)

Tilt helps make developing against a local Kubernetes cluster easy. It offers hot reloading, and had an especially excellent web UI that you can even [add custom buttons to](https://docs.tilt.dev/buttons.html) to run tasks like DB migrations for example 🤯.

Unfortunately developers are on their own to configure and operate a local k8s cluster which is usually Docker based, inheriting all of Docker's downsides. Like Compose and other local solutions, memory constrains how many services you can run at a time. Teams with multiple, resource-hungry services will have to configure and operate at least a portion of the stack remotely.

**Strengths**
- Makes developing against a local k8s cluster easy.
- Web UI makes for a great DevEx.

**Weaknesses**
- Developers have to configure and maintain a local k8s cluster.
- Inherits Docker's issues.
- Memory constrained.

## Hybrid


### [Telepresence](https://www.telepresence.io/)

Telepresence offers a hybrid development environment, where you run your code locally (natively or with Docker) and redirect remote cluster traffic to your local service. Telepresence provides a 2-way proxy so your local services can access cluster services much in the same was as with kubefwd, but is also able to proxy or "intercept" cluster traffic to your local service. This lets you bypass the merge/build/deploy cycle and provides a native development experience while operating as if the service was deployed alongside other services in the cluster.

**Strengths**
- Best of both worlds: native local dev experience while easily forwarding traffic and deploying to a remote cluster.

**Weaknesses**
- To support Kubernetes volume mounts, including configmaps and secrets, you have to [configure FUSE on Mac](https://www.telepresence.io/docs/latest/troubleshooting/#volume-mounts-are-not-working-on-macOS) which requires a reboot into recovery mode, and selecting ["reduced security"](https://support.apple.com/guide/security/kernel-extensions-sec8e454101b/1/web/1#sec8697bc589) which is kind of a hard sell. 
- Having multiple developers redirecting traffic in a shared cluster really won't scale. Ambassador offers a solution to this in Business and Enterprise plans, but I'm not sure on pricing.


## Remote

### [Garden](https://garden.io)

Garden enables you to code locally while constantly syncing your code to an isolated namespace in a remote cluster and supports hot reloading for fast feedback loops. With this approach you get the local development experience in addition to all the benefits of deploying your code to a proper remote cluster.

**Strengths**
-  A single build / deploy / operate target regardless of developer host platform (Mac, Windows, ARM/X86) that Just Works.
    - Development environment matches the production environment
    - No Docker Desktop headaches 🎉
- Easily share resources like the database layer in a common namespace while allowing developers to easily deploy any service needed to their own isolated namespace.
- Unify CI pipelines and developer build / test cycles using Garden workflows.
- It's straightforward to configure per-PR preview environments to support Continuous Deployment.

Garden checked a lot of boxes for me in terms of the original requirements around developer experience and scalability, but no tool is perfect.

**Weaknesses**
- The web UI is useful for viewing logs and for a quick glance a service status, but is not up to par with Tilt. It would be nice to restart and redeploy services from the UI as well as run Garden workflows.
- Having a remote cluster to deploy to that an Ops team manages removes a lot of Kubernetes complexity for developers, but issues with deployments can still occasionally pop up and require developer time to debug.
- Configuring services in your namespace to point some traffic to shared resources and other traffic to resources in the development namespace is up to you. If your app follows [12-factor](https://12factor.net/) best practices, you should be able to configure the hostname of other services with environment variables but this may require some custom tooling to make for a good DevEx.


## Conclusion

Matt Rickard asks the right question in [Don't Use Kubernetes Yet](https://matt-rickard.com/dont-use-kubernetes-yet):

> How can you choose the right technology _now_ so that you can maximize growth and minimize pain _later_ when you inevitably outgrow it?

For many apps, developing natively or with Docker Compose will get you quite far. But for teams developing microservices on Kubernetes, I think Garden meets the requirements of providing an excellent developer experience while being a tool that can scale to large engineering teams when needed.

