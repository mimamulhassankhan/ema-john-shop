import React from 'react';
import { useForm } from 'react-hook-form';

const AddSeller = () => {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = data => {
       console.log(data); 
    }
    return (
        <>
        <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="sellerName" placeholder="Seller Name" className="form-control"/>
                        {errors.sellerName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <textarea rows={3} ref={register({ required: true })} name="sellerAddress" placeholder="Seller Address" className="form-control"/>
                        {errors.sellerAddress && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="sellerUserName" placeholder="Seller User Name" className="form-control"/>
                        {errors.sellerUserName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" ref={register({ required: true, pattern: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/ })} name="sellerPassword" placeholder="Seller Password" className="form-control"/>
                        {errors.sellerPassword && errors.sellerPassword.type === "required" &&  <span className="text-danger">This field is required</span>}
                        {errors.sellerPassword && errors.sellerPassword.type === "pattern" &&  <span className="text-danger">Password have one uppercase, one lower case , one special character, 8 character</span>}
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="sellerLogo">Seller Logo</label>
                    <input name="sellerLogo" className="form-control bg-transparent" placeholder="Upload Logo" type="file" />
                    {errors.sellerLogo && <span className="text-danger">This field is required</span>}
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-dark px-5">Send</button>
            </div>
        </form>
        </>
    );
};

export default AddSeller;