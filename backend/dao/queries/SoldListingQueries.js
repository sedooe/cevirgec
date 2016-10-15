/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const SoldListing = require('../../model/SoldListing');
const debug = require('debug')(__filename.split('/').pop());

function isExist(listing, user) {
  return new Promise(function (resolve, reject) {
    SoldListing.findOne({where: {listingId: listing.id, userId: user.id}})
    .then(function (soldListingLocal) {
      resolve(soldListingLocal != null);
    });
  });
}

function create(soldListing) {
  //returns Promise
  return SoldListing.create(soldListing);
}

module.exports = {isExist, create};
