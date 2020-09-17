import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); 

    return (

        <form className="form-group" onSubmit={handleSubmit(onSubmit)} placeholder="Enter name">
            <input className="form-control" name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
            {errors.name && <span>Name is required</span>}

            <br/>
            <input className="form-control" name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Enter email"/>
            {errors.email && <span>Email is required</span>}

            <br/>
            <input className="form-control" name="address" ref={register({ required: true })} placeholder="Enter address"/>
            {errors.address && <span>Address is required</span>}
            
            <br/>
            <input className="form-control" name="phone" ref={register({ required: true })} placeholder="Enter phone"/>
            {errors.phone && <span>Phone is required</span>}
            
            <br/>
            <input type="submit" />
        </form>);
}

export default Shipment;