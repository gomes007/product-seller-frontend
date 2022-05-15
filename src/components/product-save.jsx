/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Product from '../models/product';
import ProductService from '../services/product.service';
import { Modal } from 'react-bootstrap';


const ProductSave = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showProductModal(){
            setShow(true);
        }
    }));

    const [product, setProduct] = useState(new Product('', '', 0))
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);


    const saveProduct = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!product.name || !product.description || !product.price) {
            return;
        }

        ProductService.saveProduct(product).then(response => {

        }).catch(error => {
            setErrorMessage('Unexpected error occurred.')
            console.log(error)
        })
    };


    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prevState => {            
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    return (
        <Modal show={show}>
            <form>
                <div className="model-heaher">
                    <h5 className="modal-title">Product Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="model-body">
                    
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>                    
                </div>
            </form>
        </Modal>
    )

})

export {ProductSave};