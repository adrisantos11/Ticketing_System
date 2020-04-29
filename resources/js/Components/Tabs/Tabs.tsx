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
        <div className="tabs-container">  
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {
                    props.tabsInfo.idList.map((id, index) => {
                        let iconHTML;
                        let valueTab = '';
                        if (props.tabsInfo.iconList.length != 0) {
                            iconHTML = <span className="icon-span"><i className={props.tabsInfo.iconList[index]}></i></span>
                            console.log(iconHTML);
                        } else {
                            iconHTML=null;
                        }

                        if (props.tabsInfo.valuesList.length != 0) {
                            valueTab = props.tabsInfo.valuesList[index]
                        } 

                        if (props.tabsInfo.itemActive == index) {
                            if (props.tabsInfo.enabledList[index]) {
                                return(
                                    <label className={`btn btn--${props.tabsInfo.color[index]} active`} key={index}>
                                        <input type="radio" name="options" id={id} checked onClick={handleClickTab}/><span className='value-tab'>{valueTab}</span>{iconHTML} 
                                    </label>
                                )     
                            } else {
                                return(
                                    <label className={`btn btn--${props.tabsInfo.color[index]} active disabled`} key={index}>
                                        <input type="radio" name="options" id={id} checked onClick={handleClickTab}/> <span className='value-tab'>{valueTab}</span>{iconHTML}
                                    </label>
                                )
                            }
                        } else {
                            if (props.tabsInfo.enabledList[index]) {
                                return(
                                    <label className={`btn btn--${props.tabsInfo.color[index]}`} key={index}>
                                        <input type="radio" name="options" id={id} onClick={handleClickTab}/><span className='value-tab'>{valueTab}</span>{iconHTML}
                                    </label>
                                )
                            } else {
                                return(
                                    <label className={`btn btn--${props.tabsInfo.color[index]} disabled`} key={index}>
                                        <input type="radio" name="options" id={id} onClick={handleClickTab}/><span className='value-tab'>{valueTab}</span>{iconHTML}
                                    </label>
                                )
                            }
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Tabs;