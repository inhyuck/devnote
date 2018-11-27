# TOAST FORWARD - Git&Github 활용하기

![](./img/2018-11-27-TOAST-FORWARD-Git-Github.jpg)

`날짜 : 2018. 11. 27. `

`발표자 NHN Edu 신승엽 선임님`

- Git Rebase의 원리, Rebase를 이용한 히스토리 단장을 실습을 통해 학습합니다.

- Jenkins와 GitHub를 이용한 Pre-merge 테스트 환경 구축을 학습합니다. 
- 주요 Git Branch 모델을 소개하고 NHN Edu 서버개발팀의 사례를 소개합니다.



## Git & GitHub 중급

git rebase 기능 => 히스토리를 일렬로 깔끔하게 정리

대화형 rebase

* 일렬상의 여러 커밋을 한개의 커밋으로 변환
* 커밋 삭제 (삭제하고 싶은 이전의 부모로 대화형 rebase 후 삭제)
* 커밋 순서바꾸기 (순서 바꾸고 싶은 커밋의 부모로 대화형 rebase후 순서 변경)
* 커밋 메세지 바꾸기 (바꾸고 싶은 커밋의 부모로 대화형 rebase후 메시지 변경)
* rebase 중간에 멈추고 파일 수정하고 중간에 커밋 수정하고 계속 진행하기
* 충돌시 해결법
* rebase 사용하는 이유
  * 기존 : 동시에 여러 feature가 진행되고 merge될 경우
  * 기존 : 여러 갈래의 merge들로 인해 히스토리 파악이 어려움
  * master를 일렬로 유지
  * 좀 더 히스토리를 보기좋게 만들어준다.
* Github flow에 rebase 적용

**rebase는 팀원 동료가 모두 숙지하고 있을 때 사용할 것**



> git reflog => git branch 바뀌는 기록
>
> git reset [해시값] => 해당 해시값 상태로 돌아감



## Github pr을 통해 merge 전 test => pre merge test

**Jenkins**

* github pull request builder plugin

Github protected branch Rule : 강제 푸시 금지, 리뷰를 받아야만 merge 가능 등



## Git Branch 전략

**Git flow**

* 항상 존재하는 브랜치 : master, develop
* 서포팅 브랜치 : feature, release(배포 직전에 만듦), hotfix(master로부터 만듦)



**Github flow**

* GItflow는 너무 복잡하여 불필요에서 출발
* topic 브랜치를 지속적으로 push
* master 브랜치는 항상 배포 가능한 상태여야 함
* 명확한 브랜치 이름으로 master에서 생성한다
* 언제나 PR을 생성
* 리뷰가 완료된 것만 merge. 리뷰 후 즉시 배포



**GitLab Flow**

* Production branch
* 배포가 필요할 때 master에서 production으로 merge를 하여 배포
* Environment branch
* Release branch



**NHN Edu 서버개발팀은?**

* 단기간의 배포 일정
* 장기간의 배포 일정(코드 네임을 부여)
* 같은 시간에 여러 배포 일정의 작업이 필요
* Gitflow 기반으로 devleop 역할의 브랜치를 여러개 사용
* rebase 적극 활용
* 사업의 요구사항이 많음
* 모든 배포 일정 브랜치는 develop에서 시작
* 각 브랜치 내에서 feature 브랜치 생성, merge
* PR를 통해 자동 테스트
* merge 전 rebase를 이용
* 다가오는 배포 일정의 개발이 완료되면 해당 브랜치를 이용하여 QA 진행
* QA 완료 후 master와 develop에 merge
* 남은 배포 일정 브랜치들을 develop에 rebase(이때 -p 옵션을 이용하여 머지 커밋을 유지)
* 각자의 feature브랜치를 각 배포 일정 브랜치에 rebase



**우리 팀에 적합한 Git workflow는?**

- Gitflow : 체계적으로 관리 가능 / 복잡한 절차
- GitHub Flow: 간단한 절차 / 너무나 간단
- GitLab Flow: 절충안 / 웹보다는 동시에 여러 릴리즈 버전들이 현실 세계에 존재할 때 적합
- rebase를 적용: 히스토리를 보기 편함