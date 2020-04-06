import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SelectboxModel } from '../../Model/model'

import './Selectbox.scss'

interface Props {
    selectboxInfo: SelectboxModel;
    handleClickSelectbox: (id: string, color: string) => void;
}
const Selectbox: React.FunctionComponent<Props> = (props: Props) => {
    const activeProps = props.selectboxInfo.active;
    const color = props.selectboxInfo.color;
    let active = '';
    if (activeProps) {
        active = 'active'
    }
    
    const handleClickTab = (event: any) => {
        props.handleClickSelectbox(event.target.id, props.selectboxInfo.color);
    }

    return(
        <div className="selectbox-container">  
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className={`btn btn--${color} ${active}`} key={1}>
                <input type="checkbox" id={props.selectboxInfo.id} onClick={handleClickTab}/> {props.selectboxInfo.name}
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