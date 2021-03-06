import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_NOTES } from "../../queries";
import { ReactComponent as Plus } from "../../Components/plus.svg";

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin-left: 10px;
  transform: scale(0.8);
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Subtitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`;

const Notes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Note = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #eeeeee;
  }
`;

const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`;

export default class NotesContainer extends React.Component {
  render() {
    return (
      <>
        <Header>
          <Title>
            서비노트
            <Link to={"/add"}>
              <Button>
                <Plus />
              </Button>
            </Link>
          </Title>
          <Subtitle>오늘 배운 것을 마크다운 문서로 기록해봅시다.</Subtitle>
        </Header>
        <Notes>
          <Query query={GET_NOTES}>
            {({ data }) =>
              data.notes
                ? data.notes
                    .filter(note => {
                      return !note.del;
                    })
                    .sort((a, b) => a.createdAt > b.createdAt)
                    .map(note => (
                      <Link to={`/note/${note.id}`} key={note.id}>
                        <Note>
                          <NoteTitle>{note.title}</NoteTitle>
                        </Note>
                      </Link>
                    ))
                : null
            }
          </Query>
        </Notes>
      </>
    );
  }
}
