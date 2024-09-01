import Icon from "@mdi/react";
import { Modal } from 'react-bootstrap';
import { mdiClipboardListOutline } from "@mdi/js";
import { useState } from 'react'


function IngiridientList(props) {
  const [isModalShown, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);


  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seznam ingrediencí</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            
            props.ingridients.map((ingredient) => {
              if (props.ingridientList <= 0) {return <div></div>}
              let ingredientName = props.ingridientList.find(item => item.id === ingredient.id);
              return (
                <div key={ingredient.id}>
                  {ingredientName.name.concat(String.fromCharCode(9), ingredient.amount, " ", ingredient.unit)}
                </div>
              );
            })}
          <div>{ }</div>
        </Modal.Body>
        <Modal.Footer>

          

        </Modal.Footer>
      </Modal>

      <Icon
        path={mdiClipboardListOutline}
        style={{ color: "black", cursor: "pointer" }}
        size={1}
        onClick={handleShowModal}
      />
    </>
  )
}

export default IngiridientList;