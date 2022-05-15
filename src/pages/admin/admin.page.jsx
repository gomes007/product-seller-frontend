/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import { ProductSave } from "../../components/product-save";
import ProductService from "../../services/product.service"


const AdminPage = () => {

    const [productList, setProductList] = useState([])

    
    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            setProductList(response.data);
        })
    }, []);


    //1 step call modal -- comes from product-save.jsx
    const saveComponent = useRef();

    //2 step call modal --- button Create Produc
    //showProductModal comes from useImperativeHandle at product-save.jsx
    const createProductRequest = () => {
        saveComponent.current?.showProductModal();
    }

    return(
        <div>
            <div className="container">
                <div className="pt-5">
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
                                            <button className="btn btn-primary me-1">Edit</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>                                    
                                    )}                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ProductSave ref={saveComponent}/>

        </div>
    )
}

export {AdminPage}