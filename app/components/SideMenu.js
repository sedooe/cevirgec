/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';

class SideMenu extends Component {
  render() {
    return (
      <div className="ui fluid vertical menu">
        <Link to="/settings/options" className="item">
          <i className="options icon"></i>Options
        </Link>
        <Link to="/settings/shortcuts" className="item">
          <i className="keyboard icon"></i>Shortcuts
        </Link>
        {/*<Link to="/settings/feedback" className="item">
          <i className="idea icon"></i>Feedback
        </Link>*/}
      </div>
    );
  }
}

export default SideMenu;
