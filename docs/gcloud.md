# google cloud run


Google Cloud Run acts like a container registry for building and hosting my
docker built containers. Below is the command used to submit a container-build to the registry.

```
    gcloud builds submit --tag gcr.io/storello-board/storello-nest-angular-ssr
```