import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const CREATE_NOTE = gql`
  mutation createNote($title: String!, $content: String!, $createAt: String!, $del: Boolean!)
    @client {
    createNote(title: $title, content: $content, createAt: $createAt, del: $del) {
      id
    }
  }
`;

export default class Add extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_NOTE}>
        {createNote => {
          this.createNote = createNote;
          return <Editor onSave={this._onSave} />;
        }}
      </Mutation>
    );
  }
  _onSave = (title, content) => {
    const {
      history: { push }
    } = this.props;
    const createAt = String(Date.now());
    const del = false;
    if (title !== "" && content !== "") {
      this.createNote({ variables: { title, content, createAt, del } });
      push("/");
    }
  };
}
