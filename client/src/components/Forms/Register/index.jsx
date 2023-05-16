import React from "react";
import { useForm } from "react-hook-form";
import {useState, useEffect} from "react"
import FaceID from '../../FaceID'
import Registration from "../validations/Registration";
import { yupResolver } from "@hookform/resolvers/yup";

function Register() {
    const [faceId, setFaceId] = useState(false)
    const [updaFaceId, setupdateFaceId] = useState("")
    const page = "register";
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(Registration),
      });

      useEffect(() => {
        if (updaFaceId !== '') {
            setValue('faceId', updaFaceId)
        }
      })
      const updateFaceId = (data) => {
        setupdateFaceId(data)
      }

      const onSubmit = (data) => {
        console.log('dataRegister   :', data)
      }

    return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="FirstName" {...register("FirstName")} />
            <p>{errors.FirstName?.message}</p>
            <input type="text" placeholder="lastName" {...register("lastName")} />
            <p>{errors.lastName?.message}</p>
            <input type="text" placeholder="Email..." {...register("email")} />
            <p>{errors.email?.message}</p>
            <input
              type="password"
              placeholder="Password..."
              {...register("password")}
            />
            <p>{errors.password?.message}</p>
            <input
              type="password"
              placeholder="Confirm Password..."
              {...register("confirmPassword")}
            />
            <p>{errors.confirmPassword?.message}</p>
            <div className="face">
                <input type="radio" id="valid" onChange={()=>{setFaceId(true)}} name="drone" value="valid" />
                <label htmlFor="valid">Oui</label>
                <input type="radio" id="not" onChange={()=>{setFaceId(false)}} name="drone" value="not" checked/>
                <label htmlFor="not">Non</label>
            </div>
            {faceId === true ? (
                <FaceID page={page} updateFaceId={updateFaceId}/>
            ) : ''}
            <input type="submit" />
          </form>
          </>
          )

}
export default Register