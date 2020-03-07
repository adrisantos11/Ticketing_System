import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DropdownModel } from '../../Model/model'

import './Dropdown.scss'

interface Props {
    dropdownInfo: DropdownModel;
}

const Dropdown: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    )
}

export default Dropdown;