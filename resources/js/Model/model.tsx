export interface ButtonModel {
    id: number;
    texto: string;
    color: string;
    type: string;
    icon: string;
    target_modal: string;
    extraClass: string;
}

export interface InputModel {
    id: number;
    value: string
    label: string;
    placeholder: string;
    color: string;
    type: string;
    error_control_text: string;
    enabled: boolean;
    inputSize: string;
}

export interface DropdownModel {
    id: number;
    groupName: string;
    groupItems: any[];
    groupIds: any[];
    color: string;
    enabled: boolean;
    extraClass: string;
}

export interface TabsModel {
    idList: Array<string>;
    valuesList: Array<string>;
    color: Array<string>;
    enabledList: Array<boolean>;
    itemActive: any;
}

export interface SelectboxModel {
    active: boolean,
    name: string,
    id: string,
    color: string
}

export interface IncidenciaModel {
    id?: number,
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

export interface FormularioIncidenciaModel {
    widgetType: string;
    userRol: string;
    urlGeneral: string;
    incidenciaData?: IncidenciaModel;
}

export interface AutocompleteInputModel {
    id: number;
    placeholderInput: string;
    colorInput: string;
    typeInput: string;
    enabled: boolean;
    tableToSearchIn: string;
    matchingWords: string[];
}

export interface ModalModel {
    id: string,
    title: string,
    buttonProps: ButtonModel,
}