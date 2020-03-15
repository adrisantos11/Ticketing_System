import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TabsModel } from '../../Model/model'

import './Tabs.scss'

interface Props {
    tabsInfo: TabsModel;
    handleClick: (id: string) => void;
}
const Tabs: React.FunctionComponent<Props> = (props: Props) => {

    const handleClickTab = (event: any) => {
        props.handleClick(event.target.id);
    }

    return(
        <><div className="btn-group btn-group-toggle" data-toggle="buttons">
            {
                props.tabsInfo.valuesList.map((value, index) => {
                    if (index == 0) {
                        return(
                            <label className="btn btn-secondary active" key={index}>
                                <input type="radio" name="options" id={props.tabsInfo.idList[index]} checked onClick={handleClickTab}/> {value}
                                
                            </label>
                        )
    
                    } else {
                        return(
                            <label className="btn btn-secondary" key={index}>
                                <input type="radio" name="options" id={props.tabsInfo.idList[index]} checked onClick={handleClickTab}/> {value}
                            </label>
                        )
                    }
                })
            }
        </div>
        </>
    );
}

export default Tabs;