import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DEL_NOTE = gql`
  mutation delNote($id: Int!) {
    delNote(id: $id) @client {
      id
    }
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  padding: 1rem;
  box-shadow: 1px 1px 4px 6px #363636;
  text-align: center;
`;
const FormHead = styled.div`
  font-size: 2rem;
  display: block;
  width: 100%;
`;
const FormBody = styled.div`
  display: block;
  width: 100%;
  margint-top: 2rem;
  padding: 2rem 0;
`;

export default class Delete extends React.Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Mutation mutation={DEL_NOTE}>
        {(delNote, { data }) => (
          <FormContainer>
            <form
              onSubmit={e => {
                e.preventDefault();
                delNote({ variables: { id } });
                const {
                  history: { push }
                } = this.props;
                push("/");
              }}
            >
              <FormHead>정말로 삭제하시겠습니까?</FormHead>
              <FormBody>
                <button type="submit">Yes</button>
                <Link to={`/note/${id}`}>
                  <button type="button">No</button>
                </Link>
              </FormBody>
            </form>
          </FormContainer>
        )}
      </Mutation>
    );
  }
}
