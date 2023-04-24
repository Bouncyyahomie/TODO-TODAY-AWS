/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Todos } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodosUpdateFormInputValues = {
    title?: string;
    description?: string;
    author?: string;
    done?: boolean;
};
export declare type TodosUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    done?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodosUpdateFormOverridesProps = {
    TodosUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    done?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type TodosUpdateFormProps = React.PropsWithChildren<{
    overrides?: TodosUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    todos?: Todos;
    onSubmit?: (fields: TodosUpdateFormInputValues) => TodosUpdateFormInputValues;
    onSuccess?: (fields: TodosUpdateFormInputValues) => void;
    onError?: (fields: TodosUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodosUpdateFormInputValues) => TodosUpdateFormInputValues;
    onValidate?: TodosUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TodosUpdateForm(props: TodosUpdateFormProps): React.ReactElement;
