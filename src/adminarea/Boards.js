import React from 'react'

function Board(props) {

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id')

        const card = document.getElementById(card_id);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={dragOver}
            className={props.className}
        >
            { props.children}
        </div>
    )

}

function Card(props) {

    const drop = (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id')

        const card = document.getElementById(card_id);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    const dragStart = (e) => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0)
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragStart={dragStart}
            onDragOver={dragOver}
            draggable={props.draggable}
            className={props.className}
        >
            { props.children}
        </div>
    )

}

export { Board, Card };