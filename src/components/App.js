import React from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import {sort} from "../actions";

class App extends React.Component {

  onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if(!destination){
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    )

  }

  render() {
    console.log(this.props.lists);

    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h3 class="text-secondary">Welcome Page !!</h3>
          <div style={styles.listContainer}>
            {lists.map(list => (
              <TrelloList listID={list.id} key={list.id} title={list.title} cards={list.cards} />
            ))}
            <TrelloActionButton list />
          </div>
        </div>
      </DragDropContext>
    );
  }
}
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",

  }
}

const mapStateToProps = state => ({
  lists: state.lists
})
export default connect(mapStateToProps)(App);


