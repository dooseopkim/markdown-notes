# Sseops-notes

React, Apollo, GraphQL로 만든 마크다운 메모장

- GraphQL Front-End 로는 Apollo Boost(GraphQL Client)를 별 다른 셋업 없이 심플하게 사용할 수 있다.
- 이 프로젝트에서는 사용하지 않는다. Offline으로 만들 메모장이기 때문에 apollo boost에서 오는 client에 HTTP쪽으로 손봐야 할 것이 많기에
- cache에서만 일하고 오프라인으로만 있을 클라이언트를 만들것이다.(apollo-cache-inmemory)

```
yarn add apollo-cache-inmemory apollo-client apollo-link-state graphql graphql-tag react-apollo styled-components styled-reset react-textarea-autosize
```

```
yarn add react-router-dom
```
URL : http://sseopstory.tk/sseops-note/  
* DB없이 cache와 localStorage만을 사용하기 때문에 개개인이 가볍게 쓸 수 있습니다.  
### 메인 화면
![image](https://user-images.githubusercontent.com/34496143/57508230-e7c19900-733b-11e9-927c-e97d559e0fc9.png)
&nbsp;  
### 작성 화면
![image](https://user-images.githubusercontent.com/34496143/57508370-4e46b700-733c-11e9-9af6-a9f40115c5f5.png)

