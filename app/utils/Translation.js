/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

function tr () {
  var args = Array.prototype.slice.call(arguments);
  return args.join(' ');
  // return arguments[0] || '';
}

export default tr;
