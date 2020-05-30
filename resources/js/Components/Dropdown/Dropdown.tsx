import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DropdownModel } from '../../Model/model'

import './Dropdown.scss'

interface Props {
    dropdownInfo: DropdownModel;
    onClick: (idItem: string, nameSelected: string, idDropdown: number) => void;
}
const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
  const [dropdownName, setDropdownName] = React.useState(props.dropdownInfo.groupName)
  const onClickItem = (e: any) => {
    props.onClick(e.target.id, e.target.getAttribute('data-value'), props.dropdownInfo.id);
    setDropdownName(e.target.getAttribute('data-value'));
  }

  const getItemsDropdown = (namesList: string[], idsList: string[]) => {
    if (namesList.length != 0) {
      return(
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            namesList.map((value,index) => {
              return(<a className="dropdown-item" key={`${index}`} id={idsList[index]} onClick={onClickItem} data-value={value}>{value}</a>)
            })
          }
        </div>
      )
    }
  }

  return(
      <div className="dropdown">
          {
            props.dropdownInfo.enabled ? 
              <button className={`btn btn--${props.dropdownInfo.color} btn-secondary dropdown-toggle`} type="button"
              id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {dropdownName}
              </button> 
            : 
              <button className={`btn btn--${props.dropdownInfo.color} btn-secondary dropdown-toggle`} type="button"
              id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
              {dropdownName}
              </button>
          }
          {
          getItemsDropdown(props.dropdownInfo.groupItems, props.dropdownInfo.groupIds)
          }
      </div>
  )
}

export default Dropdown;