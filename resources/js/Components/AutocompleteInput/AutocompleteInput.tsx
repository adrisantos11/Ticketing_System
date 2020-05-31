import * as React from 'react'
import { InputModel, AutocompleteInputModel, BasicUserModel } from '../../Model/model'
import {Input} from '../Input/Input'
import './AutocompleteInput.scss'
import { getFilteredUsers, getFilteredTeams } from '../../Utilities/Autocomplete'


interface Props {
    autocompleteInputInfo: AutocompleteInputModel;
    handleClick: (data: any, id: number) => void;
}

const AutocompleteInput: React.FunctionComponent<Props> = (props: Props) => {
    const [input, setInput] = React.useState<InputModel>({
        id: props.autocompleteInputInfo.id,
        value: '',
        label: '',
        labelColor: '',
        placeholder: props.autocompleteInputInfo.placeholderInput,
        color: props.autocompleteInputInfo.colorInput,
        type: props.autocompleteInputInfo.typeInput,
        error_control_text: '',
        enabled: props.autocompleteInputInfo.enabled,
        inputSize: '',
        isTextArea: false
    });
    const [userList, setUserList] = React.useState([])
    const [dataDivState, setDataDivState] = React.useState('')
    const [scrollAttribute, setScrollAttribute] = React.useState('');
    const handleChangeInput = (event: string) => {
        setUserList([]);
        setInput({
            ...input,
            value: event
        })
        if(event.length >= 2) {
            setDataDivState('--show');
            setScrollAttribute('');
            if (event.length >= 4) {
                setScrollAttribute('--scroll');
            }
            if (props.autocompleteInputInfo.searchIn == 'users') {
                getFilteredUsers(event).then(res => {
                    let helperList: any[] = [];
                    res.map((value: any) => {
                        helperList.push(value);
                    })
                    setUserList(helperList);
                });      
            } else if(props.autocompleteInputInfo.searchIn == 'teams') {
                getFilteredTeams(event).then((res: any) => {
                    let helperList: any[] = [];
                    res.data.map((value: any) => {
                        helperList.push(value);
                    })
                    setUserList(helperList);
                });
            }
        } else {
            setDataDivState('');
            setScrollAttribute('');
        }
    }

    const onClickOption = (data: any) => {
        if (props.autocompleteInputInfo.searchIn == 'users') {    
            setInput({
                ...input,
                value: data.name+' '+ data.surname1+' '+ data.surname2
            })
            setDataDivState('');
            setScrollAttribute('');
            props.handleClick(data, props.autocompleteInputInfo.id);

        } else if (props.autocompleteInputInfo.searchIn == 'teams') {
            setInput({
                ...input,
                value: data.name
            })
            setDataDivState('');
            setScrollAttribute('');
            props.handleClick(data, props.autocompleteInputInfo.id);

        }
    }

    return(
        <>
            <div className='autocompleteInput-container'>
                <Input inputInfo={input} handleChangeInput={handleChangeInput}></Input>
                <div className={`dropdown-menu${dataDivState}${scrollAttribute}`}>
                    {
                        userList.map((value, index) => {
                            if (index == userList.length-1) {
                                if (props.autocompleteInputInfo.searchIn == 'users') {
                                    return (<div key= {index} className='dropdown-item' data-id={value.id} data-name={value.name} onClick={() => onClickOption(value)}>
                                        <span className='id-data'>{`#${value.id}`}</span>
                                        <span className='value-data'>{`${value.name} ${value.surname1} ${value.surname2}`}</span>
                                        </div>)
                                } else if (props.autocompleteInputInfo.searchIn == 'teams') {
                                    return (<div key= {index} className='dropdown-item' data-id={value.id} data-name={value.name} onClick={() => onClickOption(value)}>
                                    <span className='id-data'>{`#${value.id}`}</span>
                                    <span className='value-data'>{`${value.name}`}</span>
                                    </div>)
                                }
                            } else {
                                if (props.autocompleteInputInfo.searchIn == 'users') {
                                    return(
                                        <>
                                            <div key= {index} className='item-autocomplete dropdown-item' onClick={() => onClickOption(value)}>
                                                <span className='id-data'>{`#${value.id}`}</span>
                                                <span className='value-data'>{`${value.name} ${value.surname1} ${value.surname2}`}</span>
                                            </div>
                                            <div key= {`divider-${index}`}className='dropdown-divider'></div>
                                        </>
                                    )     
                                } else if (props.autocompleteInputInfo.searchIn == 'teams') {
                                    <>
                                    <div key= {index} className='item-autocomplete dropdown-item' onClick={() => onClickOption(value)}>
                                        <span className='id-data'>{`#${value.id}`}</span>
                                        <span className='value-data'>{`${value.name}`}</span>
                                    </div>
                                    <div key= {`divider-${index}`}className='dropdown-divider'></div>
                                </>

                                }
                            }
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default AutocompleteInput;
