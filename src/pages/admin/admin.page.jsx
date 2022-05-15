/* eslint-disable no-unused-vars */
import {useEffect, useReducer, useRef, useState} from "react"
import { ProductSave } from "../../components/product-save";
import ProductService from "../../services/product.service";
import Product from '../../models/product';
import {ProductDelete} from "../../components/product-delete";


const AdminPage = () => {

    const [productList, setProductList] = useState([])
    const [selectedProduct, setselectedProduct] = useState(new Product('', '', 0)) ////step 1 to edit
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            setProductList(response.data);
        })
    }, []);


    //1 steps call modal -- comes from product-save.jsx
    const saveComponent = useRef();

    const deleteComponent = useRef();

    //2 steps call modal --- at button Create Product
    //showProductModal comes from useImperativeHandle at product-save.jsx
    const createProductRequest = () => {
        setselectedProduct(new Product('', '', 0)) //step 2 to edit
        saveComponent.current?.showProductModal();
    }

    //to update table of product after save it. This method will be called by a props onSaved in product-save.jsx
    const saveProductWatcher = (product) => {

        //condition to edit otherwise would be saved a new product
        let itemIndex = productList.findIndex(item => item.id === product.id);
        if (itemIndex !== -1) {
            const newList = productList.map((item) => {
                if (item.id === product.id) {
                    return product;
                }
                return item;
            });
            setProductList(newList);
        } else {
            const newList = productList.concat(product);
            setProductList(newList);
        }        
    }

    //step 3 to edit
    const editProductRequest = (item) => {
        setselectedProduct(Object.assign({}, item));
        saveComponent.current?.showProductModal();
    }

    const deleteProduct = () => {
        ProductService.deleteProduct(selectedProduct).then(_ => {
            setProductList(productList.filter(x => x.id !== selectedProduct.id));
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });
      };

    const deleteProductRequest = (product) => {
        setselectedProduct(product);
        deleteComponent.current?.showDeleteModal();
    }


    return(
        <div>
            <div className="container">
                <div className="pt-5">

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }


                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6">
                                    <h3>All Products</h3>
                                </div>

                                <div className="col-6 text-end">
                                    <button className="btn btn-primary" onClick={() => createProductRequest()}>Create Product</button>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((item, index) =>                                     
                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{`$ ${item.price}`}</td>
                                        <td>{new Date(item.createTime).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-primary me-1" onClick={() => editProductRequest(item)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => deleteProductRequest(item)}>Delete</button>
                                        </td>
                                    </tr>                                    
                                    )}                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ProductSave ref={saveComponent} product={selectedProduct} onSaved={(p) => saveProductWatcher(p)}/>
            <ProductDelete ref={deleteComponent} onConfirmed={() => deleteProduct()}/>

        </div>
    )
}

export {AdminPage}