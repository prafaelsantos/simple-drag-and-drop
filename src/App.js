import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import './App.css';

const rickMortyCharacters = [
  {
    id: 'rick',
    name: 'Rick Sanchez',
    thumb: '/images/Rick_Sanchez.png'
  },
  {
    id: 'morty',
    name: 'Morty Smith',
    thumb: '/images/Morty501.png'
  },
  {
    id: 'beth',
    name: 'Beth Smith',
    thumb: '/images/Beth_Smith.png'
  },
  {
    id: 'summer',
    name: 'Summer Smith',
    thumb: '/images/Summer_is_cool.jpg'
  },
  {
    id: 'jerry',
    name: 'Jerry Smith',
    thumb: '/images/Jerry_Smith.png'
  },
  {
    id: 'birdperson',
    name: 'Birdperson',
    thumb: '/images/NewBirdPerson.jpg'
  },
];

function App() {

  const [characters, setCaracters] = useState(rickMortyCharacters);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCaracters(items);
  }

  return (
    <div className="App">
      <h1>Rick and Morty characters</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {
                characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li className="list" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <img src={thumb} alt={name} className="thumb" />
                          <div className="name">{name}</div>
                        </li>
                      )}
                    </Draggable>
                  )
                })
              }
              {provided.placeholder}
            </ul>
          )}

        </Droppable>
      </DragDropContext>
    </div >
  );
}

export default App;
