import Icon from "@mdi/react";
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { mdiClipboardListOutline, mdiProgressPencil } from "@mdi/js";
import { mdiPlus, mdiLoading, mdiMinus } from "@mdi/js";
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";


function ReciepForm(props) {
    const defaultForm = {
        name: "",
        id: "987654321",
        imgUri: "https://www.shutterstock.com/image-vector/cookbook-open-book-photos-tomato-600nw-2153338009.jpg",
        description: "",
        ingredients: [],
    };
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);
    const appendIngredient = () => appendField("ingredients", ingData);
    const popIngredient = () => popField("ingredients", ingData);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (props.recipe) {
          setFormData({
            name: props.recipe.name,
        id: props.recipe.id,
        imgUri: "https://www.shutterstock.com/image-vector/cookbook-open-book-photos-tomato-600nw-2153338009.jpg",
        description: props.recipe.description,
        ingredients: props.recipe.ingredients,
          });
          props.recipe.ingredients.forEach(addArray);
        } else {
          setFormData(defaultForm);
        }
      }, [props.recipe]);

      function addArray(item, index){
        setReadOnlyField("text",item);
      }


    const [addRecipeCall, setAddRecipeCall] = useState({
        state: 'inactive'
    });

    const handleClose = () => {
        setFormData(defaultForm);
        resetReadOnly();
        setShow(false);
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

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

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        console.log(payload);
        console.log(payload2);
        console.log(payload3);

        setAddRecipeCall({ state: 'pending' });
        const res = await fetch(`http://localhost:3000//recipe/${props.recipe ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setAddRecipeCall({ state: "error", error: data });
        } else {
            setAddRecipeCall({ state: "success", data });
            handleClose();
        }
    };

    const appendField = (name, val) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name].push(val);
            setReadOnlyField("text", val);
            return newData;
        });
    };

    const popField = (name) => {
        return setFormData((formData) => {
            const newData = { ...formData };
            newData[name].pop();
            popReadOnlyField("text");
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

    const popReadOnlyField = (name) => {
        return setReadOnly((readOnly) => {
            const newData = { ...readOnly };
            newData[name] = newData[name].slice(0,-1);
            newData[name] = newData[name].substring(0, newData[name].lastIndexOf("\n"));
            return newData;
        });
    };

    const setReadOnlyField = (name, val) => {
        return setReadOnly((readOnly) => {
            const newData = { ...readOnly };
            newData[name] = newData[name].concat(props.ingridientList.find(item => item.id === val.id).name, " ", val.amount, " ", val.unit, "\n");
            return newData;
        });
    };

    const resetReadOnly = () => {
        return setReadOnly((readOnly) => {
            const newData = { ...readOnly };
            newData["text"] = "";
            return newData;
        });
    };
    //props.ingridientList.find(item => item.id === val.id).name

    const [ingData, setIngData] = useState({
        amount: "",
        id: "",
        unit: ""
    });

    const [readOnly, setReadOnly] = useState({
        text: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        id: "123456789",
        imgUri: "https://www.shutterstock.com/image-vector/cookbook-open-book-photos-tomato-600nw-2153338009.jpg",
        description: "",
        ingredients: []

    });


    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.recipe ? 'Upravit' : 'Vytvořit'} recept</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <Form.Group className="mb-3">
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                required
                                maxLength={50}
                                onChange={(e) => setField("name", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte název s maximální délkou 50 znaků
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Postup</Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte popis pracovního postupu
                            </Form.Control.Feedback>
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
                                    value={ingData.amount}
                                    min={1}
                                    max={10}
                                    onChange={(e) => setIngField("amount", parseInt(e.target.value))}
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
                            <Form.Group>
                            <Button
                                style={{ float: "right" }}
                                variant="primary"
                                class="btn btn-success btn-sm"
                                onClick={appendIngredient}
                            >
                                <Icon path={mdiPlus} size={1} />
                            </Button>
                           
                            <Button
                                style={{ float: "right" }}
                                variant="warning"
                                class="btn btn-success btn-sm"
                                onClick={popIngredient}
                            >
                                <Icon path={mdiMinus} size={1} />
                            </Button>
                            </Form.Group>
                            

                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredience:</Form.Label>
                            <Form.Control
                                as="textarea"
                                readOnly
                                rows={4}
                                value={readOnly.text}
                                required
                                minLength={2}
                            />
                            <Form.Control.Feedback type="invalid">
                                Je potřeba alespoň jedna ingredience
                            </Form.Control.Feedback>
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row gap-2">
                            <div>
                                {addRecipeCall.state === 'error' &&
                                    <div className="text-danger">Error: {addRecipeCall.error.errorMessage}</div>
                                }
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                Zavřít
                            </Button>
                            <Button variant="primary" type="submit">
                                {addRecipeCall.state === 'pending' ? (
                                    <Icon size={0.8} path={mdiLoading} spin={true} />
                                ) : (
                                    props.recipe ? 'Upravit' : 'Přidat'
                                )}
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
                <Icon path={props.recipe ? mdiProgressPencil : mdiPlus } size={1} />
                {props.recipe ? 'Upravit' : 'Přidat'} recept
            </Button>
        </>
    )
}

export default ReciepForm;