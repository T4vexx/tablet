import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    nome: string;
    label?: string;
    error?: FieldError;
    fontpeso?: number;
    width?: string;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ nome, label, width, fontpeso, error = null, ...rest }, ref) => {
    return (
        <div className={styles.input_label}>  
            {!!label && <p style={{fontWeight: fontpeso}}>{label}</p> }
            <input 
                name={nome}
                id={nome}
                ref={ref}
                {...rest}
                style={width ? {width: width} : {}}
            />

            {!!error && ( <span>{error?.message}</span> )}
        </div>
    );
}

export const Input = forwardRef(InputBase)