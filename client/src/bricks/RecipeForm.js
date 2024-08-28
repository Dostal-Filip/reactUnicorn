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

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const payload = {
          ...formData,
        };
    
        console.log(payload);
      };

      const setField = (name, val) => {
        return setFormData((formData) => {
          const newData = { ...formData };
          newData[name] = val;
          return newData;
        });
      };

      const [formData, setFormData] = useState({
        name: "",
        description: "",
        dateTs: new Date().toISOString().substring(0, 10),
        grade: null,
        weight: 1,
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
              <Form.Label>Známka</Form.Label>
              <Form.Control
                type="number"
                placeholder="1-5"
                value={formData.grade}
                onChange={(e) => setField("grade", parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Váha</Form.Label>
              <Form.Select
                value={formData.weight}
                onChange={(e) => setField("weight", Number(e.target.value))}
              >
                <option value="" disabled>
                  Váha známky
                </option>
                <option value={0.5}>0.5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              value={formData.dateTs}
              onChange={(e) => setField("dateTs", e.target.value)}
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