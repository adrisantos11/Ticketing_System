import * as React from 'react'
import { InputModel, AutocompleteInputModel, BasicUserModel } from '../../Model/model'
import {Input} from '../Input/Input'
import './AutocompleteInput.scss'
import { getFilteredUsers } from '../../Utilities/Autocomplete'


interface Props {
    autocompleteInputInfo: AutocompleteInputModel;
    handleClick: (user: BasicUserModel) => void;
}

const AutocompleteInput: React.FunctionComponent<Props> = (props: Props) => {
    const [input, setInput] = React.useState<InputModel>({
        id: 1,
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
    const handleChangeInput = (event: any) => {
        setUserList([]);
        if(event.length >= 2) {
            setDataDivState('--show');
            setScrollAttribute('');
            if (event.length >= 4) {
                setScrollAttribute('--scroll');
            }
            getFilteredUsers(event).then(res => {
                let helperList: any[] = [];
                res.map((value: any) => {
                    helperList.push(value);
                })
                setUserList(helperList);
            });
        } else {
            setDataDivState('');
            setScrollAttribute('');
        }
    }

    React.useEffect(()=> {
        console.log('Recargamos lista.')
        console.log(userList);
    }, []);

    const onClickOption = (user: BasicUserModel) => {
        setInput({
            ...input,
            value: user.name+' '+ user.surname1+' '+ user.surname2
        })
        setDataDivState('');
        setScrollAttribute('');
        props.handleClick(user);
    }

    return(
        <>
            <div className='autocompleteInput-container'>
                <Input inputInfo={input} handleChangeInput={handleChangeInput}></Input>
                <div className={`dropdown-menu${dataDivState}${scrollAttribute}`}>
                    {
                        userList.map((value, index) => {
                            if (index == userList.length-1) {
                                return (<div className='dropdown-item' data-id={value.id} data-name={value.name} onClick={() => onClickOption(value)}>
                                <span className='id-data'>{`#${value.id}`}</span>
                                <span className='value-data'>{`${value.name} ${value.surname1} ${value.surname2}`}</span>
                            </div>)
                            } else {
                                return(
                                    <>
                                        <div className='item-autocomplete dropdown-item' onClick={() => onClickOption(value)}>
                                            <span className='id-data'>{`#${value.id}`}</span>
                                            <span className='value-data'>{`${value.name} ${value.surname1} ${value.surname2}`}</span>
                                        </div>
                                        <div className='dropdown-divider'></div>
                                    </>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default AutocompleteInput;
