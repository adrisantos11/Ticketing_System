import * as React from 'react'
import { InputModel, DataCardModel } from '../../Model/model'
import {Input} from '../Input/Input'
import './DataCard.scss'
import { getFilteredUsers } from '../../Utilities/Autocomplete'
interface Props {
    dataCardInfo: DataCardModel;
    children?: JSX.Element[] | JSX.Element;
}

const DataCard: React.FunctionComponent<Props> = (props: Props) => {

    const [iconClicked, setIconClicked] = React.useState(false);
    const showPopover = () => {
        if (iconClicked) {
            $('#info').popover('hide'); 
            setIconClicked(false);
        } else {
            $('#info').popover('show'); 
            setIconClicked(true);
        }
    }
    return(
        <>
            <div className="dataCard-container">
                <div className="dataCard-header">
                    {props.dataCardInfo.title}
                    <span id='info' className="info-icon" data-toggle="popover" data-content={props.dataCardInfo.popoverText} onClick={showPopover}><i className={`far ${props.dataCardInfo.popoverIcon}`}></i></span>
                </div>
                <div className="dataCard-body">
                    {props.children}
                </div>
            </div>
        </>
    );
}

export default DataCard;
