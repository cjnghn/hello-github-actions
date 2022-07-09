# hello-github-actions

## Github Action

- Workflow, Event, Job, Step, Action, Runner 로 이루어짐
- Workflow: Event에 의해 트리거 될 수 있는 자동화된 프로세스
  - Event: Workflow를 Trigger하는 특정 활동이나 규칙
  - Job: 여러 Step으로 구성되는, 실행단위
    - Step: Task들의 집합으로, 커맨드를 날리거나 action을 실행할 수 있음
      - Action: Workflow 내의 가장 작은 실행 단위
- Runner: Github Action Runner 애플리케이션이 설치된, Workflow가 실행될 인스턴스
  - public repo에 한해서 무료로 제공을 해준다 🎉
