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
