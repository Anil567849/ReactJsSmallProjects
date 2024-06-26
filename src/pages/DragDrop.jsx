import React, { useState } from 'react';

const Styles = {
  item: {
    border: '2px solid red',
    padding: '10px',
    margin: '10px',
    cursor: 'pointer',
  },
};

function DragDrop() {
  const [drag, setDrag] = useState([1, 2, 3, 4, 5, 6]);
  const [draggingItem, setDraggingItem] = useState(null);

  const onDragStart = (e, index) => {
    setDraggingItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (index) => {
    const draggedOverItem = drag[index];

    // If the item is dragged over itself, ignore
    if (draggingItem === index) {
      return;
    }

    // Filter out the currently dragged item
    let items = drag.filter((item, idx) => idx !== draggingItem);

    // Add the dragged item after the dragged over item
    items.splice(index, 0, drag[draggingItem]);

    setDraggingItem(index);
    setDrag(items);
  };

  const onDrop = () => {
    setDraggingItem(null);
  };

  return (
    <div>
      <h1>DragDrop</h1>
      {drag.map((item, index) => (
        <span
          key={index}
          style={Styles.item}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={() => onDragOver(index)}
          onDrop={onDrop}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default DragDrop;
