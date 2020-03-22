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
    enabled: boolean;
    extraClass: string;
}

export interface DropdownModel {
    id: number;
    groupName: string;
    groupItems: any[];
    color: string;
    enabled: boolean;
    extraClass: string;
}

export interface TabsModel {
    idList: Array<string>;
    valuesList: Array<string>;
    color: string;
    enabledList: Array<boolean>;
}

export interface IncidenciaModel {
    group_id: number,
    id_reporter: number,
    id_assigned: number,
    id_team: number,
    title: string,
    description: string,
    category: string,
    build: string,
    floor: number,
    class: string,
    url_data: string,
    creation_date: string,
    limit_date: string,
    assigned_date: string,
    resolution_date: string,
    priority: string,
    state: string
}