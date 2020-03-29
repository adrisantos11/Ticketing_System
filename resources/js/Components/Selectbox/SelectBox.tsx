import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SelectboxModel } from '../../Model/model'

import './Selectbox.scss'

interface Props {
    selectboxInfo: SelectboxModel;
    handleClickSelectbox: (id: string) => void;
}
const Selectbox: React.FunctionComponent<Props> = (props: Props) => {
    const activeProps = props.selectboxInfo.active;
    let active = '';
    if (activeProps) {
        active = 'active'
    }
    
    const handleClickTab = (event: any) => {
        props.handleClickSelectbox(event.target.id);
    }

    return(
        <div className="selectbox-container">  
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn--primary ${active}`} key={1}>
                <input type="checkbox" id='hola' onClick={handleClickTab}/> Hola
            </label>
                {/* {
                    props.tabsInfo.valuesList.map((value, index) => {
                        if (index == 0) {
                            return(
                                <label className={`btn btn${props.tabsInfo.color} active`} key={index}>
                                    <input type="checkbox" name="options" id={props.tabsInfo.idList[index]} checked onClick={handleClickTab}/> {value} 
                                </label>
                            )
                        } else {
                            return(
                                <label className={`btn btn${props.tabsInfo.color}`} key={index}>
                                    <input type="checkbox" name="options" id={props.tabsInfo.idList[index]} checked onClick={handleClickTab}/> {value}
                                </label>
                            )
                        }
                    })
                } */}
            </div>
        </div>
    );
}

export default Selectbox;