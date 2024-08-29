import Icon from "@mdi/react";
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { mdiClipboardListOutline } from "@mdi/js";
import { mdiPlus } from "@mdi/js";
import { useState } from 'react';
import { Button } from "react-bootstrap";


function ReciepForm(props) {
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);
    const appendIngredient = () =>  appendField("ingredients", ingData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const payload = {
          ...formData,
        };

        const payload2 = {
            ...ingData,
          };

          const payload3 = {
            ...readOnly,
          };
    
        console.log(payload);
        console.log(payload2);
        console.log(payload3);
      };

      const appendField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name].push(val);
          setReadOnlyField("text",val);
          return newData;
        });
      };

      const setField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name] = val;
          return newData;
        });
      };

      const setIngField = (name, val) => {
        return setIngData((ingData) => {
          const newData = { ...ingData };
          newData[name] = val;
          return newData;
        });
      };

      const setReadOnlyField = (name, val) => {
        return setReadOnly((readOnly) => {
          const newData = { ...readOnly };
          newData[name] = newData[name].concat(props.ingridientList.find(item => item.id === val.id).name, " ", val.number, " ", val.unit, "\n");
          return newData;
        });
      };
      //props.ingridientList.find(item => item.id === val.id).name

      const [ingData, setIngData] = useState({
        number: "",
        id: "",
        unit: ""
      });

      const [readOnly, setReadOnly] = useState({
        text: "",
      });

      const [formData, setFormData] = useState({
        name: "",
        description: "",
        ingredients : []

    });


    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
            <Form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Vytvořit recept</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postup</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </Form.Group>

          <Row>


            <Form.Group as={Col} className="mb-3">
              <Form.Label>Ingredience</Form.Label>
              <Form.Select
                //value={props.ingridientList.find(item => item.id === formData.weight).name }
                onChange={(e) => setIngField("id", e.target.value)}
              >
                <option value="" disabled>
                  Ingredience
                </option>
                {props.ingridientList.map((ingredient) => {
            return (
                <option value={ingredient.id}>{ingredient.name}</option>
              /*<div key={ingredient.id}>
                {ingredientName.name}
              </div>*/
            );
          })}

              </Form.Select>

            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Počet</Form.Label>
              <Form.Control
                type="number"
                placeholder="1-5"
                value={ingData.number}
                onChange={(e) => setIngField("number", parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
            <Form.Label>Jednotka</Form.Label>
            <Form.Control
              type="text"
              value={ingData.unit}
              onChange={(e) => setIngField("unit", e.target.value)}
            />
          </Form.Group>
          <Button
                style={{ float: "right" }}
                variant="secondary"
                class="btn btn-success btn-sm"
                onClick={appendIngredient}
            >
                <Icon path={mdiPlus} size={1} />
            </Button>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Ingredience:</Form.Label>
            <Form.Control
              as="textarea"
              readOnly
              rows={4}
              value={readOnly.text}
            />
          </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row gap-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              Zavřít
            </Button>
            <Button variant="primary" type="submit">
              Vytvořit
            </Button>
          </div>
        </Modal.Footer>
      </Form>
            </Modal>

            <Button
                style={{ float: "right" }}
                variant="secondary"
                class="btn btn-success btn-sm"
                onClick={handleShowModal}
            >
                <Icon path={mdiPlus} size={1} />
                Přidat Recept
            </Button>
        </>
    )
}

export default ReciepForm;