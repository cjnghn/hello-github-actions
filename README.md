# hello-github-actions

- github actions를 처음 도입할 때 재밌게 해볼 수 있는 소소한 프로젝트.

## TODO

- [ ] crawling project (batch)
- [ ] aws deploment (ec2, rds)

## Github Action

- Workflow, Event, Job, Step, Action, Runner 로 이루어짐
- Workflow: Event에 의해 트리거 될 수 있는 자동화된 프로세스
  - Event: Workflow를 Trigger하는 특정 활동이나 규칙
  - Job: 여러 Step으로 구성되는, 실행단위
    - Step: Task들의 집합으로, 커맨드를 날리거나 action을 실행할 수 있음
      - Action: Workflow 내의 가장 작은 실행 단위
- Runner: Github Action Runner 애플리케이션이 설치된, Workflow가 실행될 인스턴스
  - public repo에 한해서 무료로 제공을 해준다 🎉

## Workflow .yml 파일

```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

- 위에 써진대로 job 이 여러개면 기본적으로 병렬로 실행된다.
- 위에서 `build`은 특수한 단위가 아닌 하나의 `job` 이름을 의미한다. (변수명)
- `uses`는 이미 만들어진 액션을 사용하는 명령어이다.

## AWS 배포 준비하기 (feat. AWS CodeDeploy)

1. EC2 생성하기 (Allow Http, Https 트래픽. ssh 키 발급)
2. Elastic IP 생성하고 Instance와 associate

3. nginx 설치하고 방화벽 설정

```
# EC2 인스턴스에 ssh로 접속
$ sudo apt update
$ sudo apt install nginx

$ sudo ufw allow 'Nginx Full'
$ systemctl status nginx
```

4. http://<IP주소> 로 접속하여 nginx 설정이 올바르게 됐는지 확인
5. 3000번 포트에서 돌아가는 express 앱을 80번 포트로 포워딩하기

```
$ sudo vi /etc/nginx/sites-available/my-app
```
