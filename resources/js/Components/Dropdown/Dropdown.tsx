import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DropdownModel } from '../../Model/model'

import './Dropdown.scss'

interface Props {
    dropdownInfo: DropdownModel;
    onClick: (idItem: number, idDropdown: number) => void;
}
const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
  const onClickItem = (e: any) => {
    props.onClick(e.target.id, props.dropdownInfo.id);
  }

  const getItemsDropdown = (lista: string[]) => {
    if (lista.length != 0) {
      return(
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            lista.map((value,index) => {
              return(<a className="dropdown-item" key={`${index}`} id={value} onClick={onClickItem}>{value}</a>)
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
          getItemsDropdown(props.dropdownInfo.groupItems)
        }
    </div>
  )
}

export default Dropdown;