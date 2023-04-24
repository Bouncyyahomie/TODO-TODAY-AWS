/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodosCreateFormInputValues = {
    title?: string;
    description?: string;
    author?: string;
    done?: boolean;
};
export declare type TodosCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    done?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodosCreateFormOverridesProps = {
    TodosCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    done?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TodosCreateFormProps = React.PropsWithChildren<{
    overrides?: TodosCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TodosCreateFormInputValues) => TodosCreateFormInputValues;
    onSuccess?: (fields: TodosCreateFormInputValues) => void;
    onError?: (fields: TodosCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodosCreateFormInputValues) => TodosCreateFormInputValues;
    onValidate?: TodosCreateFormValidationValues;
} & React.CSSProperties>;
export default function TodosCreateForm(props: TodosCreateFormProps): React.ReactElement;
