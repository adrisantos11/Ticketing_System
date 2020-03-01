export interface ButtonModel {
    id: number;
    texto: string;
    color: string;
    type: string;
    icon: string;
    extraClass: string;
}

export interface InputModel {
    id: number;
    label: string;
    placeholder: string;
    color: string;
    type: string;
    error_control_text: string;
    extraClass: string;
}