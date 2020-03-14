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

export interface DropdownModel {
    id: number;
    groupName: string;
    groupItems: any[];
    color: string;
    enabled?: boolean;
    extraClass: string;
}

export interface IncidenciaModel {
    'id': number,
    'group_id': number,
    'id_reporter': number,
    'id_assigned': number,
    'title': string,
    'description': string,
    'department': string,
    'category': string,
    'build': string,
    'floor': number,
    'class': string,
    'url_data': string,
    'creation_date': string,
    'limit_date': string,
    'assigned_date': string,
    'resolution_date': string,
    'priority': string,
    'state': string
}