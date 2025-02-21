import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '@/Components/Input/FormInput';
import instance from '@/Utils/Axios';
import { useToast } from '@/hooks/use-toast'; // Ensure this hook is correctly implemented
import { setUser } from '@/Redux/userData';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using Yup
const schema = yup.object().shape({
    companyName: yup.string().required('Company Name is required'),
    companyDetails: yup.string().required('Company Details are required'),
});

function PostJobVerify() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await instance.put('auth/updateEmploye', data);
            console.log(response.data);
            
            if(response.data.success){
                dispatch(setUser(response.data.user))
                toast({
                    title: "Success!",
                    description: response.data.message,
                    status: "success", // Ensure your useToast hook handles different statuses
                })

            }else{
                toast({
                    title: "Success!",
                    description: response.data.message,
                    status: "success", // Ensure your useToast hook handles different statuses
                })

            }
          navigate("/admin")
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
            });
        }
    };

    return (
        <div className='my-5'>
            <h2 className='text-3xl mb-5 text-center'>Create an Employer Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    name="companyName"
                    label="Company Name"
                    register={register}
                    errors={errors}
                />
                <FormInput
                    name="companyDetails"
                    label="Company Details"
                    register={register}
                    errors={errors}
                />
                <button
                    type="submit"
                    className="bg-primary text-white p-2 rounded-md"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default PostJobVerify;
