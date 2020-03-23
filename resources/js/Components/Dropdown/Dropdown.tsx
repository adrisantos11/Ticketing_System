import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DropdownModel } from '../../Model/model'

import './Dropdown.scss'

interface Props {
    dropdownInfo: DropdownModel;
    onClick: (idItem: string, idDropdown: number) => void;
}
const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
  const onClickItem = (e: any) => {
    props.onClick(e.target.id, props.dropdownInfo.id);
  }

  const getItemsDropdown = (namesList: string[], idsList: string[]) => {
    if (namesList.length != 0) {
      return(
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            namesList.map((value,index) => {
              return(<a className="dropdown-item" key={`${index}`} id={idsList[index]} onClick={onClickItem}>{value}</a>)
            })
          }
        </div>
      )
    }
  }

  return(
      <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {props.dropdownInfo.groupName}
      </button>
        {
          getItemsDropdown(props.dropdownInfo.groupItems, props.dropdownInfo.groupIds)
        }
    </div>
  )
}

export default Dropdown;